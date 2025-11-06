import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import bites from "@/content/bites.json";

type Props = {
  params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const bite = bites.find(b => b.id === params.slug);
  if (!bite) return {};

  return {
    title: `${bite.title} • Sushant Kumar`,
    description: bite.summary,
    openGraph: {
      title: bite.title,
      description: bite.summary,
      images: [{ url: bite.image }],
    },
  };
}

export default function BitePage({ params }: Props) {
  const bite = bites.find(b => b.id === params.slug);
  if (!bite) notFound();

  return (
    <article className="py-16">
      <div className="container-p max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {bite.tags.map(tag => (
              <span key={tag} className="px-2 py-1 text-sm bg-card rounded-full text-muted">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{bite.title}</h1>
          <p className="text-lg text-muted">{bite.summary}</p>
        </div>

        {/* Image */}
        <div className="aspect-video w-full relative rounded-lg overflow-hidden mb-8">
          <Image 
            src={bite.image} 
            alt={bite.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content placeholder - in real app, this would come from a CMS or markdown file */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>Content for this bite study is coming soon...</p>
        </div>
      </div>
    </article>
  );
}
