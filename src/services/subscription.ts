import { InternalError } from "@/exceptions";
import { db } from "@/lib/db";
import { subscriptionTable } from "@/lib/db/schema";
import type { SubscribeSchema } from "@/schemas";

export default class AuthService {
  public async subscribe(data: SubscribeSchema): Promise<void> {
    try {
      const { email } = data;
      await db.insert(subscriptionTable).values({
        email,
      });
    } catch (err) {
      console.error(err);
      // @ts-ignore
      throw new InternalError(err?.message);
    }
  }

  public async unsubscribe(data: SubscribeSchema): Promise<void> {
    try {
      const { email } = data;
      console.log("email", email);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
