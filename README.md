# Kleopatra Neo (local-only edition)

A PGP key manager, encrypt / decrypt and sign / verify tool that runs entirely in your browser. Keys live in your browser's local storage and never leave your device.

This version has no remote or sync feature: no account, no server, no network call. It is published temporarily while the codebase is being split cleanly into an open-source core and a private commercial part (hosted sync, billing, teams). The core repository will replace this one once the split is done.

## What it does

- Generate PGP key pairs (RSA 4096 or Curve25519) and import existing public or private keys, armored or binary
- Encrypt and sign messages for any imported public key, decrypt and verify with your private keys
- Everything runs client-side with [OpenPGP.js](https://github.com/openpgpjs/openpgpjs)
- Guides on PGP basics under `/tools`

## Run it locally

```bash
bun install
bun run dev
```

Then open http://localhost:3000. `bun run build` produces a production build. Node with npm works too (`npm install`, `npm run dev`).

Analytics are off unless you set `NEXT_PUBLIC_POSTHOG_KEY`; the published code sends nothing.
