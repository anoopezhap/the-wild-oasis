import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabons cannot be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabins cannot be deleted");
  }
}

export async function createEditCabin(newCabin, id) {
  //https://iwkncnjryvjzdtpneotr.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //create cabin only if there is no ID

  // const { data, error } = await supabase
  //   .from("cabins")
  //   .insert([{ ...newCabin, image: imagePath }])
  //   .select();

  let query = supabase.from("cabins");

  //create cabin

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  //edit cabin

  if (id) {
    console.log(id);
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
    console.log(query);
  }

  const { data, error } = await query.select().single();

  console.log(data);

  if (error) {
    console.error(error);
    throw new Error("cabins cannot be created");
  }

  //upload image

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //delete cabin if there was an error in uploading the cabin image
  if (storageError) {
    const { error } = await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error("cabins cannot be added, because image was not uploaded");
  }

  return data;
}
