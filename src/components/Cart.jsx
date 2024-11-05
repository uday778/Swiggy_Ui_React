
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteItem } from "../utils/cartSlice";
import toast from "react-hot-toast";
import { toogleLogin } from "../utils/toogleSlice";



let veg = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Indian-vegetarian-mark.svg/768px-Indian-vegetarian-mark.svg.png"

let nonveg = "https://www.vhv.rs/dpng/d/437-4370761_non-veg-icon-non-veg-logo-png-transparent.png"



function Cart() {
  // const { cartData, setCartData } = useContext(CartContext)
  const dispatch = useDispatch()
  const cartData = useSelector((state) => state.cartSlice.cartItems)
  const resInfo = useSelector((state) => state.cartSlice.resInfo)

  
  const userData=useSelector((state)=>state.authSlice.userData)

  const navigate=useNavigate()
 




  // const resInfo=useSelector((state)=>state.cartSlice.resInfo)

  // console.log(cartData);
  // let totalPrice=0
  // for(let i=0;i<cartData.length;i++){
  //   totalPrice=totalPrice+cartData[i].price/100 || cartData[i].defaultPrice/100
  // }

  let totalPrice = cartData.reduce(
    (acc, curVal) => acc + (curVal.price / 100 || curVal.defaultPrice / 100),
    0
  );

  function handleRemoveFromCart(i) {
    if (cartData.length > 1) {
      let newArr = [...cartData];
      newArr.splice(i, 1);
      // setCartData(newArr);
      dispatch(deleteItem(newArr));
      // setCartData(newarray)
      // localStorage.setItem("cartData",JSON.stringify(newArr)) 
      toast.success("Item Removed")

    }
    else {
      handleClearCart()
      toast.success("Your Cart Is Empty")
    }

  }

  function handleClearCart() {
    dispatch(clearCart())
    // setCartData([])
    // localStorage.setItem("cartData",JSON.stringify([]))
    // localStorage.clear()
  }
  function handlePlaceOrder() {
    if(!userData){
      toast.error("Login please")
      dispatch(toogleLogin())
      return
    }
    toast.success("Ordered Place")
    
  }


  if (cartData.length === 0) {
    return (
      <div className="w-full">
        <div className="w-[50%] mx-auto flex justify-between">
          <h1 className="text-xl my-8">Your cart is empty please order something....</h1>
          <Link to={"/"} className="bg-green-500 my-8 p-4"> Order From here
          </Link>
        </div>

      </div>

    )

  }

  return (
    <div className="w-full">
            <div className="w-[95%] md:w-[800px]  mx-auto">
                <Link to={`/restaurantMenu/${resInfo.id}`}>
                <div className="my-10 flex gap-2 md:gap-5">
                    <img
                        className="rounded-xl w-40 aspect-square"
                        src={
                            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                            resInfo.cloudinaryImageId
                        }
                        alt=""
                    />
                    <div>
                        <p className="md:text-5xl text-lg border-b-2 border-black pb-3  font-semibold">{resInfo.name}</p>
                        <p className="mt-3 md:text-xl  text-md">{resInfo.areaName}</p>
                    </div>
                </div>
                </Link>
                <hr  className="my-5 border-2"/>
                <div>
                    {cartData.map(
                        (
                            {
                                name,
                                defaultPrice,
                                price,
                                itemAttribute,
                                ratings: {
                                    aggregatedRating: { rating, ratingCountV2 },
                                },
                                description = "",
                                imageId,
                            },
                        ) => {
                            // const [isMore, setIsMore] = useState(false);

                            let trimDes = description.substring(0, 138) + "...";
                            return (
                                <>
                                    <div key={imageId} className="flex w-full my-5 justify-between min-h-[182px]">
                                        <div className="w-[55%] md:w-[70%]">
                                            <img
                                                className="w-5 rounded-sm"
                                                src={itemAttribute && itemAttribute.vegClassifier == "VEG" ? veg : nonveg}

                                                alt=""
                                                
                                            />
                                            <h2 className="font-bold text-lg">
                                                {name}
                                            </h2>
                                            <p className="font-bold text-lg">
                                                ₹
                                                {defaultPrice / 100 ||
                                                    price / 100}{" "}
                                            </p>

                                            <div className="flex items-center gap-1">
                                                {" "}
                                                <i
                                                    className={
                                                        "fi mt-1 text-xl fi-ss-star"
                                                    }
                                                ></i>{" "}
                                                <span>
                                                    {rating} ({ratingCountV2})
                                                </span>
                                            </div>

                                            <div className="line-clamp-2">{description}</div>

                                            {/* {description.length > 140 ? (
                                                <div>
                                                    <span className="">
                                                        {isMore
                                                            ? description
                                                            : trimDes}
                                                    </span>
                                                    <button
                                                        className="font-bold"
                                                        onClick={() =>
                                                            setIsMore(!isMore)
                                                        }
                                                    >
                                                        {isMore
                                                            ? "less"
                                                            : "more"}
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="">
                                                    {description}
                                                </span>
                                            )} */}
                                        </div>
                                        <div className="w-[40%] md:w-[20%] relative h-full">
                                            <img
                                                className="rounded-xl aspect-square"
                                                src={
                                                    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                                                    imageId
                                                }
                                                alt=""
                                            />
                                            <button
                                                onClick={handleRemoveFromCart}
                                                className="bg-white absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-base text-red-500 font-bold rounded-xl border px-5 py-2 drop-shadow"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <hr className="my-10 border-2" />
                                </>
                            );
                        }
                    )}
                </div>

                <h1 className="text-2xl">Total - <span className="font-bold">₹{totalPrice}</span></h1>
                <div className="flex justify-between">
                    <button
                        onClick={handlePlaceOrder}
                        className="p-3 bg-green-600 rounded-lg my-7"
                    >
                        Place order
                    </button>
                    <button
                        onClick={handleClearCart}
                        className="p-3 bg-green-600 rounded-lg my-7"
                    >
                        clear cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;


