import React from "react";

import { Navbar } from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="p-4">{children}</div>
    </div>
  );
}
