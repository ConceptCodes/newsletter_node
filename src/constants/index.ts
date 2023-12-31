import { User } from "@/lib/db/schema";

export * from "./interface";
export * from "./enums";

export type UserPayload = Pick<User, "id" | "role" | "fullName">;

export type Optional<T> = T | undefined;

export { default as config } from "./config.json";
