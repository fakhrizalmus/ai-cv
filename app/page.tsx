"use client";

import { useState } from "react";

import CvUploader from "@/components/CvUploader";
import CvResult from "@/components/CvResult";
import { CvAnalysis } from "@/types/cv";

export default function Home() {

  const [result, setResult] = useState<CvAnalysis | null>(null);


  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">

      <div className="mx-auto max-w-4xl">

        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold text-gray-900">
            Analyze CV ATS
          </h1>

          <p className="mt-2 text-gray-600">
            Upload CV dan dapatkan review ATS-friendly yang jelas dan actionable.
          </p>

        </div>


        <CvUploader onResult={setResult} />


        {result && <CvResult result={result} />}

      </div>

    </main>
  );
}
