import { CvAnalysis } from "@/types/cv";

interface CvResultProps { result: CvAnalysis }

function LinkOrText({ value }: { value?: string }) {
  if (!value) return null;
  return value.startsWith("http") ? <a href={value} target="_blank" rel="noreferrer" className="break-all text-indigo-600 hover:underline">{value}</a> : <span>{value}</span>;
}

export default function CvResult({ result }: CvResultProps) {
  const score = Math.max(0, Math.min(100, result.ats_score));
  return (
    <section className="mt-8 space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
        <div className="rounded-3xl bg-slate-900 p-7 text-white shadow-sm">
          <p className="text-sm font-medium text-indigo-300">Candidate profile</p>
          <h2 className="mt-2 text-3xl font-bold">{result.candidate.name}</h2>
          <p className="mt-2 text-slate-300">{result.candidate.email} · {result.candidate.phone}</p>
          <p className="mt-1 text-slate-300">{result.candidate.location}</p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm"><LinkOrText value={result.candidate.linkedin} /><LinkOrText value={result.candidate.portfolio} /><LinkOrText value={result.candidate.git_repo} /></div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-500">ATS Score</p>
          <p className="mt-2 text-6xl font-bold text-indigo-600">{score}</p>
          <p className={`mt-2 text-sm font-semibold ${result.ats_friendly ? "text-emerald-600" : "text-amber-600"}`}>{result.ats_friendly ? "ATS Friendly" : "Perlu perbaikan"}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card title="Professional summary"><p className="leading-7 text-slate-600">{result.summary}</p></Card>
          <Card title="Skills"><div className="flex flex-wrap gap-2">{result.skills.map((skill) => <span key={skill} className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700">{skill}</span>)}</div></Card>
          <Card title="Education">{result.education.map((item) => <p key={item} className="leading-7 text-slate-600">{item}</p>)}</Card>
          <Card title="Certifications">{result.certifications.length ? result.certifications.map((item) => <p key={item} className="leading-7 text-slate-600">{item}</p>) : <p className="text-slate-600">Belum ditemukan.</p>}</Card>
        </div>
        <div className="space-y-6">
          <Card title="Experience">{result.experience.map((job) => <article key={`${job.company}-${job.role}`} className="border-b border-slate-100 py-4 first:pt-0 last:border-0"><div className="flex flex-wrap justify-between gap-2"><div><h4 className="font-semibold text-slate-900">{job.role}</h4><p className="text-sm text-indigo-600">{job.company}</p></div><span className="text-sm text-slate-500">{job.period}</span></div><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">{job.achievements.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</Card>
          <Card title="Keywords"><div className="flex flex-wrap gap-2">{result.keywords_found.map((keyword) => <span key={keyword} className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm text-emerald-700">{keyword}</span>)}</div><h4 className="mt-5 font-semibold text-slate-900">Missing keywords</h4><div className="mt-2 flex flex-wrap gap-2">{result.missing_keywords.map((keyword) => <span key={keyword} className="rounded-full bg-amber-50 px-3 py-1.5 text-sm text-amber-700">{keyword}</span>)}</div></Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2"><Card title="Issues" tone="warning"><ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">{result.issues.map((item) => <li key={item}>{item}</li>)}</ul></Card><Card title="Recommendations" tone="success"><ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">{result.recommendations.map((item) => <li key={item}>{item}</li>)}</ul></Card></div>
    </section>
  );
}

function Card({ title, children, tone = "default" }: { title: string; children: React.ReactNode; tone?: "default" | "warning" | "success" }) {
  const border = tone === "warning" ? "border-amber-200" : tone === "success" ? "border-emerald-200" : "border-slate-200";
  return <div className={`rounded-3xl border ${border} bg-white p-6 shadow-sm`}><h3 className="mb-4 text-lg font-bold text-slate-900">{title}</h3>{children}</div>;
}
