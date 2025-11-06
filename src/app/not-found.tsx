export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-muted mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <a href="/" className="button">Return Home</a>
    </div>
  );
}
