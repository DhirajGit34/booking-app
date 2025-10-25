import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Error fetching cabins data");
  }
  return data;
};

export const createCabin = async ({ data, image }) => {
  try {
    // Create unique name for image
    const imageName = `${Math.random()}-${image.name}`.replace("/", "");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Upload the image first
    const { error: uploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, image);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      throw new Error("Error uploading cabin image");
    }

    // 2. Create the cabin with the image URL
    const { data: cabin, error: insertError } = await supabase
      .from("cabins")
      .insert([{ ...data, image: imagePath }])
      .select();

    if (insertError) {
      // If cabin creation fails, cleanup by deleting the uploaded image
      // await supabase.storage.from("cabin-images").remove([imageName]);
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error("Error creating cabin:", insertError);
      throw new Error("Error creating cabin");
    }
    return cabin;
  } catch (err) {
    console.error("Creation error:", err);
    throw new Error(err.message);
  }
};

// deleting the cabin
export const deleteCabin = async id => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Error deleting cabin");
  }
};
