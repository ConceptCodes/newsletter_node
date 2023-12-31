CREATE TABLE IF NOT EXISTS "newsletter_node_message" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"full_name" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"replied" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "newsletter_node_session" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"token" varchar(256),
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "newsletter_node_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"role" text DEFAULT 'USER' NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"refresh_token" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "newsletter_node_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "newsletter_node_session" ADD CONSTRAINT "newsletter_node_session_user_id_newsletter_node_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "newsletter_node_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
