import axios from "axios";
import { error } from "console";
import { useEffect, useState } from "react";
import { IReview } from "../../Interface/reiviewInterface";
import Comment from "./Comment";
import ProductReviewInput from "./ProductReviewInput";
type ReviewProps = {
  product_id: string;
};
const Review = ({ product_id }: ReviewProps) => {
  const [permissionToReview, setpermissionToReview] = useState<boolean>(false);
  const [reviews, setReviews] = useState<{
    list: IReview[] | [];
    error: null | unknown;
  }>({ list: [], error: null });

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/orders/check-permission-to-review`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              product_id: product_id,
            },
            withCredentials: true,
          }
        );
        if (response.data) {
          setpermissionToReview(true);
        }
      } catch (error) {
        console.log({ error });
      }
    };
    if (product_id) {
      checkPermission();
    }
  }, [product_id]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get<IReview[]>(
          `${process.env.REACT_APP_BASE_URL}/reviews/get-reviews`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              product_id: product_id,
            },
            withCredentials: true,
          }
        );
        if (response.data.length > 0) {
          setReviews({ list: response.data, error: null });
        }
      } catch (error) {
        console.log({ error });
        setReviews({ list: [], error: error });
      }
    };
    if (product_id) {
      getReviews();
    }
  }, [product_id]);

  return (
    <div className="w-11/12 mx-auto py-10">
      <div>
        <h2 className="text-lg font-medium">Customer Reviews</h2>
      </div>
      <div className="flex justify-start items-start">
        <div className="flex-1 space-y-5 px-8">
          <div className="flex justify-start items-center space-x-2">
            <div className="flex justify-center items-center space-x-px">
              <i className="fas fa-star text-yellow-600"></i>
              <i className="fas fa-star text-yellow-600"></i>
              <i className="fas fa-star text-yellow-600"></i>
              <i className="fas fa-star text-yellow-600"></i>
              <i className="far fa-star text-yellow-600"></i>
            </div>
            <span className="text-lg font-semibold">4.0 of 5</span>
          </div>
          <span className="text-gray-700 text-sm">1669 global ratings</span>
          <div className="space-y-6">
            <div className="flex justify-center items-center space-x-3 text-sm text-blue-500 ">
              <span>5 star</span>
              <div className=" relative flex-1 h-8 border border-gray-300">
                <div
                  style={{ width: "75%" }}
                  className="absolute top-0 left-0 h-full bg-yellow-600 rounded"
                ></div>
              </div>
              <span>75%</span>
            </div>
            <div className="flex justify-center items-center space-x-3 text-sm text-blue-500">
              <span>4 star</span>
              <div className=" relative flex-1 h-8 border border-gray-300">
                <div
                  style={{ width: "10%" }}
                  className="absolute top-0 left-0 h-full bg-yellow-600 rounded"
                ></div>
              </div>
              <span>10%</span>
            </div>
            <div className="flex justify-center items-center space-x-3 text-sm text-blue-500">
              <span>3 star</span>
              <div className=" relative flex-1 h-8 border border-gray-300">
                <div
                  style={{ width: "10%" }}
                  className="absolute top-0 left-0 h-full bg-yellow-600 rounded"
                ></div>
              </div>
              <span>10%</span>
            </div>
            <div className="flex justify-center items-center space-x-3 text-sm text-blue-500">
              <span>2 star</span>
              <div className=" relative flex-1 h-8 border border-gray-300">
                <div
                  style={{ width: "5%" }}
                  className="absolute top-0 left-0 h-full bg-yellow-600 rounded"
                ></div>
              </div>
              <span>5%</span>
            </div>
            <div className="flex justify-center items-center space-x-3 text-sm text-blue-500">
              <span>1 star</span>
              <div className=" relative flex-1 h-8 border border-gray-300">
                <div
                  style={{ width: "5%" }}
                  className="absolute top-0 left-0 h-full bg-yellow-600 rounded"
                ></div>
              </div>
              <span>5%</span>
            </div>
          </div>
        </div>
        <div style={{ flex: 2 }} className="px-5 space-y-10">
          {permissionToReview && <ProductReviewInput product_id={product_id} />}
          {reviews.list.length > 0 &&
            reviews.list.map((review, index) => {
              return <Comment key={index} review={review} />;
            })}
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default Review;
