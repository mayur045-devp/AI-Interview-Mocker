"use client";

import { useAuth, RedirectToSignIn } from "@clerk/nextjs";

export default function DashboardLayout({ children }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="mx-5 md:mx-20 lg:mx-36">
      {children}
    </div>
  );
}
