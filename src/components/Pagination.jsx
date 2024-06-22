import Pagination from "react-bootstrap/Pagination";
import "./PaginationComponent.css"; // Import custom CSS for pagination styles

function PaginationComponent({ request, setRequest }) {
  const pages = 10; // Total number of pages (example value)
  let active = request.page; // Current active page from props
  const isMoreThan2 = active > 2; // Check if active page is greater than 2 for ellipsis display

  // Function to handle pagination item click
  const clickHandler = (currentPage) => {
    setRequest({ ...request, page: currentPage }); // Update page in request state
  };

  return (
    <Pagination className="custom-pagination">
      <Pagination.First
        disabled={active === 1}
        onClick={() => clickHandler(1)}
      />{" "}
      {/* First page button */}
      <Pagination.Prev
        disabled={active === 1}
        onClick={() => clickHandler(active - 1)}
      />{" "}
      {/* Previous page button */}
      {/* Display pagination items and ellipsis if active page is more than 2 */}
      {isMoreThan2 && (
        <>
          <Pagination.Item onClick={() => clickHandler(1)}>{1}</Pagination.Item>{" "}
          {/* First page item */}
          <Pagination.Ellipsis /> {/* Ellipsis for indicating more pages */}
          <Pagination.Item onClick={() => clickHandler(active - 1)}>
            {active - 1}
          </Pagination.Item>{" "}
          {/* Previous page item */}
        </>
      )}
      <Pagination.Item active>{active}</Pagination.Item>{" "}
      {/* Active page item */}
      {/* Display next pages and ellipsis if active page is less than total pages */}
      {active < pages && (
        <>
          <Pagination.Item onClick={() => clickHandler(active + 1)}>
            {active + 1}
          </Pagination.Item>{" "}
          {/* Next page item */}
          <Pagination.Ellipsis /> {/* Ellipsis for indicating more pages */}
          <Pagination.Item onClick={() => clickHandler(pages)}>
            {pages}
          </Pagination.Item>{" "}
          {/* Last page item */}
        </>
      )}
      <Pagination.Next
        disabled={active === pages}
        onClick={() => clickHandler(active + 1)}
      />{" "}
      {/* Next page button */}
      <Pagination.Last
        disabled={active === pages}
        onClick={() => clickHandler(pages)}
      />{" "}
      {/* Last page button */}
    </Pagination>
  );
}

export default PaginationComponent;
