import React, { useState } from "react";

const LANGS = [
  { code: "hi", name: "Hindi" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese (Simplified)" },
  { code: "ja", name: "Japanese" },
  { code: "ru", name: "Russian" },
  { code: "ar", name: "Arabic" },
  { code: "pt", name: "Portuguese" },
];

export default function Translate() {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("hi");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    const key = import.meta.env.VITE_RAPID_API_KEY;
    if (!key) {
      setError("❌ Missing VITE_RAPID_API_KEY in .env file");
      return;
    }
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("https://google-translator9.p.rapidapi.com/v2", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": key,
          "X-RapidAPI-Host": "google-translator9.p.rapidapi.com",
        },
        body: JSON.stringify({
          q: text,
          source: "en",
          target: lang,
        }),
      });

      if (!res.ok) throw new Error("API error " + res.status);

      const data = await res.json();
      const translated = data?.data?.translations?.[0]?.translatedText || "❓";
      setResult(translated);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-6 grid sm:grid-cols-2 gap-6">
      {/* Input Section */}
      <div className="bg-white/10 p-4 rounded-xl">
        <h2 className="font-semibold mb-2">English ➜ Target</h2>
        <textarea
          className="w-full h-40 p-3 rounded bg-white/5 outline-none"
          placeholder="Type English text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex items-center gap-2 mt-3">
          <select
            className="text-black rounded px-2 py-1"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleTranslate}
            disabled={loading}
            className="px-4 py-2 bg-fuchsia-600 rounded hover:bg-fuchsia-700 disabled:opacity-60"
          >
            {loading ? "Translating..." : "Translate"}
          </button>
          {error && <span className="text-red-300 text-sm">{error}</span>}
        </div>
      </div>

      {/* Result Section */}
      <div className="bg-white/10 p-4 rounded-xl">
        <h2 className="font-semibold mb-2">Result</h2>
        <div className="min-h-[160px] p-3 bg-white/5 rounded">
          {result ? (
            <p className="whitespace-pre-wrap">{result}</p>
          ) : (
            <p className="text-white/70 text-sm">
              Your translation will appear here…
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
