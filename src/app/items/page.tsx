import type { Item } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type ItemDTO = Pick<Item, "id" | "title" | "description" | "category" | "condition">;

async function getItems(): Promise<ItemDTO[]> {
  try {
    return await prisma.item.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, description: true, category: true, condition: true },
    });
  } catch {
    return [{ id: "mock-1", title: "Livro de ficção", description: "Ótimo estado, troco por outro livro", category: "Livros", condition: "good" }];
  }
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
