import Link from "next/link";
import { isFeatureEnabled, getSetting } from "@/lib/settings";

export default async function Home() {
  const exchangesEnabled = await isFeatureEnabled("exchanges_enabled", true);
  const announcement = await getSetting("announcement_text");

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      {announcement && announcement !== "none" && (
        <div className="mb-8 rounded-lg bg-green-100 p-4 text-green-800 border border-green-200">
          {announcement}
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-green-800">Conecte, Troque, ReUse</h1>
          <p className="text-lg text-green-900/80">
            Plataforma para conectar pessoas que desejam trocar objetos pessoais,
            promovendo colaboração e reaproveitamento.
          </p>
          <div className="flex gap-3">
            <Link href="/items" className="rounded-md bg-green-700 px-4 py-2 text-white">Ver itens</Link>
            {exchangesEnabled && (
              <Link href="/items/new" className="rounded-md bg-green-50 px-4 py-2 text-green-800 ring-1 ring-green-600/20">Publicar item</Link>
            )}
          </div>
          {!exchangesEnabled && (
            <p className="text-sm text-red-600 font-medium">
              O sistema de publicações está temporariamente desativado para manutenção.
            </p>
          )}
        </div>
        <div className="rounded-xl bg-green-50 p-8">
          <ul className="grid gap-3 text-green-900/80">
            <li className="flex items-center gap-2">Economia circular</li>
            <li className="flex items-center gap-2">Comunidade colaborativa</li>
            <li className="flex items-center gap-2">Menos desperdício</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
