"use server";

import { z } from "zod";
import { db } from "@/lib/db/client";
import { products, teams, teamMembers } from "@/lib/db/schema";
import { getAuthSession } from "@/lib/auth/session";
import { eq, and, desc } from "drizzle-orm";

// Zod validation schema for create
const createProductSchema = z.object({
  name: z.string().min(1, "Name required"),
  description: z.string().max(512, "Description too long").optional(),
  price: z.coerce.number().min(0, "Price required"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

// Helper: get current user's teamId for multi-tenancy
async function getCurrentTeamId() {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Not authenticated");
  }
  const member = await db.query.teamMembers.findFirst({
    where: and(
      eq(teamMembers.userId, session.userId),
      eq(teamMembers.role, "owner")
    ),
    columns: ["teamId"],
  });
  if (!member) throw new Error("No primary team found");
  return member.teamId;
}

// Fetch all products for current team (latest first)
export async function getProducts() {
  const session = await getAuthSession();
  if (!session) throw new Error("Not authenticated");
  // Get user's team(s)
  const member = await db.query.teamMembers.findFirst({
    where: and(
      eq(teamMembers.userId, session.userId),
      eq(teamMembers.role, "owner")
    ),
    columns: ["teamId"],
  });
  if (!member) return [];
  return await db
    .select()
    .from(products)
    .where(eq(products.teamId, member.teamId))
    .orderBy(desc(products.createdAt));
}

// Add a new product for current team
export async function addProduct(formData: FormData) {
  const parsed = createProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description") || "",
    price: formData.get("price"),
    imageUrl: formData.get("imageUrl") || "",
  });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.errors[0]?.message || "Invalid fields" };
  }
  try {
    const teamId = await getCurrentTeamId();
    const [result] = await db
      .insert(products)
      .values({
        teamId,
        ...parsed.data,
      })
      .returning();
    return { status: "success", message: "Product added", product: result };
  } catch (err: any) {
    return { status: "error", message: err.message || "Error adding product" };
  }
}