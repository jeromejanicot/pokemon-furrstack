import { Context } from "../../context";
import { AnyPageTable } from "drizzle-orm";
import { eq } from "drizzle-orm";

// todo: generic type that match the type of the table schema and its insert schema
export const saveToDatabase = async (
  ctx: Context,
  schema: AnyPageTable<{}>,
  data: { [x: string]: any },
) => {
  await ctx.db.insert(schema).values(data).returning();
};

export const findInDatabase = async (
  ctx: Context,
  schema: AnyPageTable<{}>,
  property: keyof typeof schema,
  input: string,
) => await ctx.db.select().from(schema).where(eq(schema[property], input));
