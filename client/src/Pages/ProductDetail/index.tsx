import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Detail from "../../components/Detail";
import Features from "../../components/Features";
import Review from "../../components/Review";
import Waiting from "../../components/Waiting";
import { IProduct } from "../../Interface/productInterface";

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const product_id = searchParams.get("product_id");

  useEffect(() => {
    const getProduct = async () => {
      try {
        console.log(process.env.REACT_APP_BASE_URL);
        const response = await axios.get<IProduct>(
          `${process.env.REACT_APP_BASE_URL}/products`,
          {
            headers: {
              "Content-Types": "application/json",
            },
            params: {
              id: product_id,
            },
          }
        );
        if (response.data) {
          console.log("data : ", response.data);
          setProduct(response.data);
        }
      } catch (error) {
        console.log({ error });
      }
    };
    if (product_id) {
      getProduct();
    }
  }, [product_id]);
  return (
    <div className="min-h-screen">
      {product ? (
        <>
          <Detail product={product} />
          <Features productFeaturesImages={product["Product Image Url"]} />
          <Review product_id={product._id ?? ""} />
        </>
      ) : (
        <Waiting isPage={true} />
      )}
    </div>
  );
};

export default ProductDetail;
