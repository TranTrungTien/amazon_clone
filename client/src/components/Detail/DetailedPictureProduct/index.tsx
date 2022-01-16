import { useState } from "react";

type DetailedPictureProductProps = {
  productImage: string | undefined;
};

const DetailedPictureProduct = ({
  productImage,
}: DetailedPictureProductProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const images = productImage && productImage.split("|");

  const onChangeImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div
      style={{ flex: 2 }}
      className=" flex justify-start items-center space-x-3"
    >
      <div className="flex flex-col justify-start items-start space-y-4">
        {images &&
          images.map((link, index) => {
            return (
              <div
                onClick={() => onChangeImage(index)}
                key={index}
                className={`w-12 h-12 cursor-pointer ${
                  currentImageIndex === index && "border border-yellow-700 p-px"
                }`}
              >
                <img
                  src={link}
                  alt="Small Product I"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            );
          })}
      </div>
      <div style={{ height: "535px" }} className="flex-1 h-full">
        <img
          src={images && images[currentImageIndex]}
          alt="Product I"
          className="w-full h-full object-cover rounded"
        />
      </div>
    </div>
  );
};

export default DetailedPictureProduct;
