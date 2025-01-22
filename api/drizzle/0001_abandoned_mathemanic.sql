CREATE TABLE "families" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "families_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "preferences" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "preferences_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"item_id" varchar(255) NOT NULL,
	"note" text,
	"rating" integer,
	"lastDate" date
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tags_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "canLogin" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "familyId" integer;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_familyId_families_id_fk" FOREIGN KEY ("familyId") REFERENCES "public"."families"("id") ON DELETE no action ON UPDATE no action;