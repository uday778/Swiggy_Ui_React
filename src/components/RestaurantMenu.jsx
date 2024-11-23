import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdStars } from "react-icons/md";
import { GiCycling } from "react-icons/gi";
import parse from "html-react-parser";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { Coordinates } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, clearCart } from "../utils/cartSlice";
import toast from "react-hot-toast";
import AddtoCartBtn from "./AddtoCartBtn";





let veg = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Indian-vegetarian-mark.svg/768px-Indian-vegetarian-mark.svg.png"

let nonveg = "https://www.vhv.rs/dpng/d/437-4370761_non-veg-icon-non-veg-logo-png-transparent.png"


function RestaurantMenu() {
  const { id } = useParams();
  const [value, setValue] = useState(0);


  let mainId = id
    .split("-")
    .at(-1)
    .replace(/[^0-9]/g, "");
  // console.log(mainId);

  const [menuData, setMenudata] = useState([]);
  const [resInfo, setResInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [topPicksData, setTopPicksData] = useState([])
  
  const { coord: { lat, lng } } = useContext(Coordinates)


  async function fetchMenu() {
    let data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`
    );
    let response = await data.json();

    // console.log(response);





    setResInfo(response?.data?.cards[2]?.card?.card?.info);
    setDiscountData(
      response?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );


    let actualMenu = response?.data?.cards.find((data) => data?.groupedCard);
    // console.log(actualMenu);

    setMenudata(
      actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
      )
    );
    setTopPicksData(response?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(data => data?.card?.card?.title === "Top Picks")[0]);


  }

  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 50);
  }
  function handleNext() {
    value === 150 ? "" : setValue((prev) => prev + 50);
  }



  useEffect(() => {
    fetchMenu();
  }, [lat, lng]);
  return (
    <div className="w-full">
      <div className="md:w-[800px]   mx-auto pt-10 w-[93%]">
        <p className="text-[12px] text-slate-400  ">
          {" "}
          <Link to="/">
            Home/ <span className="hover:text-slate-800">{resInfo.city}/</span>{" "}
            <span className="hover:text-slate-800">{resInfo.name}</span>
          </Link>{" "}
        </p>

        <h1 className="pt-6 font-bold text-2xl">{resInfo?.name}</h1>
        <div className="w-full h-52 p-5  border-black mt-3 rounded-[32px] px-4 pb-4 bg-gradient-to-t from-slate-200/50">
          <div className="w-full border bg-white border-slate-200/60 rounded-[30px] p-4 h-full">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <MdStars className="text-green-500 text-2xl" />{" "}
              <span>{resInfo.avgRating}</span>
              <span>({resInfo?.totalRatingsString})-</span>
              <span>{resInfo?.costForTwoMessage}</span>
            </div>
            <p className="text-sm underline text-orange-600 mt-2 font-semibold">
              {resInfo?.cuisines?.join(", ")}
            </p>

            <div className="flex gap-2 mt-1">
              <div className="flex flex-col justify-center items-center">
                <div className="w-2 h-2 bg-black/60 rounded-full"></div>
                <div className="w-[1px] h-5  bg-gray-500 "></div>
                <div className="w-2 h-2 bg-black/50 rounded-full"></div>
              </div>
              <div className="flex flex-col gap-2 text-base ">
                <p>
                  outlet{" "}
                  <span className="text-gray-500 text-sm">
                    {resInfo?.locality}
                  </span>
                </p>
                <p className="text-sm">{resInfo.sla?.slaString}</p>
              </div>
            </div>

            {
              resInfo?.feeDetails?.message ?
                <div>
                  <hr className="my-1" />
                  <span className="flex gap-3 items-center ">
                    <GiCycling className="text-black text-2xl" />{" "}
                    {parse(`${resInfo?.feeDetails?.message}`)} |{" "}
                  </span></div> : ""
            }
          </div>
        </div>

        <div className="w-full overflow-hidden overflow-y-scroll no-scrollbar">
          <div className="flex justify-between mt-8 ">
            <h1 className="text-xl font-bold"> Deals for you</h1>
            <div className="flex gap-4">
              <div
                className={
                  `rounded-2xl p-2 cursor-pointer ` +
                  (value <= 0 ? "bg-gray-200" : "bg-gray-300")
                }
                onClick={handlePrev}
              >
                <FaArrowLeft
                  className={value <= 0 ? "text-gray-400" : "text-gray-800"}
                />
              </div>
              <div
                className={
                  `rounded-2xl p-2 cursor-pointer ` +
                  (value >= 150 ? "bg-gray-200" : "bg-gray-300")
                }
                onClick={handleNext}
              >
                <FaArrowRight
                  className={value >= 150 ? "text-gray-400" : "text-gray-800"}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-5">
            {discountData?.map((data) => (
              <Discount data={data} key={data?.info?.offerIds} />
            ))}
          </div>
        </div>

        {/* top picks  */}
        {
          topPicksData &&
          <div className="w-full overflow-hidden overflow-y-scroll no-scrollbar">
            <div className="flex justify-between mt-8 ">
              <h1 className="text-xl font-bold"> {topPicksData?.card?.card?.title}</h1>
              <div className="flex gap-4">
                <div
                  className={
                    `rounded-2xl p-2 cursor-pointer ` +
                    (value <= 0 ? "bg-gray-200" : "bg-gray-300")
                  }
                  onClick={handlePrev}
                >
                  <FaArrowLeft
                    className={value <= 0 ? "text-gray-400" : "text-gray-800"}
                  />
                </div>
                <div
                  className={
                    `rounded-2xl p-2 cursor-pointer ` +
                    (value >= 150 ? "bg-gray-200" : "bg-gray-300")
                  }
                  onClick={handleNext}
                >
                  <FaArrowRight
                    className={value >= 150 ? "text-gray-400" : "text-gray-800"}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              {
                topPicksData?.card?.card?.carousel.map(({ creativeId, dish: { info: { defaultPrice, price } } }) => (
                  <div key={creativeId} className="min-w-[300px] h-[300px] relative">
                    <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${creativeId}`} alt="" className=" w-full h-full " />
                    <div className=" absolute bottom-4 flex text-white justify-between items-center px-4 w-full ">
                      <p className="text-lg">₹{defaultPrice / 100 || price / 100} </p>
                      <button className=" px-8 py-2 text-green-600 font-semibold bg-white rounded-xl hover:bg-slate-100"

                      > Add </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        }
        {/* {menu} */}
        <h2 className="mt-10 text-center tracking-wide">⁠ MENU ⁠</h2>
        <div className="w-full mt-5 relative">
          <div className="w-full p-4  text-lg bg-slate-200/40 text-center rounded-2xl   cursor-pointer">
            Search for Dishes{" "}
            <IoIosSearch className="absolute right-5 top-5 text-2xl " />
          </div>
        </div>

        {/* {recommanded} */}
        <div>
          {menuData.map(({ card: { card } }, i) => (
            <MenuCard card={card} key={i} resInfo={resInfo} />
          )
          )}
        </div>
      </div>
    </div>
  );
}



