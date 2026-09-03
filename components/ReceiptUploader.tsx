"use client";

import { useState } from "react";
import { analyzeReceipt } from "@/services/receipt.service";
import { Receipt } from "@/types/receipt";

interface ReceiptUploaderProps {
  onResult: (result: Receipt) => void;
}

export default function ReceiptUploader({
  onResult,
}: ReceiptUploaderProps) {

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setFile(selectedFile);

    setPreview(
      URL.createObjectURL(selectedFile)
    );

    setError(null);
  };


  const handleAnalyze = async () => {

    if (!file) {
      setError("Silakan pilih foto nota terlebih dahulu.");
      return;
    }

    try {

      setLoading(true);
      setError(null);

      const response = await analyzeReceipt(file);

      onResult(response.data);

    } catch (error) {

      setError(
        error instanceof Error
          ? error.message
          : "Gagal menganalisis nota"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <label
        htmlFor="receipt"
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 hover:border-gray-500"
      >

        <div className="mb-4 text-5xl">
          📄
        </div>

        <p className="font-medium text-gray-700">
          Pilih foto nota
        </p>

        <p className="mt-1 text-sm text-gray-500">
          JPG, PNG, atau WEBP
        </p>

        <input
          id="receipt"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />

      </label>


      {preview && (
        <div className="mt-6">

          <p className="mb-3 font-medium">
            Preview Nota
          </p>

          <div className="overflow-hidden rounded-xl border">

            <img
              src={preview}
              alt="Preview nota"
              className="max-h-[500px] w-full object-contain"
            />

          </div>

        </div>
      )}


      {file && (
        <p className="mt-4 text-sm text-gray-600">
          File: {file.name}
        </p>
      )}


      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}


      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className="mt-6 w-full rounded-xl bg-black px-6 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {loading
          ? "Sedang menganalisis..."
          : "Analisis Nota"}
      </button>

    </div>
  );
}