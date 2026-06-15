
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [displayName, setDisplayName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            displayName,
            email,
            password,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok || !result.success) {
        setError(
          result.message ||
            "Registration failed."
        );
        return;
      }

      router.push("/login");
    } catch {
      setError(
        "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-xl">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">
            LE FOIN®
          </h1>

          <p className="mt-2 text-neutral-400">
            Create your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Display Name
            </label>

            <input
              type="text"
              required
              value={displayName}
              onChange={(e) =>
                setDisplayName(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Confirm Password
            </label>

            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-yellow-500 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-50"
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-yellow-500 hover:text-yellow-400"
          >
            Sign In
          </a>
        </div>
      </div>
    </main>
  );
}

