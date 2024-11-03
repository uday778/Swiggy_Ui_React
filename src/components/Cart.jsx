
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteItem } from "../utils/cartSlice";
import toast from "react-hot-toast";




function Cart() {
  // const { cartData, setCartData } = useContext(CartContext)
  const dispatch = useDispatch()
  const cartData = useSelector((state) => state.cartSlice.cartItems)
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
      navigate("/signin")
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
      <div className="w-[50%] mx-auto ">
        {
          cartData.map((data) => (
            <div key={data.name} className="flex w-full  justify-between my-5 p-4">
              <div className="w-[70%]">
                <h2 className=" text-3xl  ">{data.name}</h2>
                <p className="mt-5">&#8377;{data.price / 100 || data.defaultPrice / 100}</p>
              </div>

              <div className="w-[30%] relative h-full">
                <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${data.imageId}`} alt="" className="rounded-xl w-[70%]" />
                <button
                  onClick={(i) => handleRemoveFromCart(i)}
                  className="bg-red-500 px-8 py-1 rounded-lg text-lg font-semibold   drop-shadow-md  hover:bg-slate-100  absolute z-10 bottom-[-20px] left-5 "

                >Remove</button>
              </div>

            </div>
          ))
        }
        <h1>&#8377;{totalPrice}</h1>

        <div className="flex justify-between">
          <button className="p-3 bg-green-600 rounded-lg my-4 text-white" onClick={handleClearCart}>Clear Cart</button>
          <button className="p-3 bg-green-600 rounded-lg my-4 text-white" onClick={handlePlaceOrder}>Place order</button>
        </div>

      </div>


    </div>
  )
}

export default Cart;


