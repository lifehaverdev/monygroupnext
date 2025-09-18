interface Params { params: { slug: string } }

export async function generateMetadata({ params }: Params) {
  return { title: `Audit – ${params.slug}` };
}

export default function AuditDetail({ params }: Params) {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>{params.slug.replace(/-/g, " ")}</h1>
      <p>This is a placeholder for the full audit report.</p>
    </article>
  );
}
