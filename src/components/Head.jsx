
import logo from "../assets/swiggy.png";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { IoBagOutline, IoCartOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa6";
import { RiDiscountPercentLine } from "react-icons/ri";
import { CgPokemon } from "react-icons/cg";
import { Link, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import {  Coordinates, } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { toogleSearchBar } from "../utils/toogleSlice";



function Head() {

  const visible = useSelector((state) => state.toogleSlice.searchToogle)
  const [searchresult, setsearchResult] = useState([])
  const [address, setAddress] = useState("")

  const dispatch = useDispatch()
  const { setCoord } = useContext(Coordinates)
  // const { cartData, setCartData } = useContext(CartContext)
  const cartData=useSelector((state)=>state.cartSlice.cartItems)
  const userData=useSelector((state)=>state.authSlice.userData)

  const navItems = [
    {
      name: "Swiggy Corporate",
      icon: <IoBagOutline />,
      path:"/corporate"
    },
    {
      name: "Search",
      icon: <IoIosSearch />,
       path:"/search"
    },
    {
      name: "Offer",
      icon: <RiDiscountPercentLine />,
       path:"/offer"
    },
    {
      name: "Help",
      icon: <CgPokemon />,
    },
    {
      name: "Sign In",
      icon: <FaRegUser />,
       path:"/signin"
    },
    {
      name: "Cart",
      icon: <IoCartOutline />,
       path:"/cart"
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


      <div className="h-20 w-full shadow-md flex justify-center items-center">
        <div className="   w-[80%] flex justify-between">
          <div className="flex  items-center">
            <Link to={"/"}> <img src={logo} className="w-16 px-4" />
            </Link>
            <div className="flex justify-evenly" onClick={handleVisibity}>
              <p className="font-semibold  border-b-2  border-black pb-1 hover:text-orange-500 text-sm">Other`s</p>
              {address && <span className="ml-2
               line-clamp-1 
              text-sm opacity-80 w-[250px] mt-2">{address}</span>
              }
              <IoIosArrowDown className="mt-1 ml-2 gap-2 text-orange-500" />
            </div>

          </div>

          <div className="flex items-center gap-10 font-semibold px-2">
            {
              navItems && navItems?.map((item) => (
                  item.name=="Sign In"?
                  <Link to={item.path} key={item.name}>
                   <div className="flex items-center gap-2"  >

                   {
                   userData ? (<img src={userData.photo} alt="" />) 
                   :
                   (<span className="mt-1 w-6">{item.icon}</span>)
                   }
                    <p>{ userData? userData.name: item.name}</p>
                    {
                      item?.name === "Cart" && cartData && <p>{cartData.length}</p>
                    }
                  </div>
                  </Link>   
                  :
                  <Link to={item.path} key={item.name}>
                  <div className="flex items-cente gap-2"  >
                   <span className="mt-1 w-6">{item.icon}</span>
                   <p>{item.name}</p>
                   {
                     item?.name === "Cart" && cartData && <p>{cartData.length}</p>
                   }
                 </div>
                 </Link>             
              ))
            }
          </div>
        </div>

      </div>
      <Outlet />
    </div>
  );
}

export default Head;
