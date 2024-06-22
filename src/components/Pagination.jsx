import Pagination from 'react-bootstrap/Pagination';
import './PaginationComponent.css'; // Import custom CSS for pagination styles

function PaginationComponent({ request, setRequest }) {
    const pages = 10;
    let active = request.page;
    const isMoreThan2 = active > 2;

    const clickHandler = (currentPage) => {
        setRequest({ ...request, page: currentPage }); 
    };

    return (
        <Pagination className="custom-pagination">
            <Pagination.First className="" disabled={active === 1} onClick={() => clickHandler(1)} />
            <Pagination.Prev disabled={active === 1} onClick={() => clickHandler(active - 1)} />

            {isMoreThan2 &&
                <>
                    <Pagination.Item onClick={() => clickHandler(1)}>{1}</Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Item onClick={() => clickHandler(active - 1)}>{active - 1}</Pagination.Item>
                </>
            }
            <Pagination.Item  active>{active}</Pagination.Item>

            {active < pages &&
                <>
                    <Pagination.Item onClick={() => clickHandler(active + 1)}>{active + 1}</Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Item onClick={() => clickHandler(pages)}>{pages}</Pagination.Item>
                </>
            }

            <Pagination.Next disabled={active === pages} onClick={() => clickHandler(active + 1)} />
            <Pagination.Last disabled={active === pages} onClick={() => clickHandler(pages)} />
        </Pagination>
    );
}

export default PaginationComponent;
