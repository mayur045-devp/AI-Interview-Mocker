import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <section className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left Section */}
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
          Master Your <span className="text-[#6c47ff]">Technical Interviews</span>
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Prepare confidently with our AI-powered mock interviews.
          Get real-time feedback, improve your answers, and land your dream job.
        </p>

        <div className="mt-6 flex gap-4">
          <Link
            href="/dashboard"
            className="bg-[#6c47ff] text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-[#5635cc] transition"
          >
            Start Practicing
          </Link>
          <button className="px-6 py-3 rounded-xl font-semibold border border-gray-300 hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Right Section (Hero Image) */}
      <div className=" lg:block">
        <img src="/ai-mocker-image.png" alt="AI Interview Mock" />
      </div>
    </section>
  );
}
