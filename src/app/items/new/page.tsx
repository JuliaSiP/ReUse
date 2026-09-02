"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewItemPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("good");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, category, condition, imageUrl }),
    });
    setLoading(false);
    if (response.ok) router.push("/items");
    else alert("Não foi possível publicar agora. Verifique a conexão com o banco de dados.");
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-10">
      <h2 className="text-2xl font-semibold text-green-800">Publicar item</h2>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <input
          className="rounded-md border border-green-600/20 p-2"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="rounded-md border border-green-600/20 p-2"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          className="rounded-md border border-green-600/20 p-2"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <select
          className="rounded-md border border-green-600/20 p-2"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="new">Novo</option>
          <option value="good">Bom</option>
          <option value="fair">Razoável</option>
          <option value="poor">Ruim</option>
        </select>
        <input
          className="rounded-md border border-green-600/20 p-2"
          placeholder="URL da imagem (opcional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-green-700 px-4 py-2 text-white disabled:opacity-60"
        >
          {loading ? "Publicando..." : "Publicar"}
        </button>
      </form>
    </section>
  );
}
