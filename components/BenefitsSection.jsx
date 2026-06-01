"use client";

import { ShieldCheck } from "lucide-react";

export default function BenefitsSection({ selectedProduct }) {
  return (
    <section className="mt-5 rounded-3xl border bg-gray-50 p-5">
      <h3 className="flex items-center gap-2 text-lg font-black text-gray-950">
        <ShieldCheck size={20} /> Benefits
      </h3>

      <p className="mt-3 text-sm text-gray-600">
        Benefits section for {selectedProduct} will go here.
      </p>
    </section>
  );
}