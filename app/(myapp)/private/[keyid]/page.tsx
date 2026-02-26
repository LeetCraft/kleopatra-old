"use client";
import * as openpgp from "openpgp";
import { useKeyStore } from "@/feature/keystore";
import { use, useEffect, useState } from "react";
import {
  Shield,
  Key,
  Trash2,
  Copy,
  CheckCircle2,
  Lock,
  AlertCircle,
  Pen,
} from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useRouter } from "next/navigation";

export default function PrivateKeyPage({
  params,
}: {
  params: Promise<{ keyid: string }>;
}) {
  const { keyid } = use(params);
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [keyname, setKeyname] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showSignDialog, setShowSignDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [textToSign, setTextToSign] = useState("");
  const [signature, setSignature] = useState("");
  const [sigCopied, setSigCopied] = useState(false);

  const router = useRouter();
  const deletePrivateKey = useKeyStore((s) => s.deletePrivateKey);

  useEffect(() => {
    const loadKeys = async () => {
      setIsLoading(true);
      try {
        const myKeyStore = useKeyStore.getState();
        const [privateKeyData, publicKeyData] = await Promise.all([
          myKeyStore.getPrivateKeyFromMyPrivateKeys(keyid),
          myKeyStore.getPublicKeyFromMyPrivateKeys(keyid),
        ]);
        setKeyname(privateKeyData.keyname);
        setPrivateKey(privateKeyData.key);
        setPublicKey(publicKeyData.key);
      } catch (err) {
        setError(`Failed to load keys: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };
    loadKeys();
  }, [keyid]);

  const handleDecipher = async () => {
    if (!message.trim()) {
      setError("Please enter a message to decrypt");
      return;
    }
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const pgpMessage = await openpgp.readMessage({ armoredMessage: message });
      const key = await openpgp.readPrivateKey({ armoredKey: privateKey });
      const { data } = await openpgp.decrypt({ decryptionKeys: key, message: pgpMessage });
      setMessage(data.toString());
    } catch (err) {
      setError("Failed to decrypt message. Is this encrypted for this key?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSign = async () => {
    if (!textToSign.trim()) {
      setError("Please enter text to sign");
      return;
    }
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const privateKeyObj = await openpgp.readPrivateKey({ armoredKey: privateKey });
      const msg = await openpgp.createMessage({ text: textToSign });
      const sig = await openpgp.sign({ message: msg, signingKeys: privateKeyObj });
      setSignature(sig.toString());
    } catch (err) {
      setError("Failed to create signature");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPublicKey = async () => {
    await navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySignature = async () => {
    await navigator.clipboard.writeText(signature);
    setSigCopied(true);
    setTimeout(() => setSigCopied(false), 2000);
  };

  const handleDeleteKey = () => {
    try {
      deletePrivateKey(keyid);
      setShowDeleteDialog(false);
      router.push("/");
    } catch (err) {
      setError("Failed to delete key");
    }
  };

  return (
    <div className="flex flex-col gap-5 p-5 md:p-7 h-full w-full overflow-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="icon-wrap">
            <Shield className="w-5 h-5 text-cyan-500" />
          </div>
          <div>
            <p className="section-label mb-0.5">Private Key</p>
            <h1 className="text-lg font-bold tracking-tight truncate" style={{ color: "var(--text-heading)" }}>
              {keyname || keyid}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSignDialog(true)}
            className="btn-ghost"
            style={{ color: "#059669", borderColor: "rgba(16,185,129,0.25)" }}
          >
            <Pen className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Message</span>
          </button>
          <button onClick={() => setShowDeleteDialog(true)} className="btn-danger">
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid md:grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Public Key viewer */}
        <section className="glass-card flex flex-col p-5 gap-3 min-h-[280px]">
          <div className="flex items-center justify-between">
            <div className="section-label">
              <Key className="w-3 h-3" />
              Derived Public Key
            </div>
            <button onClick={handleCopyPublicKey} className="btn-ghost py-1.5 text-xs">
              {copied ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea className="textarea-field flex-1 min-h-[200px]" value={publicKey} readOnly />
        </section>

        {/* Decrypt message */}
        <section className="glass-card flex flex-col p-5 gap-3 min-h-[280px]">
          <div className="section-label">
            <Lock className="w-3 h-3" />
            Decrypt Message
          </div>
          <div className="relative flex-1 flex flex-col">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Paste a PGP-encrypted message to decrypt..."
              className="textarea-field flex-1 min-h-[200px] pb-14"
            />
            <button onClick={handleDecipher} disabled={!message.trim()} className="btn-primary absolute right-3 bottom-3">
              <Lock className="w-3.5 h-3.5" />
              Decrypt
            </button>
          </div>
        </section>
      </div>

      {/* Sign Message Dialog */}
      <Dialog
        isOpen={showSignDialog}
        onClose={() => { setShowSignDialog(false); setTextToSign(""); setSignature(""); }}
        title="Sign Message"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-tertiary)" }}>
              Message to Sign
            </label>
            <textarea
              value={textToSign}
              onChange={(e) => setTextToSign(e.target.value)}
              placeholder="Enter the text you want to sign..."
              className="textarea-field h-28"
            />
          </div>

          {signature && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
                  PGP Signature
                </label>
                <button onClick={handleCopySignature} className="btn-ghost py-1 text-xs">
                  {sigCopied ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {sigCopied ? "Copied!" : "Copy"}
                </button>
              </div>
              <textarea value={signature} readOnly className="textarea-field h-28" style={{ color: "#059669" }} />
            </div>
          )}

          <button onClick={handleSign} className="btn-primary w-full justify-center py-2.5">
            <Pen className="w-4 h-4" />
            {signature ? "Re-generate Signature" : "Generate Signature"}
          </button>
        </div>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} title="Delete Private Key">
        <div className="space-y-5">
          <div
            className="flex items-start gap-3 p-4 rounded-xl"
            style={{ background: "var(--danger-bg)", border: "1px solid var(--danger-border)" }}
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--danger-text)" }} />
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--danger-text)" }}>
                This action is permanent
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--danger-text)", opacity: 0.7 }}>
                The private key <span className="font-medium">{keyname}</span> will be permanently removed. Ensure you have a backup before proceeding.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowDeleteDialog(false)} className="btn-neutral">Cancel</button>
            <button onClick={handleDeleteKey} className="btn-danger" style={{ borderColor: "rgba(239,68,68,0.4)", background: "var(--danger-bg)" }}>
              <Trash2 className="w-4 h-4" />
              Delete Permanently
            </button>
          </div>
        </div>
      </Dialog>

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50" style={{ background: "var(--bg-overlay)" }}>
          <div className="flex flex-col items-center gap-4 p-8 rounded-2xl" style={{ background: "var(--overlay-card-bg)", border: "1px solid var(--overlay-card-border)" }}>
            <LoadingSpinner className="w-8 h-8 text-cyan-500" />
            <p className="text-sm" style={{ color: "var(--text-accent)" }}>Processing…</p>
          </div>
        </div>
      )}

      {/* Error toast */}
      {error && (
        <div
          className="fixed bottom-5 right-5 max-w-sm animate-slide-up flex items-start gap-3 p-4 rounded-xl shadow-xl"
          style={{ background: "var(--bg-card)", border: "1px solid var(--danger-border)" }}
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--danger-text)" }} />
          <p className="flex-1 text-sm" style={{ color: "var(--text-primary)" }}>{error}</p>
          <button onClick={() => setError(null)} className="text-xs transition-colors" style={{ color: "var(--text-tertiary)" }}>✕</button>
        </div>
      )}
    </div>
  );
}
