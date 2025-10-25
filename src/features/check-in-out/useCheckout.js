import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingout } = useMutation({
    mutationFn: bookingId =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: data => {
      toast.success(`Guest ${data.id} successfully checked out`);
      // other way to invalidate queries "active:true"
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: () => toast.error("Error checking out booking"),
  });
  return { checkout, isCheckingout };
};
