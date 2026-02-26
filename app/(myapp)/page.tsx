"use client";
import { Shield, ArrowRight, KeyRound, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <div className="max-w-sm w-full space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div
            className="p-5 rounded-2xl"
            style={{
              background: "var(--accent-subtle)",
              border: "1px solid var(--accent-border)",
              boxShadow: "0 0 40px -8px var(--accent-glow)",
            }}
          >
            <Shield className="w-10 h-10" style={{ color: "var(--text-accent)" }} />
          </div>
        </div>

        {/* Copy */}
        <div className="space-y-2">
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--text-heading)" }}
          >
            Select a key to get started
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Choose a key from the sidebar, or create a new one below.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Link
            href="/create-private-key"
            className="btn-primary justify-center py-3"
          >
            <KeyRound className="w-4 h-4" />
            Create Private Key
            <ArrowRight className="w-3.5 h-3.5 ml-auto" />
          </Link>
          <Link
            href="/import-public-key"
            className="btn-ghost justify-center py-3"
          >
            <Users className="w-4 h-4" />
            Import Public Key
          </Link>
        </div>
      </div>
    </div>
  );
}
