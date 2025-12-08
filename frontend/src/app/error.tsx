"use client"
export default function ErrorPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="bg-red-50 border border-red-300 shadow-lg rounded-2xl p-10 text-center">
        <h1 className="text-4xl font-bold text-red-700 mb-3">Invalid City</h1>
        <p className="text-gray-700 text-lg mb-4">
          The city you entered does not exist or could not be found.
        </p>

        <a
          href="/"
          className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Go Back
        </a>
      </div>
    </main>
  );
}
