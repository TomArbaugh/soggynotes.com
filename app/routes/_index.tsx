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
          
          <div className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 z-50 bg-[color:rgba(254,204,27,0.5)] transition-all duration-300 ${
              isAtTop ? "h-[50vh]" : "h-[10vh]"
            }`}>
           <div className={`absolute transition-all duration-300 ${
                isAtTop
                  ? "left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[4]"
                  : "left-4 top-4 transform -translate-x-0 -translate-y-0 scale-100"
              } flex items-center`}>
            <img src="/icons/logo.svg" className="w-12 h-12" />
            <img src="/soggynotesrecords.svg" className="w-48" />
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
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-3 text-base font-medium text-yellow-50 shadow-sm hover:bg-yellow-50 sm:px-8"
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
