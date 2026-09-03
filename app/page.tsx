"use client";

import { useState } from "react";

import ReceiptUploader from "@/components/ReceiptUploader";
import ReceiptResult from "@/components/ReceiptResult";

import { Receipt } from "@/types/receipt";

export default function Home() {

  const [receipt, setReceipt] =
    useState<Receipt | null>(null);


  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="mx-auto max-w-4xl">

        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold">
            AI Nota
          </h1>

          <p className="mt-2 text-gray-600">
            Upload foto nota dan biarkan AI
            membaca transaksi secara otomatis.
          </p>

        </div>


        <ReceiptUploader
          onResult={setReceipt}
        />


        {receipt && (
          <ReceiptResult
            receipt={receipt}
          />
        )}

      </div>

    </main>
  );
}