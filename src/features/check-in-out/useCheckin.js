import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: data => {
      toast.success(`Guest ${data.id} successfully checked in`);
      // other way to invalidate queries "active:true"
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/");
    },
    onError: () => toast.error("Error checking in booking"),
  });
  return { checkin, isCheckingIn };
};
