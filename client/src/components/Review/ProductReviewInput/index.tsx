import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import Rating from "../Rating";

type ProductReviewInputProps = {
  product_id: string;
};

const ProductReviewInput = ({ product_id }: ProductReviewInputProps) => {
  const user = useAppSelector((state) => state.user);

  const [star, setStar] = useState<number>(-1);
  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      content: { value: string };
    };
    const content = target.content.value;
    const data = {
      product_id: product_id,
      user_id: user?._id,
      rating: star,
      comment: content,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/reviews/create`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("response : ", response.data);
    } catch (error) {
      console.log({ error });
    }
  };
  const onSetStar = (star: number) => {
    setStar(star);
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-start items-center space-x-3">
        <div className="w-10 h-10">
          <img
            src="https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
            alt="user profile"
            className="w-full h-full object-cover rounded-full object-center"
          />
        </div>
        <div>
          <span className="font-medium text-gray-800">You</span>
        </div>
      </div>
      <Rating star={star} handleStar={onSetStar} />
      <div>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              name="content"
              id="content"
              placeholder="Enter your comment"
              className="w-full px-3 py-3 leading-7 rounded focus:outline-none border border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="font-semibold text-lg rounded px-6 py-2 bg-green-600"
          >
            POST
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductReviewInput;
