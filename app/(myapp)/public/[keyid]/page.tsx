"use client";
import * as openpgp from "openpgp";
import { useKeyStore } from "@/feature/keystore";
import { use, useEffect, useState } from "react";
import {
  Users,
  Key,
  FileCheck,
  Trash2,
  AlertCircle,
  Copy,
  CheckCircle2,
  Shield,
} from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useRouter } from "next/navigation";

export default function PublicKeyPage({
  params,
}: {
  params: Promise<{ keyid: string }>;
}) {
  const { keyid } = use(params);
  const [publicKey, setPublicKey] = useState("");
  const [keyname, setKeyname] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [verificationText, setVerificationText] = useState("");
  const [signature, setSignature] = useState("");
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const armoredPublicKey = await useKeyStore.getState().getPublicKeyFromMyPublicKeys(keyid);
        setPublicKey(armoredPublicKey.key);
        setKeyname(armoredPublicKey.keyname);
      } catch (err) {
        setError("Failed to load public key");
        setPublicKey("");
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [keyid]);

  const handleCipher = async () => {
    if (!message.trim()) {
      setError("Please enter a message to encrypt");
      return;
    }
    setIsLoading(true);
    try {
      const key = await openpgp.readKey({ armoredKey: publicKey });
      const encryptedMsg = await openpgp.encrypt({
        encryptionKeys: key,
        message: await openpgp.createMessage({ text: message }),
      });
      setMessage(encryptedMsg.toString());
    } catch (err) {
      setError("Encryption failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyKey = async () => {
    await navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerifySignature = async () => {
    if (!signature.trim() || !verificationText.trim()) {
      setError("Please provide both the signature and the text to verify");
      return;
    }
    setIsLoading(true);
    try {
      const publicKeyObj = await openpgp.readKey({ armoredKey: publicKey });
      const signatureObj = await openpgp.readSignature({ armoredSignature: signature });
      const msg = await openpgp.createMessage({ text: verificationText });
      const verificationResult = await openpgp.verify({ message: msg, signature: signatureObj, verificationKeys: publicKeyObj });
      const { verified } = verificationResult.signatures[0];
      await verified;
      setError(null);
      alert("Signature verified successfully!");
    } catch (err) {
      setError("Invalid signature or verification failed");
    } finally {
      setIsLoading(false);
      setShowVerifyDialog(false);
    }
  };

  const handleDeleteKey = async () => {
    try {
      const deletePublicKey = useKeyStore.getState().deletePublicKey;
      deletePublicKey(keyid);
      router.push("/");
    } catch (err) {
      setError("Failed to delete key");
    } finally {
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-5 md:p-7 h-full w-full overflow-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="icon-wrap-indigo">
            <Users className="w-5 h-5 text-indigo-500" />
          </div>
          <div>
            <p className="section-label mb-0.5">Public Key</p>
            <h1 className="text-lg font-bold tracking-tight truncate" style={{ color: "var(--text-heading)" }}>
              {keyname || keyid}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowVerifyDialog(true)}
            className="btn-ghost"
            style={{ color: "#059669", borderColor: "rgba(16,185,129,0.25)" }}
          >
            <FileCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Verify Signature</span>
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
              Armored Public Key
            </div>
            <button onClick={handleCopyKey} className="btn-ghost py-1.5 text-xs">
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea className="textarea-field flex-1 min-h-[200px]" value={publicKey} readOnly />
        </section>

        {/* Encrypt message */}
        <section className="glass-card flex flex-col p-5 gap-3 min-h-[280px]">
          <div className="section-label">
            <Shield className="w-3 h-3" />
            Encrypt Message
          </div>
          <div className="relative flex-1 flex flex-col">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter a plaintext message to encrypt with this public key..."
              className="textarea-field flex-1 min-h-[200px] pb-14"
            />
            <button onClick={handleCipher} disabled={!message.trim()} className="btn-primary absolute right-3 bottom-3">
              <Shield className="w-3.5 h-3.5" />
              Encrypt
            </button>
          </div>
        </section>
      </div>

      {/* Verify Signature Dialog */}
      <Dialog
        isOpen={showVerifyDialog}
        onClose={() => { setShowVerifyDialog(false); setVerificationText(""); setSignature(""); setError(null); }}
        title="Verify Digital Signature"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-tertiary)" }}>
              Original Text
            </label>
            <textarea
              value={verificationText}
              onChange={(e) => setVerificationText(e.target.value)}
              className="textarea-field h-28"
              placeholder="Enter the original text..."
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-tertiary)" }}>
              PGP Signature
            </label>
            <textarea
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="textarea-field h-28"
              placeholder="-----BEGIN PGP SIGNATURE-----"
            />
          </div>
          <button
            onClick={handleVerifySignature}
            disabled={!signature.trim() || !verificationText.trim()}
            className="btn-primary w-full justify-center py-2.5"
            style={{ background: "#10B981", color: "#fff" }}
          >
            <FileCheck className="w-4 h-4" />
            Verify Signature
          </button>
        </div>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} title="Delete Public Key">
        <div className="space-y-5">
          <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "var(--danger-bg)", border: "1px solid var(--danger-border)" }}>
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--danger-text)" }} />
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--danger-text)" }}>This action is permanent</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--danger-text)", opacity: 0.7 }}>
                The public key <span className="font-medium">{keyname}</span> will be permanently removed from your keystore and cannot be recovered.
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
        <div className="fixed bottom-5 right-5 max-w-sm animate-slide-up flex items-start gap-3 p-4 rounded-xl shadow-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--danger-border)" }}>
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--danger-text)" }} />
          <p className="flex-1 text-sm" style={{ color: "var(--text-primary)" }}>{error}</p>
          <button onClick={() => setError(null)} className="text-xs" style={{ color: "var(--text-tertiary)" }}>✕</button>
        </div>
      )}
    </div>
  );
}
