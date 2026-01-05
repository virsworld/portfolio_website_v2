export default function Note({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="my-4 p-4 rounded-md border-l-4 border-color-sky-blue text-color-foreground"
      style={{
        background: 'linear-gradient(to right, rgba(163, 217, 220, 0.1), transparent)',
      }}
    >
      {children}
    </div>
  );
}