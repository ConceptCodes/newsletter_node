import { BadRequestError, InternalError } from "@/exceptions";
import { db } from "@lib/db";
import { messageTable } from "@lib/db/schema";
import type { ContactUsSchema } from "@/schemas";
import { isToxic } from "@/lib/ai";

export default class ContactService {
  public async sendMessage(data: ContactUsSchema): Promise<void> {
    try {
      const { fullName, email, message } = data;

      const badContent = await isToxic(message)

      if (badContent) {
        throw new BadRequestError(
          "Please provide a message that is more constructive"
        );
      }

      await db.insert(messageTable).values({
        fullName,
        email,
        message,
      });
    } catch (err) {
      console.error(err);
      throw new InternalError();
    }
  }
}
