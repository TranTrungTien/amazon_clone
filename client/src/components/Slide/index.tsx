import { Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

import "swiper/swiper.scss";
import "swiper/modules/navigation/navigation.scss";

export default function SlideBanner() {
  return (
    <div style={{ minHeight: "600px" }} className="w-full">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500 }}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        loop={true}
      >
        <SwiperSlide>
          <div className="relative w-full">
            <img src="./image/banner1.jpg" alt="banner" />
            <div
              style={{
                background:
                  "linear-gradient(to bottom, transparent, transparent, #efefef)",
              }}
              className="absolute top-0 left-0 w-full h-full z-10"
            ></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full">
            <img src="./image/banner2.jpg" alt="banner" />
            <div
              style={{
                background:
                  "linear-gradient(to bottom, transparent, transparent, #efefef)",
              }}
              className="absolute top-0 left-0 w-full h-full z-10"
            ></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full">
            <img src="./image/banner3.jpg" alt="banner" />
            <div
              style={{
                background:
                  "linear-gradient(to bottom, transparent, transparent, #efefef)",
              }}
              className="absolute top-0 left-0 w-full h-full z-10"
            ></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full">
            <img src="./image/banner4.jpg" alt="banner" />
            <div
              style={{
                background:
                  "linear-gradient(to bottom, transparent, transparent, #efefef)",
              }}
              className="absolute top-0 left-0 w-full h-full z-10"
            ></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full">
            <img src="./image/banner5.jpg" alt="banner" />
            <div
              style={{
                background:
                  "linear-gradient(to bottom, transparent, transparent, #efefef)",
              }}
              className="absolute top-0 left-0 w-full h-full z-10"
            ></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full">
            <img src="./image/banner6.jpg" alt="banner" />
            <div
              style={{
                background:
                  "linear-gradient(to bottom, transparent, transparent, #efefef)",
              }}
              className="absolute top-0 left-0 w-full h-full z-10"
            ></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
