import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">

      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

          <div className={`fixed top-0 left-0 w-full px-6 z-50 bg-[color:rgba(254,204,27,0.5)] transition-all duration-500 ease-in-out ${isAtTop ? "h-[80vh] flex-col align-center" : "h-[10vh] flex items-center justify-between"
            }`}>

            <div
              className={`transition-all duration-500 ease-in-out ${isAtTop
                  ? "flex-1 flex items-center justify-center scale-100" // Center content in the middle when at top
                  : "left-4 top-4 transform -translate-x-0 -translate-y-0 scale-100"
                } flex items-center space-x-4`}
            >
              <img src="/icons/logo.svg" className={`transition-all duration-500 ease-in-out ${isAtTop ? "w-1/5": "w-12 h-12"}`} />
              <img src="/soggynotesrecords.svg" className={`transition-all duration-500 ease-in-out ${isAtTop ? "w-4/5" : "w-48"}`} />
              {/* <img src="/icons/logo.svg" className="w-12 h-12" />
              <img src="/soggynotesrecords.svg" className="w-48" /> */}
            </div>
            <div className="flex space-x-4 ml-auto">
              {user ? (
                <Link
                  to="/notes"
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                >
                  View Notes for {user.email}
                </Link>
              ) : (
                <div className={`space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0 ${isAtTop ? "mx-auto sm: w-full lg: w-1/2": "invisible lg:visible"}`}>
                  <Link
                    to="/join"
                    className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-3 text-base font-medium text-yellow-50 hover:bg-blue-50 sm:px-8"
                  >
                    Demo Login
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
                  >
                    Artist Login
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <div className="h-[300vh] flex justify-center items-center">
        <p className="text-3xl">Scroll Down!</p>
      </div>
    </main>

  );
}
