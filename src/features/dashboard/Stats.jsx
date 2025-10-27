import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBriefcase,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  // 1. number of booking
  const numBookings = bookings.length;
  // 2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  // total checkins
  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);
  // num of checkedin nights /
  // num all available night (numdays * num cabins)

  return (
    <>
      <Stat
        value={numBookings}
        color="blue"
        title="Bookings"
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        value={formatCurrency(sales)}
        color="green"
        title="Sales"
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        value={checkins}
        color="indigo"
        title="Checked ins"
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        value={Math.round(occupation * 100) + "%"}
        icon={<HiOutlineChartBar />}
        color="yellow"
        title="Occupancy rate"
      />
    </>
  );
};

export default Stats;
