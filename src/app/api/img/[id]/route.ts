import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

/** Bazadagi rasmni qaytaradi. Rasm o'zgarmaydi, shuning uchun uzoq keshlanadi. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const asset = await prisma.asset.findUnique({
    where: { id },
    select: { data: true, mime: true },
  });

  if (!asset) return new Response("Topilmadi", { status: 404 });

  return new Response(new Uint8Array(asset.data), {
    headers: {
      "Content-Type": asset.mime,
      "Content-Length": String(asset.data.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
