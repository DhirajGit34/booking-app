//1. gettign crendential from supabase
import supabase from "./supabase";
// getting the email and password form the user
export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
};

// function for continue login day after
export const getCurrentUser = async () => {
  // checking there is an active session
  // getSession get the data from the local storage
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  // fetch the current user from the supabase
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
};
// for logout user
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};
