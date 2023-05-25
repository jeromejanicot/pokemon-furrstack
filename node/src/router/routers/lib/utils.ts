import { Context } from "../../context";
import { TableConfig, PgTableWithColumns } from "drizzle-orm/pg-core";
import { InferModel, eq } from "drizzle-orm";

// todo: generic type that match the type of the table schema and its insert schema
export const saveToDatabase = async <T extends TableConfig>(
  ctx: Context,
  schema: PgTableWithColumns<T>,
  data: InferModel<typeof schema, "insert">,
) => {
  await ctx.db.insert(schema).values(data).returning();
};

// eq matching an object of several fields?
export const findInDatabase = async <
  T extends TableConfig,
  U extends keyof T["columns"],
>(
  ctx: Context,
  schema: PgTableWithColumns<T>,
  property: U,
  input: string,
) => await ctx.db.select().from(schema).where(eq(schema[property], input));
