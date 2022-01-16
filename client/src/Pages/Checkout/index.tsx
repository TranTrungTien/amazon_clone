import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ICart } from "../../Interface/myCartInterface";
import { IMyOrder } from "../../Interface/myOrderInterface";
import { IProduct } from "../../Interface/productInterface";
import { IProductOrder } from "../../Interface/productOrder";
import { getMe } from "../../Slice/userSlice";

const Checkout = () => {
  console.log("checkout run");
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [checkoutProducts, setCheckOutProducts] = useState<{
    list: ICart[] | IProduct;
    totalCost: string;
    qty?: number;
  } | null>(null);

  const buynow = Boolean(searchParams.get("buynow"));

  useEffect(() => {
    const getProduct = async () => {
      const product_id = searchParams.get("product_id");
      const qty = searchParams.get("qty");
      try {
        const response = await axios.get<IProduct>(
          `${process.env.REACT_APP_BASE_URL}/products`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              id: product_id,
            },
          }
        );
        if (response.data) {
          let price = 0;
          let quantity = 1;

          const productPrice = response.data?.["Product Price"];

          if (qty) {
            quantity = +qty;
          }
          if (productPrice) {
            price = +productPrice * quantity;
          }
          setCheckOutProducts({
            list: response.data,
            totalCost: price.toFixed(2),
            qty: quantity,
          });
        }
      } catch (error) {
        throw error;
      }
    };

    const getProducts = async () => {
      const cartIds = decodeURI(searchParams.get("cartIds") as string);
      let total = 0.0;
      try {
        const response = await axios.get<ICart[]>(
          `${process.env.REACT_APP_BASE_URL}/carts/checkout-cart`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              cartIds: cartIds,
            },
            withCredentials: true,
          }
        );
        if (response.data.length) {
          for (const product of response.data) {
            total += product["price"];
          }
          setCheckOutProducts({
            list: response.data,
            totalCost: total.toFixed(2),
          });
        }
      } catch (error) {
        throw error;
      }
    };
    if (!user) {
      dispatch(getMe())
        .then((user) => {
          if (!user.payload) {
            navigation("/login", {
              state: location.pathname + location.search,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          navigation("/login", { state: location.pathname + location.search });
        });
    } else {
      if (buynow) {
        getProduct().catch((error) => console.log({ error }));
      } else {
        getProducts().catch((error) => console.log({ error }));
      }
    }
  }, [buynow, searchParams, location, dispatch, navigation, user]);

  const onPayment = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log("clicked");

    const target = event.target as typeof event.target & {
      country: { value: string };
      fullName: { value: string };
      street: { value: string };
      city: { value: string };
      state: { value: string };
      zip: { value: string };
      phoneNumber: { value: string };
      ownName: { value: string };
      cardNumber: { value: string };
      expiredMonth: { value: string };
      expiredYear: { value: string };
      cvv: { value: string };
    };

    const creditCardIfo = {
      acceptedCard: "visa",
      ownName: target.ownName.value,
      cardNumber: target.cardNumber.value,
      expiredMonth: target.expiredMonth.value,
      expiredYear: target.expiredYear.value,
      cvv: target.cvv.value,
    };

    try {
      /// save product order
      let productIDList: string[] = [];

      if (buynow) {
        const product = checkoutProducts?.list as IProduct;
        const price =
          checkoutProducts?.qty &&
          checkoutProducts.qty * parseFloat(product["Product Price"] ?? "0");
        let productOrder = {
          product: product._id ? product._id : "",
          price: price?.toFixed(2) ?? 0,
          discount: 0,
          note: "",
          quantity: checkoutProducts?.qty ?? 0,
        };
        // post product order
        const response = await axios.post<IProductOrder>(
          `${process.env.REACT_APP_BASE_URL}/product-orders/create`,
          productOrder,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        productIDList.push(response.data._id ?? "");
      } else {
        const products = checkoutProducts?.list as ICart[];
        for (const product of products) {
          let productOrder = {
            product: product.product._id ?? "",
            price: product.price.toFixed(2),
            discount: 0,
            note: "",
            quantity: product.quantity,
          };
          console.log({ productOrder });
          //save product order;
          const response = await axios.post<IProductOrder>(
            `${process.env.REACT_APP_BASE_URL}/product-orders/create`,
            productOrder,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          productIDList.push(response.data._id ?? "");
        }
      }

      //save order

      let p_id: string[] = [];
      if (buynow) {
        const p = checkoutProducts?.list as IProduct;
        p_id.push(p._id ?? "");
      } else {
        const p = checkoutProducts?.list as ICart[];
        p.forEach((product) => {
          p_id.push(product.product["_id"] ?? "");
        });
      }
      const paymentInfo = {
        productIDList: productIDList,
        productListId: p_id,
        fullName: target.fullName.value,
        price: checkoutProducts?.totalCost,
        discount: 0,
        note: "",
        country: target.country.value,
        street: target.street.value,
        state: target.state.value,
        zip: target.zip.value,
        phoneNumber: target.phoneNumber.value,
        creditCardInfo: creditCardIfo,
      };

      await axios.post<IMyOrder>(
        `${process.env.REACT_APP_BASE_URL}/orders/create`,
        paymentInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (!buynow) {
        await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/carts/delete-all`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
      }
      navigation("/my-order");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="py-10">
      <form onSubmit={onPayment} className="space-y-6">
        <div className="flex justify-center items-start w-4/6 mx-auto space-x-32">
          <div className="px-5 py-2 flex-1 space-y-6">
            <h1 className="text-2xl font-semibold">
              Select a shipping address
            </h1>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">
                Add a new address
              </h3>
              <div>
                <div className="flex flex-col justify-start items-start space-y-2">
                  <label
                    className="text-gray-700 font-medium"
                    htmlFor="country"
                  >
                    Country/Region
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="w-full h-8 rounded-sm border border-gray-400 focus:outline-none mb-3"
                  >
                    <option value="United State">United State</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Viet Nam">Viet Nam</option>
                    <option value="China">China</option>
                    <option value="Korea">Korea</option>
                  </select>
                </div>
                <div className="flex flex-col justify-start items-start space-y-2">
                  <label
                    className="text-gray-700 font-medium"
                    htmlFor="full_name"
                  >
                    Full name (First and Last name)
                  </label>
                  <input
                    className="w-full h-8 rounded-sm border border-gray-400 focus:outline-none mb-3 px-4"
                    type="text"
                    name="fullName"
                    id="fullName"
                  />
                </div>
                <div className="flex flex-col justify-start items-start space-y-2">
                  <label
                    className="text-gray-700 font-medium"
                    htmlFor="street_address"
                  >
                    Street address
                  </label>
                  <input
                    className="w-full h-8 rounded-sm border border-gray-400 focus:outline-none px-4"
                    type="text"
                    name="street"
                    id="street"
                  />
                </div>
                <div className="flex flex-col justify-start items-start space-y-2">
                  <label className="text-gray-700 font-medium" htmlFor="city">
                    City
                  </label>
                  <input
                    className="w-full h-8 rounded-sm border border-gray-400 focus:outline-none px-4"
                    type="text"
                    name="city"
                    id="city"
                  />
                </div>
                <div className="flex flex-col justify-start items-start space-y-2">
                  <label className="text-gray-700 font-medium" htmlFor="state">
                    State / Province / Region
                  </label>
                  <input
                    className="w-full h-8 rounded-sm border border-gray-400 focus:outline-none px-4"
                    type="text"
                    name="state"
                    id="state"
                  />
                </div>
                <div className="flex flex-col justify-start items-start space-y-2">
                  <label className="text-gray-700 font-medium" htmlFor="zip">
                    Zip Code
                  </label>
                  <input
                    className="w-full h-8 rounded-sm border border-gray-400 focus:outline-none px-4"
                    type="text"
                    name="zip"
                    id="zip"
                  />
                </div>
                <div className="flex flex-col justify-start items-start space-y-2">
                  <label
                    className="text-gray-700 font-medium"
                    htmlFor="phone_number"
                  >
                    Phone number
                  </label>
                  <input
                    className="w-full h-8 rounded-sm border border-gray-400 focus:outline-none px-4"
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="px-5 py-2 flex-1 space-y-6 ">
            <h1 className="text-2xl text-black font-semibold">
              Select a credit card
            </h1>
            <div className="flex flex-col justify-start items-start space-x-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Payment
              </h3>
              <div className="">
                <label htmlFor="fname" className="font-medium text-gray-800">
                  Accepted Cards
                </label>
                <div className="text-5xl space-x-2 mb-3">
                  <i className="fab fa-cc-visa" style={{ color: "navy" }}></i>
                  <i className="fab fa-cc-amex" style={{ color: "blue" }}></i>
                  <i
                    className="fab fa-cc-mastercard"
                    style={{ color: "red" }}
                  ></i>
                  <i
                    className="fab fa-cc-discover"
                    style={{ color: "orange" }}
                  ></i>
                </div>
                <label className="text-gray-700 font-medium" htmlFor="ownName">
                  Name on Card
                </label>
                <input
                  className="px-5 w-full h-8 rounded-sm border border-gray-400 focus:outline-none mb-3"
                  type="text"
                  id="ownName"
                  name="ownName"
                  placeholder="John More Doe"
                />
                <label
                  className="text-gray-700 font-medium"
                  htmlFor="cardNumber"
                >
                  Credit card number
                </label>
                <input
                  className="px-5 w-full h-8 rounded-sm border border-gray-400 focus:outline-none mb-3"
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1111-2222-3333-4444"
                />
                <label
                  className="text-gray-700 font-medium"
                  htmlFor="expiredMonth"
                >
                  Exp Month
                </label>
                <input
                  className="px-5 w-full h-8 rounded-sm border border-gray-400 focus:outline-none mb-3"
                  type="text"
                  id="expiredMonth"
                  name="expiredMonth"
                  placeholder="September"
                />
                <div className="row">
                  <div className="col-50 flex justify-start items-start flex-col">
                    <label
                      className="text-gray-700 font-medium"
                      htmlFor="expiredYear"
                    >
                      Exp Year
                    </label>
                    <input
                      className="px-5 w-full h-8 rounded-sm border border-gray-400 focus:outline-none mb-3"
                      type="text"
                      id="expiredYear"
                      name="expiredYear"
                      placeholder="2018"
                    />
                  </div>
                  <div className="col-50 flex justify-start items-start flex-col">
                    <label className="text-gray-700 font-medium" htmlFor="cvv">
                      CVV
                    </label>
                    <input
                      className="px-5 w-full h-8 rounded-sm border border-gray-400 focus:outline-none mb-3"
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="352"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/6 mx-auto space-y-5">
          <h1 className="text-xl font-semibold">Product List</h1>
          <div className="w-2/3 space-y-3">
            {Array.isArray(checkoutProducts?.list) ? (
              <>
                {checkoutProducts?.list?.map((cart, index) => {
                  const firstName =
                    cart?.product["Product Image Url"]?.split("|")[0];
                  return (
                    <div
                      key={index}
                      className="flex justify-start items-center space-x-3"
                    >
                      <div className="w-10 h-10">
                        <img
                          src={firstName && firstName}
                          alt="item"
                          className="w-full h-full object-cover object-center rounded-sm"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 font-semibold truncate">
                          {cart.product["Product Name"]}
                        </p>
                      </div>
                      <div>
                        <span className="text-red-600 font-bold">
                          {" "}
                          ${cart.product["Product Price"]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="flex justify-start items-center space-x-3">
                <div className="w-10 h-10">
                  <img
                    src={checkoutProducts?.list["Product Image Url"]}
                    alt="item"
                    className="w-full h-full object-cover object-center rounded-sm"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-semibold truncate">
                    {checkoutProducts?.list["Product Name"]}
                  </p>
                </div>
                <div>
                  <span className="text-red-600 font-bold">
                    {" "}
                    ${checkoutProducts?.list["Product Price"]}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="w-2/3 flex justify-end items-center space-x-3 text-gray-900 text-lg font-medium">
            <span>Total Cost : </span>
            <span className="text-xl font-bold text-red-700">
              ${checkoutProducts?.totalCost && checkoutProducts.totalCost}
            </span>
          </div>
        </div>
        <div className="w-4/6 mx-auto flex justify-center">
          <button
            type="submit"
            className="w-3/6 mx-auto px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-lg font-semibold rounded"
          >
            Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
