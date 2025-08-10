"use client";

import { useRouter } from 'next/navigation';
import React from "react";

type PropsType = {
 product : {
  tag: string;
  name: string;
  price: number;
  id: string;
 }
};

export default function ProductCard( {product} : PropsType) {
  const router = useRouter();

  const handleNavigation = (id:string) => {
    router.push(`/product/${id}`);
  };

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(product.price);
  return (
    <article
      className="w-full max-w-sm bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-100"
      role="article"
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-600">{product.name}</h3>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formattedPrice}</p>
          </div>

          <div className="flex flex-col items-end">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
              {product.tag}
            </span>
            <span className="mt-3 text-xs text-gray-400">{product.id}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-transparent text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => handleNavigation(product.id)}
          >
            Details
          </button>
        </div>
      </div>
    </article>
  );
}
