import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Error fetching cabins data");
  }
  return data;
};

export const createEditCabin = async (cabinData, id) => {
  // if the image path already exists, we don't need to upload it again
  const hasImagePath = cabinData.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${cabinData.image.name}`.replace("/", "");
  const imagePath = hasImagePath
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //reusing parts of the query
  //1. create the cabin/edit
  let query = supabase.from("cabins");
  // a) CREATE
  if (!id) query = query.insert([{ ...cabinData, image: imagePath }]); //
  // b) EDIT
  if (id) query = query.update({ ...cabinData, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Error creating cabin");
  }

  //2. upload the image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabinData.image); //1st : imageName //2nd : actual image
  // 3. Delete the cabin if there is an error in uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Error uploading cabin image");
  }

  return data;
};

// deleting the cabin
export const deleteCabin = async id => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Error deleting cabin");
  }
};
