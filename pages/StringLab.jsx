import React from "react";
import { useState, useCallback, useEffect } from "react";

export default function StringLab() {
  const [length, setLength] = useState(16);
  const [value, setValue] = useState("");

  const generate = useCallback(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let out = "";
    const cryptoOk = window.crypto && window.crypto.getRandomValues;
    if (cryptoOk) {
      const arr = new Uint32Array(length);
      window.crypto.getRandomValues(arr);
      for (let i = 0; i < length; i++) out += chars[arr[i] % chars.length];
    } else {
      for (let i = 0; i < length; i++) out += chars[Math.floor(Math.random() * chars.length)];
    }
    setValue(out);
  }, [length]);

  useEffect(() => {
    generate();
  }, [length, generate]);

  return (
    <section className="mt-6 grid gap-6">
      <div className="bg-white/10 p-4 rounded-xl">
        <h2 className="font-semibold mb-3">Random String Generator</h2>
        <label className="flex items-center gap-3">
          <span>Length</span>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-56"
          />
          <span className="px-2 py-1 bg-white/10 rounded">{length}</span>
        </label>
        <div className="mt-3 flex gap-2">
          <button onClick={generate} className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700">
            Generate
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(value)}
            className="px-4 py-2 bg-white/10 rounded border border-white/20 hover:bg-white/20"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="bg-white/10 p-4 rounded-xl">
        <h2 className="font-semibold mb-2">Output</h2>
        <code className="font-mono break-all">{value}</code>
      </div>
    </section>
  );
}
