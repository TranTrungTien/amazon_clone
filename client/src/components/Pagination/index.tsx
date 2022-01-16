import ReactPaginate from "react-paginate";
import "./style_pagination.css";

const DATA_PER_PAGE = 24;

type PaginationProps = {
  totalDocument: number;
  onChangePage: (page_index: number) => void;
};

const Pagination = ({ totalDocument, onChangePage }: PaginationProps) => {
  console.log("pagination run ...");
  const totalPages = Math.ceil(totalDocument / DATA_PER_PAGE);
  const handlePageClick = (event: any) => {
    onChangePage(event.selected);
  };
  return (
    <ReactPaginate
      previousLabel={"← Previous"}
      nextLabel={"Next →"}
      pageCount={totalPages}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      previousLinkClassName={"pagination__link"}
      nextLinkClassName={"pagination__link"}
      disabledClassName={"pagination__link--disabled"}
      activeClassName={"pagination__link--active"}
      pageClassName="mx-px"
    />
  );
};

export default Pagination;
