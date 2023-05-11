import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full bg-gray-50">
      <div className="mx-auto h-full max-w-7xl p-4 md:p-10">{children}</div>
    </main>
  );
}
