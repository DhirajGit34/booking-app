import supabase from "../services/supabase";

export async function updateBookingsSchema() {
  const { error } = await supabase.rpc("exec_sql", {
    sql_query: `
      -- Add extrasPrice column if it doesn't exist
      DO $$ 
      BEGIN 
        IF NOT EXISTS (
          SELECT 1 
          FROM information_schema.columns 
          WHERE table_name = 'bookings' 
          AND column_name = 'extrasPrice'
        ) THEN 
          ALTER TABLE bookings 
          ADD COLUMN "extrasPrice" NUMERIC(10,2) DEFAULT 0;
          
          -- Update existing rows to have a default value
          UPDATE bookings 
          SET "extrasPrice" = 0 
          WHERE "extrasPrice" IS NULL;
        END IF;
      END $$;
    `,
  });

  if (error) {
    console.error("Error updating schema:", error);
    throw new Error("Failed to update bookings schema");
  }

  // Refresh the schema cache
  await supabase.auth.refreshSession();
  console.log("Schema update completed successfully");
}
