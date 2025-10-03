import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants";

const CabinTable = () => {
  const { isLoading, cabins, error } = useCabin();
  //reading the URL data
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  if (error) throw new Error("Error fetching cabins");
  /*            Filteration                    */
  // set this value to all by default using shortcurting
  // "all" is default value
  // if we don't have any value in the URL, we will use "all"
  const filterValue = searchParams.get("discount") || "all";

  // let filteredCabin;
  // if (filterValue === "all") filteredCabin = cabins;
  // if (filterValue === "no-discount")
  //   filteredCabin = cabins.filter((cabin) => cabin.discount === 0);
  // if (filterValue === "with-discount")
  //   filteredCabin = cabins.filter((cabin) => cabin.discount > 0);

  // // filter logic
  const filteredCabins = cabins.filter((cabin) => {
    switch (filterValue) {
      case "all":
        return true; // Keep all cabins
      case "no-discount":
        return cabin.discount === 0;
      case "with-discount":
        return cabin.discount > 0;
      default:
        return true;
    }
  });
  // SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");

  // we need to also sort in negative descending way
  const modifier = direction === "asc" ? 1 : -1;

  // sorting in positive way ascending way
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  // PAGINATION - Get current page from URL
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // Calculate start and end indices for current page
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  // Get only the cabins for the current page
  const paginatedCabins = sortedCabins.slice(startIndex, endIndex);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Photo</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          {/* <div></div> */}
        </Table.Header>
        {/* Render props */}
        {/* render props: we can tell what to do with each componenets */}
        <Table.Body
          data={paginatedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
        <Table.Footer>
          <Pagination count={filteredCabins.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default CabinTable;
