// signup
export const signup = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        // we can pass here any kind of information about the user
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
};

//1. gettign crendential from supabase
import supabase, { supabaseUrl } from "./supabase";
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

// update user
export const updateCurrentUser = async ({ password, fullName, avatar }) => {
  // 1. update password or name
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload a avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(error.message);

  // 3. update avatar in the user
  const { data: updateUser, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (avatarError) throw new Error(error.message);
  return updateUser;
};
