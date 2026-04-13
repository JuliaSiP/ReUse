import type { Item } from "@prisma/client";

export const dynamic = "force-dynamic";

type ItemDTO = Pick<Item, "id" | "title" | "description" | "category" | "condition">;

async function getItems(): Promise<ItemDTO[]> {
  const res = await fetch("/api/items", { cache: "no-store" });
  return res.json() as Promise<ItemDTO[]>;
}

export default async function ItemsPage() {
  const items = await getItems();
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <h2 className="text-2xl font-semibold text-green-800">Itens disponíveis</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item: ItemDTO) => (
          <div key={item.id} className="rounded-lg border border-green-600/20 bg-white p-4 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-green-900">{item.title}</h3>
              <p className="text-sm text-green-900/80">{item.description}</p>
              <p className="text-xs text-green-700/80">Categoria: {item.category}</p>
              <p className="text-xs text-green-700/80">Estado: {item.condition}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}