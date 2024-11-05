

import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { Coordinates, } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { toogleLogin, toogleSearchBar } from "../utils/toogleSlice";
import SignInBtn from "./SignInBtn";



function Head() {

  const visible = useSelector((state) => state.toogleSlice.searchToogle)
  const loginvisible = useSelector((state) => state.toogleSlice.loginToggle)
  const [searchresult, setsearchResult] = useState([])
  const [address, setAddress] = useState("")

  const dispatch = useDispatch()
  const { setCoord } = useContext(Coordinates)
  // const { cartData, setCartData } = useContext(CartContext)
  const cartData = useSelector((state) => state.cartSlice.cartItems)
  const userData = useSelector((state) => state.authSlice.userData)

  const navItems = [

    {
      name: "Search",
      icon: <IoIosSearch />,
      path: "/search"
    },
    {
      name: "Sign In",
      icon: <FaRegUser />,
      path: "/signin"
    },
    {
      name: "Cart",
      icon: <IoCartOutline />,
      path: "/cart"
    },
  ];

  async function searchResultFunc(value) {
    if (value == "") return
    const res = await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${value}`)
    const data = await res.json();
    setsearchResult(data?.data)

  }

  async function fetchLatAndLong(id) {
    if (id == "") return
    handleVisibity()

    const res = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/address-recommend?place_id=${id}`
    );
    const data = await res.json();
    setCoord({
      lat: data?.data[0]?.geometry?.location?.lat,
      lng: data?.data[0]?.geometry?.location?.lng
    })
    setAddress(data?.data[0]?.formatted_address);


  }

  function handleVisibity() {
    dispatch(toogleSearchBar())
  }

  function handleLogin() {
    dispatch(toogleLogin())
  }

  return (
    <div className="">
      <div className="w-full ">
        <div
          onClick={handleVisibity}
          className={
            "w-full bg-black/50 z-30 h-full overflow-hidden absolute " +
            (visible ? "visible " : " invisible")
          }
        ></div>
        <div
          className={
            " bg-white flex justify-end w-full md:w-[40%] h-full overflow-hidden p-5 z-40 absolute duration-500 " +
            (visible ? "left-0" : "-left-[100%]")
          }
        >

          <div className=" w-[75%] flex flex-col gap-4 mr-4 ">

            <RxCross2 onClick={handleVisibity} className="text-2xl cursor-pointer" />
            <input type="text" placeholder="Search Here" className="border p-5  focus:outline-none focus:shadow-lg rounded-lg" onChange={(e) => searchResultFunc(e.target.value)} />
            <div className="border  p-5 ">
              <ul>
                {searchresult.map((data, index) => {
                  const isLast =
                    index === searchresult.length - 1;
                  return (
                    <div className="my-5" key={index}>
                      <div className="flex gap-4">
                        <CiLocationOn className="text-xl mt-2 " />
                        <li
                          onClick={() =>
                            fetchLatAndLong(
                              data.place_id
                            )
                          }
                        >
                          {
                            data
                              .structured_formatting
                              .main_text
                          }
                          <p className="text-sm opacity-65">
                            {
                              data
                                .structured_formatting
                                .secondary_text
                            }
                          </p>
                          {!isLast && (
                            <p className="opacity-35">
                              -------------------------------------
                            </p>
                          )}
                        </li>
                      </div>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>


        </div>
      </div>
      <div className="w-full ">
        <div
          onClick={handleLogin}
          className={
            "w-full bg-black/50 z-30 h-full overflow-hidden absolute " +
            (loginvisible ? "visible " : " invisible")
          }
        ></div>
        <div
          className={
            " bg-white flex  w-full md:w-[40%] h-full overflow-hidden p-5 z-40 absolute duration-500 " +
            (loginvisible ? "right-0" : "-right-[100%]")
          }
        >

          <div className=" m-4 w-[60%]  ">
            <RxCross2 onClick={handleLogin} className="text-2xl cursor-pointer" />
            <div className="w-full flex justify-between my-10 items-center">
              <h2 className="font-bold text-4xl border-b-2 pb-5 border-black">Login</h2>
              <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" className="w-28" />
            </div>
            <SignInBtn />
            <p className="text-sm my-5 opacity-60">By clicking on Login, I accept the Terms &
              Conditions & Privacy Policy</p>
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <div className="h-24 w-full shadow-md flex justify-center items-center sticky bg-white top-0 z-20 ">
          <div className=" w-full sm-w-[90%] lg-w-[80%] md:w-[75%]  flex justify-between px-8">
            <div className="flex  items-center ">

              <Link to={"/"}>
                <div className="w-20 ">
                  <img src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png" />
                </div>

              </Link>
              <div className=" flex items-center gap-2" onClick={handleVisibity}>
                <p className="flex items-center"><span className="font-bold border-b-2  border-black">Other`s</span>
                  <span className="ml-1 max-w-[250px] text-sm opacity-85 line-clamp-1">{address}</span>
                </p>
                <IoIosArrowDown className="gap-1 text-xl text-orange-500" />
              </div>

            </div>

            <div className=" hidden md:flex items-center md:gap-14 gap-2 font-semibold  px-2">
              {
                navItems && navItems?.map((item) => (
                  item.name == "Sign In" ? (
                    <div
                      onClick={handleLogin}
                      key={item.path}>
                      <div className="flex items-center gap-3"  >

                        {
                          userData ? (<img src={userData.photo} alt="" className="w-10 h-10 rounded-full " />)
                            :
                            (<span className="mt-1 text-xl text-gray-700">{item.icon}</span>)
                        }
                        <p>{userData ? userData.name : item.name}</p>
                        {
                          item?.name === "Cart" && cartData && <p>{cartData.length}</p>
                        }
                      </div>
                    </div>)
                    :

                    (<Link to={item.path} key={item.name}>
                      <div className="flex items-cente gap-2"  >
                        <span className="mt-1 text-xl text-gray-700">{item.icon}</span>
                        <p>{item.name}</p>
                        {
                          item?.name === "Cart" && cartData && <p>{cartData.length}</p>
                        }
                      </div>
                    </Link>)
                ))
              }
            </div>




            <div className="flex items-center md:hidden gap-10 mr-4 ">
              {
                navItems.map((data, i) => (
                  data.name == "Sign In" ? (
                    <div key={data.name} to={data.path} onClick={handleLogin}>
                      <span key={i} className="mt-1 text-xl">{data.icon}</span>
                    </div>
                  )
                    :
                    (
                      <Link to={data.path} key={data.name}>
                        
                          <span key={data.name} className="mt-1 text-xl">{data.icon}</span>
                          {
                            data.name == "Cart" && <sup>{cartData.length}</sup>
                          }
                        

                      </Link>

                    )
                ))
              }
            </div>
          </div>

        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Head;
