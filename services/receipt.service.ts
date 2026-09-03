import { AnalyzeReceiptResponse } from "@/types/receipt";

export async function analyzeReceipt(
  file: File
): Promise<AnalyzeReceiptResponse> {

  const formData = new FormData();

  formData.append("receipt", file);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/receipt/analyze`,
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Gagal menganalisis nota"
    );
  }

  return result;
}