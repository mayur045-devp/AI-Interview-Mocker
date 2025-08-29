
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";



function AddNewInterview() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [jobPosition, setJobPosition] = React.useState("");
  const [jobDescription, setJobDescription] = React.useState("");
  const [yearsOfExperience, setYearsOfExperience] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [jsonResponse, setJsonResponse] = React.useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await fetch("/api/generate-interview-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobPosition, jobDescription, yearsOfExperience }),
      });

      const data = await res.json();

      const mockJsonResp = JSON.stringify(data.questions, null, 2);
      // pretty-print ONLY to console
      console.log(
        "Generated Technical Q&A (JSON):\n",
        JSON.parse(mockJsonResp)
      );

      setJsonResponse(mockJsonResp);

      // if(mockJsonResp){
      // const resp = await db.insert(MockInterview)
      // .values({
      //   mockId: uuidv4(),
      //   jsonMockResp: mockJsonResp,
      //   jobPosition: jobPosition,
      //   jobDesc: jobDesc,
      //   jobExperience: jobExperience,
      //   createdBy: user?.primaryEmailAddress?.emailAddress,
      //   createdAt: moment().format("YYYY-MM-DD"),
      // }).returning({mockId: MockInterview.mockId})

      // console.log("Inserted ID : ", resp);
      // }else{
      //   console.log("No response from API");
      // }

        let saveData = null;

        if (mockJsonResp) {
        const saveRes = await fetch("/api/generate-interview-questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonMockResp: mockJsonResp,
            jobPosition,
            jobDescription,
            yearsOfExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
      }),
    });
     saveData = await saveRes.json();
    console.log("Inserted Interview: ", saveData);
  } else {
    console.log("No response from API");
  }

    if (saveData) {
      setOpenDialog(false);
      // Redirect to the interview page using the mockId from the response
      // This is correct usage for next/navigation's router.push in app directory
      router.push(`/dashboard/interview/${saveData.insertedId}`);
    }
  } catch (error) {
      console.error("Error generating questions:", error);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div>
      <div
        className="border p-10 bg-secondary rounded-lg cursor-pointer hover:shadow-md hover:scale-105 transition-transform"
        onClick={() => setOpenDialog(true)}
      >
        <h3 className="font-bold text-lg text-center">+ Add New Interview</h3>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog} >
        <DialogContent className="sm:max-w-[425px] max-w-2xl" >
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Tell us more about your job interviewing
            </DialogTitle >
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Provide role, stack, and experience.</h2>

                  <div className="mt-4">
                    <label className="block mb-2">Job Position/Role</label>
                    <input
                      type="text"
                      placeholder="e.g. Full Stack Developer"
                      className="w-full border p-2 rounded-lg"
                      required
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block mb-2">
                      Job Description / Tech Stack
                    </label>
                    <textarea
                      placeholder="e.g., React 18, Next.js 15, Node.js, Express, PostgreSQL, Drizzle ORM, Docker, AWS"
                      className="w-full border p-2 rounded-lg"
                      rows={4}
                      required
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block mb-2">Years of Experience</label>
                    <input
                      type="number"
                      placeholder="e.g. 5"
                      className="w-full border p-2 rounded-lg"
                      required
                      value={yearsOfExperience}
                      onChange={(e) => setYearsOfExperience(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? <><LoaderCircle className="animate-spin" /> "Generating from AI"</> : "Start Interview"}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
