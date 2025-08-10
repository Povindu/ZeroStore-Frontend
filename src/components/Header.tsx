"use client";

import React from "react";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
     setLoggedIn(true);
    }
    else{
      setLoggedIn(false);
    }
  }, [router]);

  const handleNavigation = (url: string) => {
    router.push(url);
  };
  return (
    <div className="px-20 py-4 flex flex-row items-center justify-between shadow-md">
      <h1 className="text-4xl text-indigo-700 font-mono">Zero Store - Demo</h1>
      <div className="px-20 gap-3 flex flex-row">
        <button
          type="button"
          className="inline-flex items-center justify-center px-6 py-2 rounded-lg font-medium bg-white text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => handleNavigation("/")}
        >
          Home
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center px-6 py-2 rounded-lg font-medium bg-white text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => handleNavigation("/products")}
        >
          Products
        </button>
        { !loggedIn ? (<button
          type="button"
          className="inline-flex items-center justify-center px-6 py-2 rounded-lg border border-transparent font-medium bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => handleNavigation("/login")}
        >
          Login
        </button>): (<button
          type="button"
          className="inline-flex items-center justify-center px-6 py-2 rounded-lg border border-transparent font-medium bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => handleNavigation("/signout")}
        >
          Signout
        </button>)}
        
        
      </div>
    </div>
  );
}
