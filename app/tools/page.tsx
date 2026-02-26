import type { Metadata } from "next";
import Link from "next/link";
import {
  Lock,
  Unlock,
  Key,
  Download,
  Apple,
  Globe,
  BookOpen,
  ArrowRight,
  Shield,
  FileKey,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PGP Tools — Encrypt, Decrypt, Generate Keys Online",
  description:
    "Free browser-based PGP tools: encrypt messages, decrypt PGP, generate key pairs, and learn about OpenPGP encryption. No installation, no account, no server storage.",
  alternates: {
    canonical: "https://kleopatra.app/tools",
  },
};

const tools = [
  {
    slug: "pgp-encrypt",
    icon: Lock,
    iconColor: "text-cyan-400",
    iconBg: "rgba(6, 182, 212, 0.06)",
    iconBorder: "rgba(6, 182, 212, 0.14)",
    title: "PGP Encrypt Online",
    description:
      "Encrypt any message with a PGP public key. Anyone with the matching private key can decrypt it — and only them.",
    keywords: ["pgp encrypt online", "encrypt message pgp"],
  },
  {
    slug: "pgp-decrypt",
    icon: Unlock,
    iconColor: "text-indigo-400",
    iconBg: "rgba(99, 102, 241, 0.06)",
    iconBorder: "rgba(99, 102, 241, 0.14)",
    title: "PGP Decrypt Online",
    description:
      "Decrypt a PGP-encrypted message using your private key. Fully client-side — your private key never leaves your browser.",
    keywords: ["pgp decrypt online", "decrypt pgp message"],
  },
  {
    slug: "pgp-key-generator",
    icon: Key,
    iconColor: "text-emerald-400",
    iconBg: "rgba(16, 185, 129, 0.06)",
    iconBorder: "rgba(16, 185, 129, 0.14)",
    title: "PGP Key Generator",
    description:
      "Generate a secure RSA 4096-bit PGP key pair online. Download your public and private keys instantly.",
    keywords: ["pgp key generator", "generate pgp key pair online"],
  },
  {
    slug: "kleopatra-download",
    icon: Download,
    iconColor: "text-cyan-400",
    iconBg: "rgba(6, 182, 212, 0.06)",
    iconBorder: "rgba(6, 182, 212, 0.14)",
    title: "Kleopatra Download (Windows / Gpg4win)",
    description:
      "Looking for the desktop Kleopatra app? Get download links for Kleopatra on Windows via Gpg4win — or use our browser version instead.",
    keywords: ["kleopatra download", "pgp4win", "gpg4win download"],
  },
  {
    slug: "kleopatra-mac",
    icon: Apple,
    iconColor: "text-indigo-400",
    iconBg: "rgba(99, 102, 241, 0.06)",
    iconBorder: "rgba(99, 102, 241, 0.14)",
    title: "Kleopatra for Mac",
    description:
      "Kleopatra is not natively available on macOS. Discover the best alternatives — including our free browser-based PGP tool that works on any device.",
    keywords: ["kleopatra mac", "kleopatra mac download", "pgp mac"],
  },
  {
    slug: "kleopatra-alternative",
    icon: FileKey,
    iconColor: "text-emerald-400",
    iconBg: "rgba(16, 185, 129, 0.06)",
    iconBorder: "rgba(16, 185, 129, 0.14)",
    title: "Kleopatra Alternatives",
    description:
      "Explore alternatives to the Kleopatra desktop app, including web-based PGP tools that require no installation.",
    keywords: ["kleopatra alternative", "kleopatra linux", "gpg alternative"],
  },
  {
    slug: "pgp-online",
    icon: Globe,
    iconColor: "text-cyan-400",
    iconBg: "rgba(6, 182, 212, 0.06)",
    iconBorder: "rgba(6, 182, 212, 0.14)",
    title: "PGP Online Tool",
    description:
      "A complete PGP tool in your browser. Encrypt, decrypt, sign and verify messages without installing any software.",
    keywords: ["pgp online", "online pgp tool", "pgp tool free"],
  },
  {
    slug: "what-is-pgp",
    icon: BookOpen,
    iconColor: "text-indigo-400",
    iconBg: "rgba(99, 102, 241, 0.06)",
    iconBorder: "rgba(99, 102, 241, 0.14)",
    title: "What is PGP Encryption?",
    description:
      "Learn how PGP (Pretty Good Privacy) encryption works, why it matters, and how to use it to protect your communications.",
    keywords: ["what is pgp", "pgp encryption explained", "pgp vs gpg"],
  },
  {
    slug: "openpgp-vs-pgp",
    icon: HelpCircle,
    iconColor: "text-emerald-400",
    iconBg: "rgba(16, 185, 129, 0.06)",
    iconBorder: "rgba(16, 185, 129, 0.14)",
    title: "OpenPGP vs PGP — What's the Difference?",
    description:
      "Understand the difference between PGP, OpenPGP, and GPG — and why it matters when choosing encryption tools.",
    keywords: ["openpgp vs pgp", "openpgp standard", "pgp vs gpg"],
  },
  {
    slug: "pgp-key-import",
    icon: Shield,
    iconColor: "text-cyan-400",
    iconBg: "rgba(6, 182, 212, 0.06)",
    iconBorder: "rgba(6, 182, 212, 0.14)",
    title: "How to Import a PGP Key",
    description:
      "Step-by-step guide to importing PGP public and private keys — in Kleopatra, GPG, and directly in your browser.",
    keywords: ["how to import pgp key", "pgp key import", "import public key"],
  },
];

export default function ToolsPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
          style={{ color: "var(--text-accent)", border: "1px solid var(--accent-border)", background: "var(--accent-subtle)" }}
        >
          <Shield className="w-3 h-3" />
          100% browser-based · No server storage
        </div>
        <h1 className="text-4xl font-bold tracking-tight" style={{ color: "var(--text-heading)" }}>
          Free PGP Encryption Tools
        </h1>
        <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Everything you need to encrypt messages, manage PGP keys, and protect
          your communications — running entirely in your browser. Open source,
          free forever.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all text-sm font-medium"
          style={{ background: "var(--accent-subtle)", border: "1px solid var(--accent-border)", color: "var(--text-accent)" }}
        >
          Open the PGP App
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Tools grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group flex flex-col gap-3 p-5 rounded-2xl transition-all"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: tool.iconBg,
                  border: `1px solid ${tool.iconBorder}`,
                }}
              >
                <Icon className={`w-4 h-4 ${tool.iconColor}`} />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-sm font-semibold transition-colors" style={{ color: "var(--text-heading)" }}>
                  {tool.title}
                </h2>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {tool.description}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs mt-auto" style={{ color: "var(--text-accent)" }}>
                Learn more <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div
        className="rounded-2xl p-8 text-center space-y-4"
        style={{ background: "var(--accent-subtle)", border: "1px solid var(--accent-border)" }}
      >
        <h2 className="text-xl font-bold" style={{ color: "var(--text-heading)" }}>
          Ready to encrypt your first message?
        </h2>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          No installation. No account. No data ever leaves your browser.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm"
          style={{
            background: "var(--accent)",
            color: "#080F1C",
            fontWeight: 600,
          }}
        >
          Open Kleopatra PGP App
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
