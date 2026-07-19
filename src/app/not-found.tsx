import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-muted mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link href="/" className="button">Return Home</Link>
    </div>
  );
}
