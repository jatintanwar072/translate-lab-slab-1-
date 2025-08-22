import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const base = "px-3 py-1 rounded transition-all";
  const active = base + " bg-fuchsia-600";
  const idle = base + " hover:bg-fuchsia-600/30";

  return (
    <nav className="bg-white/10 backdrop-blur sticky top-0">
      <div className="max-w-5xl mx-auto flex justify-between items-center h-14 px-4">
        <h1 className="font-bold text-lg">Translate<span className="text-fuchsia-300">Lab</span></h1>
        <div className="flex gap-2 text-sm">
          <NavLink to="/" className={({isActive}) => isActive ? active : idle}>
            Translator
          </NavLink>
          <NavLink to="/string-lab" className={({isActive}) => isActive ? active : idle}>
            String Lab
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
