type FeaturesProps = {
  productFeaturesImages: string | undefined;
};

const Features = ({ productFeaturesImages }: FeaturesProps) => {
  const features = productFeaturesImages?.split("|");
  console.log({ features });
  return (
    <div className="mt-14 p-8  space-y-6 ">
      <h1 className="text-2xl font-bold mb-4">From the manufacturer</h1>
      {features?.map((link, index) => {
        if (index % 2 === 0) {
          return (
            <div
              key={index}
              className="flex justify-center items-center space-x-4 w-4/6 mx-auto"
            >
              <div style={{ flex: 2 }} className="w-5/6 mx-auto">
                <p className=" text-gray-900">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Neque totam repudiandae tenetur, laboriosam, libero accusamus
                  nulla corporis numquam ipsam qui recusandae ipsa. Ea quam
                  voluptatibus cum quae et, atque delectus. Quidem reprehenderit
                  voluptatibus velit dolor numquam a nisi vero asperiores
                  placeat perspiciatis repellat, quasi, consequuntur veritatis.
                  Sapiente soluta atque voluptatem, mollitia, et vel eligendi
                  vitae delectus rem, aspernatur magni natus!
                </p>
              </div>
              <div className="w-full h-auto flex-1">
                <img
                  src={link}
                  alt="Features"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          );
        }
        return (
          <div
            key={index}
            className="flex justify-center items-center space-x-4 w-4/6 mx-auto"
          >
            <div className="w-full h-auto flex-1">
              <img
                src={link}
                alt="Features"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div style={{ flex: 2 }} className="w-5/6 mx-auto">
              <p className=" text-gray-900">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
                totam repudiandae tenetur, laboriosam, libero accusamus nulla
                corporis numquam ipsam qui recusandae ipsa. Ea quam voluptatibus
                cum quae et, atque delectus.
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Features;
