import { NextResponse } from "next/server";
import sharp from "sharp";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_UPLOAD = 12 * 1024 * 1024; // 12 MB — telefon fotosi bemalol sig'adi
const MAX_SIDE = 1000; // saqlashdan oldin shu o'lchamgacha kichraytiramiz

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/heic", "image/heif"];

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 401 });
  }

  let file: File | null = null;
  try {
    const form = await req.formData();
    const f = form.get("file");
    if (f instanceof File) file = f;
  } catch {
    return NextResponse.json({ error: "Fayl o'qilmadi" }, { status: 400 });
  }

  if (!file) return NextResponse.json({ error: "Fayl tanlanmagan" }, { status: 400 });
  if (file.size > MAX_UPLOAD) {
    return NextResponse.json({ error: "Fayl juda katta (12 MB gacha)" }, { status: 400 });
  }
  if (file.type && !ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Faqat rasm fayllari (JPG, PNG, WEBP, HEIC)" }, { status: 400 });
  }

  try {
    const input = Buffer.from(await file.arrayBuffer());

    // Kichraytiramiz, EXIF burilishini to'g'rilaymiz, webp ga o'giramiz
    const pipeline = sharp(input, { failOn: "none" })
      .rotate()
      .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 });

    const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });

    const asset = await prisma.asset.create({
      data: {
        mime: "image/webp",
        width: info.width,
        height: info.height,
        size: data.byteLength,
        data,
      },
      select: { id: true, width: true, height: true, size: true },
    });

    return NextResponse.json({
      url: `/api/img/${asset.id}`,
      width: asset.width,
      height: asset.height,
      size: asset.size,
    });
  } catch (e) {
    console.error("[upload]", e);
    return NextResponse.json({ error: "Rasmni qayta ishlab bo'lmadi" }, { status: 500 });
  }
}
