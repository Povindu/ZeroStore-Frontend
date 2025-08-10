"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("jwt_token");
    router.replace("/login");
  }, [router]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-50 z-50">
        <p className="text-xl text-indigo-700">Signing Out</p>
        <div className="mt-10 w-12 h-12 border-4 border-indigo-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
  );
}
