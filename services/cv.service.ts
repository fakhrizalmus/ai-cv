import { AnalyzeCvResponse } from "@/types/cv";

export async function analyzeCv(file: File): Promise<AnalyzeCvResponse> {
  const formData = new FormData();
  formData.append("cv", file);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cv/analyze`,
    { method: "POST", body: formData }
  );

  const result = await response.json();

  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Gagal menganalisis CV");
  }

  return result;
}
