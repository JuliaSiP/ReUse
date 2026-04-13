import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        item: { select: { id: true, title: true } },
        offeredBy: { select: { id: true, name: true } },
      },
    });
    return NextResponse.json(offers);
  } catch (e) {
    const fallback = [
      {
        id: "mock-offer-1",
        item: { id: "mock-1", title: "Livro de ficção" },
        offeredBy: { id: "mock-user", name: "Convidado" },
        offeredTitle: "Troco por HQ",
        offeredDescription: "Posso trocar por HQ em bom estado",
        status: "pending",
      },
    ];
    return NextResponse.json(fallback, { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { itemId, offeredTitle, offeredDescription } = data;
    const user = await prisma.user.upsert({
      where: { email: "guest@reuse.local" },
      update: {},
      create: { name: "Convidado", email: "guest@reuse.local" },
    });
    const offer = await prisma.offer.create({
      data: {
        itemId,
        offeredById: user.id,
        offeredTitle,
        offeredDescription,
      },
    });
    return NextResponse.json(offer, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "DB indisponível" }, { status: 503 });
  }
}