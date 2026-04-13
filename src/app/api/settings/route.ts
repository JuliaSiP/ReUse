import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    return NextResponse.json(settings);
  } catch (e) {
    // Fallback caso o banco esteja inacessível
    return NextResponse.json([
      { key: "maintenance_mode", value: "false", type: "boolean" },
      { key: "exchanges_enabled", value: "true", type: "boolean" },
      { key: "announcement_text", value: "Bem-vindo ao ReUse!", type: "string" }
    ]);
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { key, value, type } = data;

    const setting = await prisma.setting.upsert({
      where: { key },
      update: { value, type },
      create: { key, value, type },
    });

    return NextResponse.json(setting);
  } catch (e) {
    return NextResponse.json({ error: "Erro ao salvar configuração" }, { status: 500 });
  }
}
