import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    const setting = await prisma.setting.findUnique({
      where: { key },
    });
    
    if (!setting) {
      return NextResponse.json({ error: "Configuração não encontrada" }, { status: 404 });
    }
    
    return NextResponse.json(setting);
  } catch (e) {
    return NextResponse.json({ error: "Erro ao buscar configuração" }, { status: 500 });
  }
}
