"use client";
import React from "react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

export function Input() {
  const [input, setInput] = useState("");
  const router = useRouter();
  function handleSearch(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (input === "") return;

    router.push(`/game/search/${input}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="w-full flex justify-between bg-slate-200 my-5 rounded-lg p-2"
    >
      <input
        type="text"
        placeholder="Procurando algum jogo?..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="outline-none w-11/12"
      />
      <button type="submit" className="cursor-pointer">
        <FiSearch size={20} color="FF0000" />
      </button>
    </form>
  );
}
