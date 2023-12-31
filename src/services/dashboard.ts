import { and, asc, eq, gte, sql } from "drizzle-orm";

import { InternalError } from "@/exceptions";
import { db } from "@lib/db";
import { Newsletter, newsletterTable, subscriptionTable } from "@lib/db/schema";

export default class DashboardService {
  public async totalUsers(): Promise<Number> {
    try {
      const result = await db
        .select({
          value: sql`count('*')`.mapWith(Number),
        })
        .from(subscriptionTable);
      return result[0].value;
    } catch (err) {
      console.error(err);
      throw new InternalError();
    }
  }

  public async newUsers(): Promise<Number> {
    try {
      const result = await db
        .select({
          value: sql`count('*')`.mapWith(Number),
        })
        .from(subscriptionTable)
        .where(
          and(
            eq(subscriptionTable.unsubscribed, false)
            // sql`${subscriptionTable.createdAt} >= now() - interval '1 week'`
          )
        );
      return result[0].value;
    } catch (err) {
      console.error(err);
      throw new InternalError();
    }
  }

  public async totalEmailsSent(): Promise<Number> {
    try {
      //   const result = await db
      //     .select({ value: count() })
      //     .from(newsletterTable)
      //     .where({
      //       targetDate: { $lte: "now()" },
      //     });

      // i will need to tally the emails sent for each campaign
      // will need to link users to campaigns
      return Promise.resolve(0);
    } catch (err) {
      console.error(err);
      throw new InternalError();
    }
  }

  public async pastCampaigns(): Promise<Newsletter[]> {
    try {
      // add pagination later
      const result = await db.select().from(newsletterTable);
      return result;
    } catch (err) {
      console.error(err);
      throw new InternalError();
    }
  }

  public async upcomingCampaign(): Promise<Date> {
    try {
      const result = await db
        .select()
        .from(newsletterTable)
        .where(gte(newsletterTable.targetDate, sql`now()`))
        .orderBy(asc(newsletterTable.targetDate))
        .limit(1);
      return result[0].targetDate;
    } catch (err) {
      console.error(err);
      throw new InternalError();
    }
  }
}
