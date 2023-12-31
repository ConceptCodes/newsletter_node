CREATE TABLE IF NOT EXISTS "newsletter_node_newsletter" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"up_votes" integer DEFAULT 0,
	"down_votes" integer DEFAULT 0,
	"target_date" timestamp NOT NULL
);
