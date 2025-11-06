import Image from "next/image";
import Link from "next/link";
import { track } from "@/lib/analytics";

export type CardDeepDiveProps = {
  image: string;
  title: string;
  role: string;
  timeframe: string;
  outcomes: string[];
  href: string;
};

export default function CardDeepDive({ image, title, role, timeframe, outcomes, href }: CardDeepDiveProps) {
  return (
    <Link
      href={href}
      className="group block rounded-lg bg-card border border-border shadow-md overflow-hidden focus-visible:outline-2 focus-visible:outline-brand"
      aria-label={`Read case study: ${title}`}
      onClick={() => track("card_open", { type: "deep", slug: href.split("/").pop() })}
      prefetch
    >
      <div className="aspect-[3/2] w-full relative bg-muted">
        <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 90vw, 480px" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-1 line-clamp-2">{title}</h3>
        <div className="text-sm text-muted mb-2">{role} • {timeframe}</div>
        <ul className="list-disc pl-5 text-sm mb-2">
          {outcomes.map((o, i) => <li key={i}>{o}</li>)}
        </ul>
        <span className="inline-block mt-2 text-brand font-medium group-hover:underline">Read case study</span>
      </div>
    </Link>
  );
}
