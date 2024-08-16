import LandingAnimation from "@/components/LandingAnimation";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen home-container no-scrollbar scrollbar-hide">
      <main className="flex-grow bg-base-100 no-scrollbar scrollbar-hide">
        <Navbar />
        <section className="hero py-20 flex flex-col md:flex-row items-center text-white no-scrollbar scrollbar-hide">
          <div className="container mx-auto flex flex-col md:flex-row items-center scrollbar-hide">
            {/* Left side: Text */}
            <div className="md:w-1/2 text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Organize Your Thoughts, Simplify Your Life
              </h1>
              <p className="text-lg md:text-2xl mb-8">
                Capture, organize, and manage your notes effortlessly with Notefy, your all-in-one tool for staying productive and on top of your tasks.
              </p>
              <a href="/onboard" className="btn btn-info text-xl py-3 px-6 rounded-lg">
                Get Started for Free
              </a>
            </div>

            {/* Right side: Image or Lottie */}
            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
              <LandingAnimation />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} | Made with ❤️</p>
        </aside>
      </footer>
    </div>
  );
}
