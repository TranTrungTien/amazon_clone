import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ProductListing from "../../components/ProductListing";
import ProductSideBar from "../../components/ProductSideBar";
import Waiting from "../../components/Waiting";
import { IProduct } from "../../Interface/productInterface";

const SearchPage = () => {
  console.log("search page run");
  const [searchResult, setSearchResult] = useState<IProduct[] | null>(null);
  const location = useLocation();
  const [page, setPage] = useState<number>(0);
  const [totalDocument, setTotalDocument] = useState<number>(0);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getTotalDocument = async () => {
      const url = location.search.includes("All")
        ? `${process.env.REACT_APP_BASE_URL}/products/count-products-by-keyword${location.search}`
        : `${process.env.REACT_APP_BASE_URL}/products/count-products-by-category-and-keyword${location.search}`;
      const count = await axios.get<string>(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTotalDocument(parseInt(count.data));
    };
    getTotalDocument();
  }, [location]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = location.search.includes("All")
          ? `${process.env.REACT_APP_BASE_URL}/products/search-by-keyword${location.search}`
          : `${process.env.REACT_APP_BASE_URL}/products/search-by-keyword-and-category${location.search}`;
        const response = await axios.get<IProduct[]>(url, {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            page: page,
          },
        });
        const { data } = response;
        return data;
      } catch (error) {
        throw error;
      }
    };
    getProducts()
      .then((value) => {
        setSearchResult(value);
        window.scrollTo(0, 0);
      })
      .catch((error) => console.log({ error }));
  }, [location, page]);

  const onChangePage = (page_index: number) => {
    if (page_index === page) {
      return;
    } else {
      setPage(page_index);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen">
      {searchResult ? (
        <>
          <ProductSideBar />{" "}
          <ProductListing
            productList={searchResult}
            page={page}
            keyword={searchParams.get("q")}
            totalDocument={totalDocument}
            onChangePage={onChangePage}
          />{" "}
        </>
      ) : (
        <Waiting isPage={true} />
      )}
    </div>
  );
};

export default SearchPage;
