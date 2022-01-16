import { Navigation } from "swiper";
import "swiper/modules/navigation/navigation.scss";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.scss";
import { IProduct } from "../../Interface/productInterface";
import ImageCard from "./ImageCard";

type ImageListProps = {
  category: string;
  productList: IProduct[];
};

const ImageMainList = ({ category, productList }: ImageListProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-gray-800">{category}</h1>
      </div>
      <Swiper
        modules={[Navigation]}
        slidesPerView={9}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {productList.map((product, index: number) => {
          return (
            <SwiperSlide key={index}>
              <ImageCard key={index} product={product} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ImageMainList;
