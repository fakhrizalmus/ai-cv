"use client";

import { useEffect, useState } from "react";
import { analyzeCv } from "@/services/cv.service";
import { CvAnalysis } from "@/types/cv";

interface CvUploaderProps {
  onResult: (result: CvAnalysis) => void;
}

export default function CvUploader({ onResult }: CvUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(selectedFile.type.startsWith("image/") ? URL.createObjectURL(selectedFile) : null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Silakan pilih file CV terlebih dahulu.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await analyzeCv(file);
      onResult(response.data);
    } catch (analysisError) {
      setError(analysisError instanceof Error ? analysisError.message : "Gagal menganalisis CV");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <label htmlFor="cv-upload" className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-3xl">📄</div>
        <p className="font-semibold text-slate-900">Upload CV kamu</p>
        <p className="mt-2 text-sm text-slate-500">PDF, DOC, DOCX, JPG, PNG, atau WEBP</p>
        <input id="cv-upload" type="file" accept=".pdf,.doc,.docx,image/jpeg,image/png,image/webp" onChange={handleFileChange} className="hidden" />
      </label>

      {preview && <img src={preview} alt="Preview CV" className="mt-6 max-h-80 w-full rounded-2xl border object-contain" />}
      {file && <p className="mt-4 text-sm text-slate-600">File terpilih: <span className="font-medium text-slate-900">{file.name}</span></p>}
      {error && <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      <button onClick={handleAnalyze} disabled={!file || loading} className="mt-6 w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300">
        {loading ? "Sedang menganalisis CV..." : "Analyze CV ATS"}
      </button>
    </section>
  );
}
