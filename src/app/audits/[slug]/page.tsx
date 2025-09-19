import type { Metadata } from "next";


type Props = PageProps<'/audits/[slug]'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Audit – ${slug}` };
}

export default async function AuditDetail({ params }: Props) {
  const { slug } = await params;
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>{slug.replace(/-/g, " ")}</h1>
      <p>This is a placeholder for the full audit report.</p>
    </article>
  );
}
