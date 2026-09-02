import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import WatsonChatbot from "@/components/WatsonChatbot";

export const metadata: Metadata = {
  title: "ReUse",
  description: "Plataforma de troca e reaproveitamento de objetos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <header className="bg-green-700 text-white">
          <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold">ReUse</Link>
            <nav className="flex gap-4">
              <Link href="/items" className="hover:underline">Itens</Link>
              <Link href="/items/new" className="hover:underline">Publicar</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <WatsonChatbot />
        <footer className="bg-green-50 text-green-900">
          <div className="mx-auto max-w-5xl px-6 py-6 text-sm">
            ReUse • Conexões sustentáveis
          </div>
        </footer>
      </body>
    </html>
  );
}
