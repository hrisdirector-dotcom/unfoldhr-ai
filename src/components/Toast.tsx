interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;
  return (
    <div className="fixed bottom-7 right-7 bg-foreground text-background px-5 py-3 rounded-lg font-semibold text-sm z-[999] border-l-[3px] border-l-primary fade-up-1">
      {message}
    </div>
  );
}
