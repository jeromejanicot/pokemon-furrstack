import { Context } from "../../context";
import { AnyPgTable } from "drizzle-orm/pg-core";
import { InferModel, eq } from "drizzle-orm";

// todo: generic type that match the type of the table schema and its insert schema
export const saveToDatabase = async <T extends AnyPgTable<object>>(
  ctx: Context,
  schema: T,
  data: InferModel<T, "insert">,
) => {
  await ctx.db.insert(schema).values(data).returning();
};

export const findInDatabase = async <T extends AnyPgTable<object>>(
  ctx: Context,
  schema: T,
  property: keyof object,
  input: string,
) => await ctx.db.select().from(schema).where(eq(schema[property], input));
