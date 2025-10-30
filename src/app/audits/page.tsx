import Link from "next/link";

export const metadata = { title: "Audits" };

export default function Audits() {
  const demoAudits = [
    { slug: "demo-audit-1", title: "Demo Audit 1" },
    { slug: "demo-audit-2", title: "Demo Audit 2" },
    { slug: "sample-report", title: "Sample Audit Report" },
  ];

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Audit Reports</h1>
      <ul className="list-disc pl-6 space-y-1">
        {demoAudits.map((a) => (
          <li key={a.slug}>
            <Link href={`/audits/${a.slug}`} className="underline">
              {a.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
