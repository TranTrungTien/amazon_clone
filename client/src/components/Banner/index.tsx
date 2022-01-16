import CategoryCardList from "../CategoryCardList";
import SlideBanner from "../Slide";

const Banner = () => {
  return (
    <div className="relative">
      <SlideBanner />
      <CategoryCardList />
    </div>
  );
};

export default Banner;
