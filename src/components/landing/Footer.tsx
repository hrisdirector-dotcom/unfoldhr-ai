export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6 md:px-14">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">© 2025 unfoldHR. AI-powered HR decision platform.</p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Security</span>
        </div>
      </div>
    </footer>
  );
}
