"use client";
import { FcGoogle } from "react-icons/fc";


import LandingAnimation from "@/components/LandingAnimation";
import { signIn } from "@/lib/helper";

export default function Onboarding() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100">
      <div className="flex flex-col md:flex-row items-center w-full max-w-4xl mx-auto">
        {/* Left side: Lottie Animation */}
        <div className="md:w-1/2 flex justify-center">
          <LandingAnimation />
        </div>

        {/* Right side: Glass Box */}
        <div className="md:w-1/2 mt-8 md:mt-0 p-8 glass backdrop-blur-lg rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">Welcome to Notefy</h2>
          <p className="text-lg text-center mb-4">
            Sign up with Google to get started.
          </p>
          <div className="flex justify-center">
            <form
              action={async () => {
                await signIn()
              }}
            >
              <button className="btn btn-info text-lg px-8 py-3">
                <FcGoogle size={25} /> Sign Up with Google
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
