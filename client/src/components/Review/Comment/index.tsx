import { IReview } from "../../../Interface/reiviewInterface";

type CommentProps = {
  review?: IReview;
};

const Comment = ({ review }: CommentProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-start items-center space-x-2">
        <div className="w-10 h-10">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
            alt="Profile User"
            className="w-full h-full object-cover object-center rounded-full"
          />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">
            {review ? review.user.username : "Full Name"}
          </h4>
        </div>
      </div>
      <div className="">
        <div className="flex justify-start items-center space-x-2">
          <div className="flex justify-start items-center space-x-px">
            <i className="fas fa-star text-yellow-600"></i>
            <i className="fas fa-star text-yellow-600"></i>
            <i className="fas fa-star text-yellow-600"></i>
            <i className="fas fa-star text-yellow-600"></i>
            <i className="far fa-star text-yellow-600"></i>
          </div>
          <h4 className="font-semibold">Title</h4>
        </div>
        <div>
          <span className="font-light text-sm text-gray-600">
            Reviewed in the United States on January 21, 2020
          </span>
        </div>
        <div className="pr-20">
          <p className="text-gray-800">
            {review
              ? review.text
              : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sed, nemo dignissimos laboriosam illo eaque deleniti, in possimus delectus error modi ab similique animi magni veritatis voluptatibus excepturi iure ratione."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
