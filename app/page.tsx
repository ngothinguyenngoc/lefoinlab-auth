
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-4xl text-center">

        <div className="mb-6">
          <h1 className="text-6xl font-extrabold tracking-tight">
            LE FOIN®
          </h1>

          <p className="mt-4 text-2xl font-semibold text-yellow-500">
            Identity Platform
          </p>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400 leading-8">
          One secure account for the entire
          Le Foin ecosystem.
          <br />
          Access research, games, books,
          comics and future digital services
          with a unified identity.
        </p>

        <div className="mt-12 flex flex-col gap-4 justify-center sm:flex-row">

          <Link
            href="/login"
            className="rounded-xl bg-yellow-500 px-8 py-4 font-bold text-black transition hover:bg-yellow-400"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="rounded-xl border border-neutral-700 px-8 py-4 font-bold text-white transition hover:border-yellow-500 hover:text-yellow-500"
          >
            Create Account
          </Link>

        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <h3 className="text-lg font-semibold">
              Secure
            </h3>

            <p className="mt-3 text-sm text-neutral-400">
              Authentication powered by JWT
              and modern security practices.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <h3 className="text-lg font-semibold">
              Unified
            </h3>

            <p className="mt-3 text-sm text-neutral-400">
              One account for Wallet,
              Tarot, Catalog and every
              future Le Foin application.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <h3 className="text-lg font-semibold">
              Platform
            </h3>

            <p className="mt-3 text-sm text-neutral-400">
              Building scientific digital
              infrastructure for the
              Le Foin ecosystem.
            </p>
          </div>

        </div>

        <div className="mt-14 text-sm text-neutral-500">
          © 2026 Le Foin®
          <br />
          Research Meets Entertainment
        </div>

      </div>
    </main>
  );
}