function Discount({
  data: {
    info: { header, offerLogo, description },
  },
}) {
  return (
    <div
      className="flex border p-3  min-w-[328px] h-[76px]  rounded-2xl gap-2"
      key={header}
    >
      <img
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${offerLogo}`}
        alt=""
      />
      <div>
        <h2 className="line-clamp-1 font-bold text-lg">{header}</h2>
        <p className="line-clamp-1 text-gray-400">{description}</p>
      </div>
    </div>
  );
}




function MenuCard({ card, resInfo }) {
  const [isMore, setIsMore] = useState(false);



  let hello = false
  if (card?.["@type"]) {
    hello = true
  }

  const [isopen, setIsOpen] = useState(hello)


  function toggledropDown() {
    setIsOpen((prev) => !prev)
  }
  if (card?.itemCards) {
    const { title, itemCards } = card;

    return (
      <>
        <div className="mt-5">
          <div className="flex justify-between text-base">
            <h1 className={"font-semibold text-" + (card?.["@type"] ? "xl" : "base")}>
              {title} ({itemCards?.length})
            </h1>

            {isopen ? <IoIosArrowUp className="text-xl" onClick={toggledropDown} /> : <IoIosArrowDown className="text-xl" onClick={toggledropDown} />}
          </div>
          {
            isopen && <DetailMenu itemCards={itemCards} resInfo={resInfo} />
          }

        </div>
        <hr className={
          "my-5 border-" + (card["@type"] ? "[10px]" : "[4px]")
        } />
      </>
    );
  } else {
    const { title, categories } = card
    return (
      <>
        <div className="mt-5  ">
          <h1 className="font-semibold text-base" >{card?.title || title}</h1>

          {
            categories.map((data) => (
              <MenuCard card={data} key={data?.title} resInfo={resInfo} />
            ))
          }
          <hr className={
            "my-5 border-" + (card["@type"] ? "[10px]" : "[4px]")
          } />
        </div>

      </>
    )
  }


}





function DetailMenu({ itemCards, resInfo }) {




  return (
    <div className="mt-5 ">
      {
        itemCards && itemCards.map(({
          card: { info } }) => (
          <Detailmenucard info={info} key={info?.id} resInfo={resInfo} />
        )

        )
      }
    </div>
  )
}



function Detailmenucard({ info, resInfo }) {

  const {
    name,
    id,
    description,
    imageId,
    price,
    ratings: { aggregatedRating: { rating, ratingCountV2 } },
    defaultPrice,
    itemAttribute
  } = info
  

  const [isMore, setIsMore] = useState(false)
  let trimDes = description.substring(0, 138) + "...";


  const dispatch = useDispatch()
  
  const [isDiffRes, setisDiffRes] = useState(false)



  

  function handleIsDiffRes() {
    setisDiffRes((prev) => !prev)
  }
  function handleClearCart() {
    dispatch(clearCart())
    handleIsDiffRes()

  }


  return (
    <div className="relative">
      <div className="flex justify-between w-full mt-5 min-h-[182px] px-4">
        <div className=" md:w-[70%] w-[55%]">
          <img src={itemAttribute&&itemAttribute?.vegClassifier == "VEG" ? veg : nonveg} alt="" className="w-4 rounded-sm" />
          <h2 className="font-bold text-lg ">{name}</h2>
          <p className="font-bold text-lg ">₹{defaultPrice / 100 || price / 100}</p>
          <p className=" flex items-center gap-2"><FaStar className="text-green-600 " />{rating && <span>{rating} ({ratingCountV2})</span>}</p>
          {
            description.length > 140 ?
              <div>
                <span className="line-clamp-2 md:line-clamp-none">{isMore ? description : trimDes}</span>
                <button className="font-bold ml-2 hover:underline hidden md:block" onClick={() => setIsMore(!isMore)}>{isMore ? "less" : "more"} </button>
              </div> : <span>{trimDes}</span>
          }

        </div>
        <div className="w-[40%] md:w-[20%] relative h-full ">
          <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`} alt="" className="rounded-xl aspect-square" />
          <AddtoCartBtn info={info} resInfo={resInfo} handleIsDiffRes={handleIsDiffRes} />
        </div>
      </div>
      <hr className="my-5"></hr>

      {
        isDiffRes && (
          <div className="w-[90%] sm:w-[520px] h-auto mx-auto border fixed bottom-10 shadow-sm left-[5%] sm:left-1/2 sm:transform sm:-translate-x-1/2 lg:w-[520px] p-4 md:p-6 lg:p-8 z-10 bg-white">
            <h1 className="text-lg font-semibold">Items Already In Cart</h1>
            <p className="text-sm mt-2">
              Your cart contains items from another restaurant. Would you like to reset your cart to add items from this restaurant?
            </p>
            <div className="flex justify-between w-full uppercase gap-2 p-4 border-t mt-4">
              <button
                onClick={handleIsDiffRes}
                className="w-1/2 p-2 md:p-3 border-green-600 text-green-600 border-2">
                No
              </button>
              <button
                onClick={handleClearCart}
                className="w-1/2 p-2 md:p-3 bg-green-600 text-white border-2">
                Yes, Start Afresh
              </button>
            </div>
          </div>
        )
      }
    </div>
  )

}


export default RestaurantMenu;
