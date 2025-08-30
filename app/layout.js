
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Toaster } from "sonner";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const onDashboard = pathname.startsWith("/dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
        >
          {/* Fixed Navbar */}
          <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 shadow-md bg-gradient-to-r from-gray-200 to-amber-100">
            {/* Logo */}
            <div className="flex items-center">
              <Image src="/logo.svg" alt="Logo" width={49} height={28} />
              <h1 className="text-xl text-orange-500 font-bold mt-2.5 tracking-tight">
                ocker
              </h1>
            </div>

            {/* Desktop nav links */}
            <nav className="hidden md:flex flex-1 justify-center">
              <SignedIn>
                {onDashboard && (
                  <div className="flex items-center gap-6 font-medium">
                    <Link href="/dashboard" className="hover:text-orange-500 transition-colors">Dashboard</Link>
                    <Link href="/questions" className="hover:text-orange-500 transition-colors">Questions</Link>
                    <Link href="/how-it-works" className="hover:text-orange-500 transition-colors">How it Works</Link>
                    <Link href="/upgrade" className="hover:text-orange-500 transition-colors">Upgrade</Link>
                  </div>
                )}
              </SignedIn>
            </nav>

            {/* Mobile menu button */}
            <SignedIn>
              {onDashboard && (
                <button
                  className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}
            </SignedIn>

            {/* Auth buttons */}
            <nav className="flex gap-4 items-center">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-[#6c47ff] text-white rounded-lg font-medium text-sm px-5 py-2 shadow hover:bg-[#5635cc] transition">
                    Get Started
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </nav>
          </header>

          {/* Mobile menu overlay */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div
                className="fixed top-16 right-0 w-64 h-full bg-white shadow-lg z-50 p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <SignedIn>
                  {onDashboard && (
                    <div className="flex flex-col gap-4 font-medium">
                      <Link
                        href="/dashboard"
                        className="hover:text-orange-500 transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/questions"
                        className="hover:text-orange-500 transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Questions
                      </Link>
                      <Link
                        href="/how-it-works"
                        className="hover:text-orange-500 transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        How it Works
                      </Link>
                      <Link
                        href="/upgrade"
                        className="hover:text-orange-500 transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Upgrade
                      </Link>
                    </div>
                  )}
                </SignedIn>
              </div>
            </div>
          )}

          {/* Main content with padding for fixed navbar */}
          <main className="max-w-6xl mx-auto px-6 pt-24 pb-10">
            {children}
          </main>
          <Toaster /> {/* For toast notifications */}
        </body>
      </html>
    </ClerkProvider>
  );
}