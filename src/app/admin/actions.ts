"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { checkPassword, clearAdminCookie, isAdmin, setAdminCookie } from "@/lib/auth";
import { slugify } from "@/lib/format";

async function assertAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

/* -------------------------- Kirish / chiqish -------------------------- */

export async function loginAction(_prev: unknown, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    return { error: "Parol noto'g'ri" };
  }
  await setAdminCookie();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminCookie();
  redirect("/admin/login");
}

/* ----------------------------- Kategoriya ----------------------------- */

function readCategory(fd: FormData) {
  const nameUz = String(fd.get("nameUz") ?? "").trim();
  return {
    nameUz,
    nameRu: String(fd.get("nameRu") ?? "").trim() || nameUz,
    nameEn: String(fd.get("nameEn") ?? "").trim() || nameUz,
    icon: String(fd.get("icon") ?? "").trim() || null,
    image: String(fd.get("image") ?? "").trim() || null,
    sortOrder: Number(fd.get("sortOrder") ?? 0) || 0,
    isActive: fd.get("isActive") === "on",
  };
}

export async function saveCategoryAction(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const data = readCategory(formData);
  if (!data.nameUz) return;

  if (id) {
    await prisma.category.update({ where: { id }, data });
  } else {
    let slug = slugify(data.nameUz) || `cat-${Date.now()}`;
    if (await prisma.category.findUnique({ where: { slug } })) slug = `${slug}-${Date.now() % 10000}`;
    await prisma.category.create({ data: { ...data, slug } });
  }
  revalidatePath("/admin/categories");
  revalidatePath("/");
}

export async function deleteCategoryAction(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidatePath("/");
}

/* ------------------------------ Mahsulot ------------------------------ */

function readProduct(fd: FormData) {
  const nameUz = String(fd.get("nameUz") ?? "").trim();
  return {
    nameUz,
    nameRu: String(fd.get("nameRu") ?? "").trim() || nameUz,
    nameEn: String(fd.get("nameEn") ?? "").trim() || nameUz,
    descUz: String(fd.get("descUz") ?? "").trim() || null,
    descRu: String(fd.get("descRu") ?? "").trim() || null,
    descEn: String(fd.get("descEn") ?? "").trim() || null,
    sku: String(fd.get("sku") ?? "").trim() || null,
    brand: String(fd.get("brand") ?? "").trim() || null,
    price: Math.max(0, Number(fd.get("price") ?? 0) || 0),
    oldPrice: Number(fd.get("oldPrice") ?? 0) || null,
    unit: String(fd.get("unit") ?? "piece"),
    stock: Math.max(0, Number(fd.get("stock") ?? 0) || 0),
    image: String(fd.get("image") ?? "").trim() || null,
    categoryId: String(fd.get("categoryId") ?? ""),
    isActive: fd.get("isActive") === "on",
    isFeatured: fd.get("isFeatured") === "on",
    sortOrder: Number(fd.get("sortOrder") ?? 0) || 0,
  };
}

export async function saveProductAction(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const data = readProduct(formData);
  if (!data.nameUz || !data.categoryId) return;

  if (id) {
    await prisma.product.update({ where: { id }, data });
  } else {
    let slug = slugify(data.nameUz) || `p-${Date.now()}`;
    if (await prisma.product.findUnique({ where: { slug } })) slug = `${slug}-${Date.now() % 10000}`;
    await prisma.product.create({ data: { ...data, slug } });
  }
  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function deleteProductAction(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/");
}

export async function toggleProductActiveAction(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const p = await prisma.product.findUnique({ where: { id }, select: { isActive: true } });
  if (!p) return;
  await prisma.product.update({ where: { id }, data: { isActive: !p.isActive } });
  revalidatePath("/admin/products");
  revalidatePath("/");
}

/* ------------------------------ Buyurtma ------------------------------ */

export async function setOrderStatusAction(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const allowed = ["new", "confirmed", "delivering", "done", "cancelled"];
  if (!id || !allowed.includes(status)) return;
  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
}

export async function setPaymentStatusAction(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const paymentStatus = String(formData.get("paymentStatus") ?? "");
  if (!id || !["pending", "paid", "failed"].includes(paymentStatus)) return;
  await prisma.order.update({ where: { id }, data: { paymentStatus } });
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
}

/* ------------------------------ Sozlamalar ---------------------------- */

export async function saveSettingsAction(formData: FormData) {
  await assertAdmin();
  const keys = [
    "shopNameUz", "shopNameRu", "shopNameEn",
    "taglineUz", "taglineRu", "taglineEn",
    "phone", "addressUz", "addressRu", "addressEn",
    "workHours", "deliveryFee", "freeDeliveryFrom",
    "cardNumber", "cardHolder", "cardBank",
  ];
  for (const key of keys) {
    const raw = formData.get(key);
    if (raw === null) continue;
    const value = String(raw);
    await prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
  revalidatePath("/admin/settings");
  revalidatePath("/");
}
