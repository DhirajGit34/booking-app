//1. gettign crendential from supabase
import supabase from "./supabase";
// getting the email and password form the user
export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  console.log(data);
  return data;
};
