import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    // Simple rule: If your function expects an object, pass the object directly. If it expects separate arguments, destructure first.
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User account successfully updated");
      // update data manually in the cache
      // queryClient.setQueryData(["user"],user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: err => {
      toast.error(err.message);
    },
  });
  return { updateUser, isUpdating };
};
