'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-4xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted mb-8">
        {error.message || 'An unexpected error occurred'}
      </p>
      <button onClick={reset} className="button">
        Try again
      </button>
    </div>
  );
}
