"use client";

import { useState } from "react";

interface ReceiptItem {
  name: string;
  quantity: number;
  unit_price: number;
  total: number;
}

interface Receipt {
  merchant: string;
  date: string;
  items: ReceiptItem[];
  grand_total: number;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [result, setResult] = useState<Receipt | null>(null);

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

    setResult(null);
    setError(null);
  };


  const analyzeReceipt = async () => {
    if (!file) {
      setError("Silakan pilih foto nota terlebih dahulu.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const formData = new FormData();

      formData.append("receipt", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/receipt/analyze`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Gagal menganalisis nota"
        );
      }

      setResult(data.data);

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold text-gray-900">
            AI Nota
          </h1>

          <p className="mt-2 text-gray-600">
            Upload foto nota dan biarkan AI membaca
            detail transaksi secara otomatis.
          </p>

        </div>


        {/* Upload Card */}
        <div className="rounded-2xl bg-white p-6 shadow">

          <label
            htmlFor="receipt"
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 transition hover:border-gray-500"
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


          {/* Preview */}
          {preview && (
            <div className="mt-6">

              <p className="mb-3 font-medium text-gray-700">
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


          {/* File Name */}
          {file && (
            <p className="mt-4 text-sm text-gray-600">
              File: {file.name}
            </p>
          )}


          {/* Error */}
          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}


          {/* Button */}
          <button
            onClick={analyzeReceipt}
            disabled={!file || loading}
            className="mt-6 w-full rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          >

            {loading
              ? "Sedang menganalisis..."
              : "Analisis Nota"}

          </button>

        </div>


        {/* Result */}
        {result && (
          <div className="mt-8 rounded-2xl bg-white p-6 shadow">

            <h2 className="text-2xl font-bold text-gray-900">
              Hasil Analisis
            </h2>


            {/* Merchant */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              <div>
                <p className="text-sm text-gray-500">
                  Merchant
                </p>

                <p className="font-semibold text-gray-900">
                  {result.merchant}
                </p>
              </div>


              <div>
                <p className="text-sm text-gray-500">
                  Tanggal
                </p>

                <p className="font-semibold text-gray-900">
                  {result.date}
                </p>
              </div>

            </div>


            {/* Items */}
            <div className="mt-8">

              <h3 className="mb-3 font-semibold text-gray-900">
                Items
              </h3>

              <div className="overflow-x-auto">

                <table className="w-full text-sm">

                  <thead>
                    <tr className="border-b text-left">

                      <th className="px-3 py-3 font-semibold text-gray-900">
                        Item
                      </th>

                      <th className="px-3 py-3 font-semibold text-gray-900">
                        Qty
                      </th>

                      <th className="px-3 py-3 font-semibold text-gray-900">
                        Harga
                      </th>

                      <th className="px-3 py-3 font-semibold text-gray-900">
                        Total
                      </th>

                    </tr>
                  </thead>


                  <tbody>

                    {result.items.map(
                      (item, index) => (

                        <tr
                          key={index}
                          className="border-b"
                        >

                          <td className="px-3 py-3 font-semibold text-gray-900">
                            {item.name}
                          </td>

                          <td className="px-3 py-3 font-semibold text-gray-900">
                            {item.quantity}
                          </td>

                          <td className="px-3 py-3 font-semibold text-gray-900">
                            Rp{" "}
                            {item.unit_price.toLocaleString(
                              "id-ID"
                            )}
                          </td>

                          <td className="px-3 py-3 font-semibold text-gray-900">
                            Rp{" "}
                            {item.total.toLocaleString(
                              "id-ID"
                            )}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>


            {/* Grand Total */}
            <div className="mt-6 flex items-center justify-between border-t pt-6">

              <span className="text-lg font-medium text-gray-900">
                Grand Total
              </span>

              <span className="text-2xl font-bold text-gray-900">
                Rp{" "}
                {result.grand_total.toLocaleString(
                  "id-ID"
                )}
              </span>

            </div>

          </div>
        )}

      </div>

    </main>
  );
}