import LiveClock from "./LiveClock";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs text-[var(--text-tertiary)] uppercase tracking-widest">
            © {new Date().getFullYear()} Mushfiq · Built with Next.js
          </p>
          <LiveClock />
        </div>
        <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
          <a
            href="https://github.com/mushfiqrajput"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link hover:text-[var(--text-primary)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mushfiq-rajput/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link hover:text-[var(--text-primary)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:mushfiq.rajput013@gmail.com"
            className="nav-link hover:text-[var(--text-primary)] transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
