import Image from "next/image";
import Link from "next/link";
import { track } from "@/lib/analytics";

export type CardBiteProps = {
  image: string;
  title: string;
  blurb: string;
  tags?: string[];
  ctaLabel?: string;
  href: string;
};

export default function CardBite({ image, title, blurb, tags = [], ctaLabel = "View bite", href }: CardBiteProps) {
  return (
    <Link
      href={href}
      className="group block rounded-lg bg-card border border-border shadow-sm overflow-hidden focus-visible:outline-2 focus-visible:outline-brand"
      aria-label={`View bite: ${title}`}
      onClick={() => track("card_open", { type: "bite", slug: href.split("/").pop() })}
      prefetch
    >
      <div className="aspect-[16/9] w-full relative bg-muted">
        <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 80vw, 320px" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 line-clamp-2">{title}</h3>
        <p className="text-sm text-muted mb-2 line-clamp-3">{blurb}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(tag => (
            <span key={tag} className="text-xs bg-muted/30 rounded px-2 py-0.5 text-muted">{tag}</span>
          ))}
        </div>
        <span className="inline-block mt-2 text-brand font-medium group-hover:underline">{ctaLabel}</span>
      </div>
    </Link>
  );
}
