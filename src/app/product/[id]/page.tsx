"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

type Variant = {
  name: string;
};

type Product = {
  id: number;
  tag: string;
  name: string;
  price: number;
  numberOfVariants: number;
  variants: Variant[];
};

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id ?? "";

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      router.replace("/login");
      return;
    }

    async function fetchProduct(id: string): Promise<Product | null> {
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`
      );
      return res;
    }

    setLoading(true);
    setError(null);

    fetchProduct(id.toString())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  if (loading) return <p className="p-6">Loading...</p>;

  if (error) {
    
    if (error.message == "401" || error.message == "403" || error.message == "400" || error.message == "404") {
      return (
        <div>
          <Header />
          <main className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h1 className="text-xl mb-10 text-red-600 text-center">
              Error loading product.
            </h1>
            <p className="text-center"> Please check if the product ID is correct or if you are logged in.</p>
          </main>
        </div>
      );
    }
    return (
      <p className="p-6 text-red-600">Error loading product: {error.message}</p>
    );
  }
  if (!product)
    return <p className="p-6 text-red-600">Product not found for ID: {id}</p>;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <div>
      <Header />
      <main className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        <h1 className="text-xl mb-2">
          Product Name: <span className="font-bold">{product.name}</span>
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          <span className="font-semibold">Tag:</span> {product.tag}
        </p>
        <p className="text-lg font-semibold text-indigo-600 mb-4">
          {formattedPrice}
        </p>
        <p className="mb-4">
          Number of variants: <strong>{product.numberOfVariants}</strong>
        </p>
        {product.variants.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Variants:</h2>
            <ul className="list-disc list-inside space-y-1">
              {product.variants.map((variant, idx) => (
                <li key={idx} className="text-gray-700">
                  {variant.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
