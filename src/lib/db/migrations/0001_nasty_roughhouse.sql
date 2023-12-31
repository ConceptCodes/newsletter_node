CREATE TABLE IF NOT EXISTS "newsletter_node_subscription" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"unsubscribed" boolean DEFAULT false,
	CONSTRAINT "newsletter_node_subscription_email_unique" UNIQUE("email")
);
