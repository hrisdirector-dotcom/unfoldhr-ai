import { pathForPage } from "@/lib/routes";

interface FooterProps {
  setPage?: (p: string) => void;
}

export default function Footer({ setPage }: FooterProps) {
  const year = new Date().getFullYear();

  const linkProps = (p: string) => ({
    href: pathForPage(p),
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!setPage) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      setPage(p);
    },
  });

  return (
    <footer className="border-t border-border py-12 px-6 md:px-14">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {year} UnfoldHR. HR workflow redesign and applied AI.
        </p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          {setPage && (
            <>
              <a {...linkProps("services")} className="hover:text-foreground transition-colors">
                Services
              </a>
              <a {...linkProps("agents")} className="hover:text-foreground transition-colors">
                Agent Platform
              </a>
              <a {...linkProps("workflows")} className="hover:text-foreground transition-colors">
                Workflow Library
              </a>
              <a {...linkProps("contact")} className="hover:text-foreground transition-colors">
                Contact
              </a>
              <a {...linkProps("snapshot")} className="hover:text-foreground transition-colors">
                Executive Snapshot
              </a>
            </>
          )}
          <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
