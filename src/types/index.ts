export interface Bite {
  id: string;
  title: string;
  summary: string;
  image: string;
  tags: string[];
  ctaLabel: string;
  href: string;
  content: string;
  publishedAt: string;
}

export interface DeepDive {
  id: string;
  title: string;
  summary: string;
  image: string;
  tags: string[];
  ctaLabel: string;
  href: string;
  content: string;
  publishedAt: string;
  readingTime: string;
}

export interface NewsletterSubscription {
  email: string;
  name?: string;
  subscribed_at: string;
}

export type TabType = 'bites' | 'deep';
