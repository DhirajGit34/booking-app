-- Add extrasPrice column to bookings table
ALTER TABLE bookings
ADD COLUMN "extrasPrice" NUMERIC(10,2) DEFAULT 0;

-- Update existing rows to have a default value
UPDATE bookings
SET "extrasPrice" = 0
WHERE "extrasPrice" IS NULL;
