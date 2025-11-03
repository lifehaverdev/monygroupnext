import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import { marked } from "marked";


type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slugData = await params;
  const slug = slugData.slug;
  const filePath = path.join(process.cwd(), "audits-src", `${slug}.md`);
  try {
    const md = await fs.readFile(filePath, "utf8");
    const match = md.match(/^#\s+(.+)$/m);
    return { title: match ? match[1] : `Audit – ${slug}` };
  } catch {
    notFound();
  }
}

export default async function AuditDetail({ params }: Props) {
  const slugData = await params;
  const slug = slugData.slug;
  const filePath = path.join(process.cwd(), "audits-src", `${slug}.md`);
  let html: string;
  try {
    const md = await fs.readFile(filePath, "utf8");
    html = marked.parse(md) as string;
  } catch {
    notFound();
  }

  return (
    <article
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
