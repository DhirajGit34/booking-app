import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabin } from "../cabins/useCabins";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isLoading } = useRecentBookings();
  const { stays, isRecentLoading, confirmedStays, numDays } = useRecentStays();

  const { cabins, isLoading: isCabinsLoading } = useCabin();

  if (isLoading || isRecentLoading || isCabinsLoading) return <Spinner />;
  // console.log(confirmedStays);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>inputs</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
