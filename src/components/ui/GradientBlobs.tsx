export function GradientBlobs({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="blob top-0 left-[10%] h-72 w-72 bg-primary animate-blob" />
      <div className="blob top-1/3 right-[10%] h-96 w-96 bg-secondary animate-blob [animation-delay:4s]" />
      <div className="blob bottom-0 left-1/3 h-80 w-80 bg-pink-500 animate-blob [animation-delay:8s]" />
    </div>
  );
}
