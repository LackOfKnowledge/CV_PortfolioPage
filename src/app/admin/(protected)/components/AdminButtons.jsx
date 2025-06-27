"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
    >
      Wyloguj
    </button>
  );
}

export function CVLinkButton() {
  const handleClick = () => {
    alert(
      "Funkcjonalność generowania linku do CV jest w trakcie implementacji."
    );
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
    >
      Generuj Link CV
    </button>
  );
}
