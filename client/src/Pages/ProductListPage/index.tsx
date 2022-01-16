import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Waiting from "../../components/Waiting";
import { IProduct } from "../../Interface/productInterface";
import ProductListing from "../../components/ProductListing";
import ProductSideBar from "../../components/ProductSideBar";
import { IProductSideBarOpt } from "../../Interface/productSideBarInterface";

const ProductListPage = () => {
  console.log("ProductListPage render .... ");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("category_id");
  const [productList, setProductList] = useState<IProduct[] | null>(null);

  const [totalDocument, setTotalDocument] = useState<number>(0);
  const [productSideBarOpt, setProductSideBarOpt] =
    useState<IProductSideBarOpt>(); /// no real data so. just a take 5 product;
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    if (productList && page === 0) {
      const opt: IProductSideBarOpt = {
        category: "",
        categoryChildren: [
          "Category Child_1",
          "Category Child_2",
          "Category Child_3",
          "Category Child_4",
          "Category Child_5",
          "Category Child_6",
        ],
        brands: [],
      };
      opt.category = id ?? "";
      for (let i = 0; i < 5; ++i) {
        const brand = productList[i]["Product Brand"] ?? "";
        opt.brands?.push(brand);
      }
      console.log({ opt });
      setProductSideBarOpt(opt);
    }
  }, [productList, page, id]);

  useEffect(() => {
    const getTotalDocument = async () => {
      const count = await axios.get<string>(
        `${process.env.REACT_APP_BASE_URL}/products/count-products-by-category`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            category: id,
          },
        }
      );
      setTotalDocument(parseInt(count.data));
    };
    if (id) {
      getTotalDocument().catch((error) => console.log({ error }));
    }
  }, [id]);

  useEffect(() => {
    const getProductList = async (): Promise<void> => {
      if (id) {
        try {
          const response = await axios.get<IProduct[]>(
            `${
              process.env.REACT_APP_BASE_URL as string
            }/products/search-by-category`,
            {
              headers: {
                "Content-Types": "application/json",
              },
              params: {
                category: id,
                limit: 24,
                page: page,
              },
            }
          );
          console.log({ "data :": response.data });
          setProductList(response.data);
          window.scrollTo(0, 0);
        } catch (error) {
          console.log({ error });
        }
      }
    };
    getProductList();
  }, [id, page]);
  const onChangePage = (page_index: number) => {
    console.log({ page_index });
    if (page_index === page) {
      return;
    } else {
      setPage(page_index);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen">
      {productList ? (
        <>
          <ProductSideBar
            category={productSideBarOpt?.category}
            categoryChildren={productSideBarOpt?.categoryChildren}
            brands={productSideBarOpt?.brands}
          />{" "}
          <ProductListing
            productList={productList}
            totalDocument={totalDocument}
            keyword={id}
            page={page}
            onChangePage={onChangePage}
          />{" "}
        </>
      ) : (
        <Waiting isPage={true} />
      )}
    </div>
  );
};

export default ProductListPage;
