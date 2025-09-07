// accessing the cabin data

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export const useBooking = () => {
  const queryClient = useQueryClient();
  // API-side filtering
  // reading filtered value from the URL
  const [searchParams] = useSearchParams();
  // FILTERING
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORTHING
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data, error } = useQuery({
    // uniquely indentify the data
    // now whenever the filter changes, the query will be re-fetched
    // is like a dependency array of useQuery
    queryKey: ["bookings", filter, sortBy, page],
    // actual query function : fetching the data 4m the api
    // its needs to return a promise
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const bookings = data?.data ?? [];
  const count = data?.count ?? 0;

  //PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  // for next page
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  // for prev page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, error, count };
};
