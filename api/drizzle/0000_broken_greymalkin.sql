CREATE TYPE "public"."rating" AS ENUM('1', '2', '3', '4', '5');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('parent', 'child');--> statement-breakpoint
CREATE TABLE "families" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "families_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "items" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "items_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" text,
	"createdBy" integer NOT NULL,
	"familyId" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'parent' NOT NULL,
	"familyId" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tags_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL,
	"familyId" integer,
	"createdBy" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "items_tags" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "items_tags_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"itemId" integer NOT NULL,
	"tagId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "preferences" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "preferences_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"rating" "rating" DEFAULT '1',
	"note" text,
	"lastTried" date,
	"itemId" integer NOT NULL,
	"userId" integer NOT NULL,
	"familyId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_familyId_families_id_fk" FOREIGN KEY ("familyId") REFERENCES "public"."families"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_familyId_families_id_fk" FOREIGN KEY ("familyId") REFERENCES "public"."families"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "tags_familyId_families_id_fk" FOREIGN KEY ("familyId") REFERENCES "public"."families"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "tags_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items_tags" ADD CONSTRAINT "items_tags_itemId_items_id_fk" FOREIGN KEY ("itemId") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items_tags" ADD CONSTRAINT "items_tags_tagId_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preferences" ADD CONSTRAINT "preferences_itemId_items_id_fk" FOREIGN KEY ("itemId") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preferences" ADD CONSTRAINT "preferences_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preferences" ADD CONSTRAINT "preferences_familyId_families_id_fk" FOREIGN KEY ("familyId") REFERENCES "public"."families"("id") ON DELETE no action ON UPDATE no action;