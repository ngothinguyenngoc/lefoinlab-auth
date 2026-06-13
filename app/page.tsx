export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="max-w-3xl text-center px-6">
        <h1 className="text-6xl font-bold tracking-tight">
          Le Foin®
        </h1>

        <h2 className="text-3xl font-semibold mt-4">
          Identity Platform
        </h2>

        <p className="mt-6 text-lg text-gray-600">
          Secure Authentication Infrastructure
          for the Le Foin Ecosystem.
        </p>

        <div className="mt-10 border rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold">
            Status
          </h3>

          <p className="mt-2 text-green-600 font-bold">
            ● Online
          </p>

          <p className="mt-4">
            Version 1.0
          </p>
        </div>

        <div className="mt-10 text-left border rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            Available APIs
          </h3>

          <ul className="space-y-2">
            <li>✅ /api/register</li>
            <li>✅ /api/login</li>
            <li>✅ /api/me</li>
          </ul>
        </div>

        <div className="mt-10 text-sm text-gray-500">
          © 2026 Le Foin®
          <br />
          Building scientific digital infrastructure.
        </div>
      </div>
    </main>
  );
}