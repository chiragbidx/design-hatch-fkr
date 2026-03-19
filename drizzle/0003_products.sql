-- Migration for StorePilot products table
CREATE TABLE IF NOT EXISTS "products" (
  "id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "team_id" text NOT NULL REFERENCES "teams" ("id") ON DELETE CASCADE,
  "name" text NOT NULL,
  "description" text NOT NULL DEFAULT '',
  "price" numeric NOT NULL DEFAULT 0,
  "image_url" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);