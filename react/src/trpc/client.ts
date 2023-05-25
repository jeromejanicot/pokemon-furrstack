import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../node/src/router/index";

export const trpc = createTRPCReact<AppRouter>();
