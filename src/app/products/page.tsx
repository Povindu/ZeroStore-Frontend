"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

type ApiResponse = ProductType[];

type ProductType = {
  tag: string;
  name: string;
  price: number;
  id: string;
};

export default function ProductPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      router.replace("/login");
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);

        const response = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/api/product/getall`
        ).catch(() => {
          router.replace("/login");
        });

        console.log("response", response);

        if (!response) {
          throw new Error(`API request failed: ${response}`);
        }
        setData(response as ApiResponse);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
        <div className="w-12 h-12 border-4 border-indigo-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header/>
      {data && data.length > 0 ? (
        <div className="px-20">
          <h1 className="text-3xl py-10">Product Categories</h1>
          <ul className="grid grid-cols-4 gap-3">
            {data.map((item) => (
              <ProductCard product={item} key={item.id} />
            ))}
          </ul>
        </div>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
}
