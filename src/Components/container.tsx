// src/components/Container.tsx
export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[62.5rem] px-6 lg:px-0 ${className}`}>
      {children}
    </div>
  );
}
