import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.item.findMany({
      orderBy: { createdAt: "desc" },
      include: { owner: { select: { id: true, name: true } } },
    });
    return NextResponse.json(items);
  } catch (e) {
    const fallback = [
      {
        id: "mock-1",
        title: "Livro de ficção",
        description: "Ótimo estado, troco por outro livro",
        category: "Livros",
        condition: "good",
      },
    ];
    return NextResponse.json(fallback, { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { title, description, condition, category, imageUrl } = data;
    const user = await prisma.user.upsert({
      where: { email: "guest@reuse.local" },
      update: {},
      create: { name: "Convidado", email: "guest@reuse.local" },
    });
    const item = await prisma.item.create({
      data: {
        title,
        description,
        condition,
        category,
        imageUrl,
        ownerId: user.id,
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "DB indisponível" }, { status: 503 });
  }
}