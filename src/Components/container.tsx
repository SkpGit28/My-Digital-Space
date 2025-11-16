// src/components/Container.tsx
export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-4xl px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
}
