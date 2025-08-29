"use client";

import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b shadow-sm bg-white">
      <h1 className="text-xl font-bold text-gray-800 tracking-tight">
        PrepAI
      </h1>

      {/* Navbar only for signed-in users */}
      <SignedIn>
        <nav>
          <ul className="flex gap-6 text-gray-700 font-medium">
            <li>
              <Link href="/dashboard" className="hover:text-[#6c47ff]">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/dashboard/questions" className="hover:text-[#6c47ff]">
                Questions
              </Link>
            </li>
            <li>
              <Link href="/dashboard/how-it-works" className="hover:text-[#6c47ff]">
                How it Works
              </Link>
            </li>
            <li>
              <Link href="/dashboard/upgrade" className="hover:text-[#6c47ff]">
                Upgrade
              </Link>
            </li>
          </ul>
        </nav>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </header>
  );
}
