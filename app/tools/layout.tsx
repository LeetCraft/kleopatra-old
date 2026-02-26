"use client";

import Link from "next/link";
import { Shield, ArrowLeft, Lock, Github, Sun, Moon } from "lucide-react";
import { useTheme } from "@/feature/theme";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggle } = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}
    >
      {/* Top nav */}
      <header
        className="backdrop-blur-xl sticky top-0 z-10"
        style={{
          borderBottom: "1px solid var(--border-default)",
          background: "var(--bg-card)",
          opacity: 0.97,
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 transition-colors group"
            style={{ color: "var(--text-accent)" }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span className="font-bold tracking-tight">Kleopatra</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/tools"
              className="text-sm transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              All Tools
            </Link>
            <a
              href="https://github.com/nicobytes/kleopatra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <Github className="w-4 h-4" />
              Open Source
            </a>
            <button
              onClick={toggle}
              className="p-1.5 rounded-lg transition-all"
              style={{
                color: "var(--text-secondary)",
                border: "1px solid var(--border-default)",
              }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Trust bar */}
      <div style={{ background: "var(--accent-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="max-w-4xl mx-auto px-6 py-2 flex items-center justify-center gap-6 flex-wrap">
          <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-accent)" }}>
            <Shield className="w-3 h-3" />
            Nothing stored on servers
          </span>
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>·</span>
          <span className="text-xs" style={{ color: "var(--text-accent)" }}>100% client-side encryption</span>
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>·</span>
          <span className="text-xs" style={{ color: "var(--text-accent)" }}>Open source</span>
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>·</span>
          <span className="text-xs" style={{ color: "var(--text-accent)" }}>No account required</span>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border-default)", background: "var(--bg-card)" }}>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-500" />
              <span className="font-bold" style={{ color: "var(--text-heading)" }}>Kleopatra PGP</span>
            </div>
            <nav className="flex items-center gap-6 text-sm" style={{ color: "var(--text-secondary)" }}>
              <Link href="/tools" className="hover:opacity-75 transition-opacity">Tools</Link>
              <Link href="/tools/what-is-pgp" className="hover:opacity-75 transition-opacity">What is PGP?</Link>
              <Link href="/tools/kleopatra-download" className="hover:opacity-75 transition-opacity">Download</Link>
              <Link href="/tools/pgp-key-generator" className="hover:opacity-75 transition-opacity">Key Generator</Link>
            </nav>
          </div>
          <p className="mt-6 text-xs text-center" style={{ color: "var(--text-tertiary)" }}>
            All cryptographic operations run in your browser. No data is ever transmitted to our servers.
            Kleopatra is free and open-source software.
          </p>
        </div>
      </footer>
    </div>
  );
}
