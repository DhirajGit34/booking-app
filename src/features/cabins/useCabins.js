// accessing the cabin data

import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export const useCabin = () => {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    // uniquely indentify the data
    queryKey: ["cabins"],
    // actual query function : fetching the data 4m the api
    // its needs to return a promise
    queryFn: getCabins,
  });
  return { isLoading, cabins, error };
};
