import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import deep from "@/content/deep.json";

type Props = {
  params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = deep.find(d => d.id === params.slug);
  if (!study) return {};

  return {
    title: `${study.title} • Sushant Kumar`,
    description: study.problem,
    openGraph: {
      title: study.title,
      description: study.problem,
      images: [{ url: study.heroImage }],
    },
  };
}

export default function CaseStudyPage({ params }: Props) {
  const study = deep.find(d => d.id === params.slug);
  if (!study) notFound();

  return (
    <article className="py-16">
      <div className="container-p">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{study.title}</h1>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-muted">
            <div>
              <dt className="text-sm mb-1">Role</dt>
              <dd className="font-medium text-fg">{study.role}</dd>
            </div>
            <div>
              <dt className="text-sm mb-1">Timeline</dt>
              <dd className="font-medium text-fg">{study.timeframe}</dd>
            </div>
            <div>
              <dt className="text-sm mb-1">Reading time</dt>
              <dd className="font-medium text-fg">{study.readingTimeMins} min</dd>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="aspect-[16/9] w-full relative mb-16 rounded-lg overflow-hidden">
          <Image 
            src={study.heroImage} 
            alt={study.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content sections */}
        <div className="max-w-3xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Problem</h2>
            <p className="text-lg text-muted">{study.problem}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Goals</h2>
            <ul className="list-disc pl-5 text-muted space-y-2">
              {study.goals.map((goal, i) => (
                <li key={i}>{goal}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Process</h2>
            <ul className="list-disc pl-5 text-muted space-y-2">
              {study.process.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Outcomes</h2>
            <ul className="list-disc pl-5 text-muted space-y-2">
              {study.outcomes.map((outcome, i) => (
                <li key={i}>{outcome}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
