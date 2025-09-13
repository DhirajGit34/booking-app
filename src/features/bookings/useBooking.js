// accessing the cabin data

import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export const useBooking = () => {
  const { bookingId } = useParams();
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    // uniquely indentify the data
    queryKey: ["booking", bookingId],
    // actual query function : fetching the data 4m the api
    // its needs to return a promise
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  return { isLoading, booking, error };
};
