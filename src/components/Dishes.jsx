
import { MdStars } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { nonveg, veg } from "../utils/links";
import { MdOutlineCurrencyRupee } from "react-icons/md";

import AddtoCartBtn from "./AddtoCartBtn";


function Dishes({
    data: {
        card: {
            card: {
                info: dishInfo,
                restaurant: { info:resInfo },
                hideRestaurantDetails = false,
            }
        }
    },
}) {
    let { imageId = "", name, price, isVeg = 0, id: itemId } = dishInfo;
    // console.log(dishInfo)
    let {
        id,
        name: resName,
        avgRating,
        sla: { slaString },
        slugs: { city, restaurant: resLocation },
    } = resInfo;

    // console.log(resInfo);





    return (
            <div className="bg-white rounded-2xl p-4  m-4">
                <div className="flex justify-between text-sm ">
                    <div className="">
                        <p className="font-bold">{resName}</p>
                        <p className="my-2 opacity-50"><MdStars className="mt-1 text-green-600 text-lg" />{avgRating}. {slaString}</p>
                    </div>
                    <FaArrowRight className="text-2xl opacity-60" />
                </div>

                <hr className="border-dotted" />

                <div className="my-3 md:max-w-fit flex justify-between">
                    <div className="w-[50%]  md:w-[168px] flex flex-col gap-1">
                        <div className="w-5 h-5">
                            {isVeg ? (
                                <img src={veg} alt="" />
                            ) : (
                                <img src={nonveg} alt="" />
                            )}
                        </div>
                        <p className="text-lg font-semibold">{name}</p>
                        <p className="flex">
                        <MdOutlineCurrencyRupee/>
                            <span>{price / 100}</span>
                        </p>
                        <button className="px-4 py-1 w-max rounded-3xl border">
                            More Details
                        </button>
                    </div>

                    <div className="w-[40%] md:w-[40%] relative h-full">
                        <img
                            className="rounded-xl object-cover aspect-square"
                            src={
                                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                                imageId
                            }
                            alt=""
                        />
                        <div>
                            <AddtoCartBtn
                            />
                        </div>
                    </div>
                </div>
            </div>

            )
}

            export default Dishes


// { card: { card: { info, restaurant } }, i }
// const {
//     imageId = "",
//     name,
//     price,
//     isVeg = 0
// } = info;

// const {
//     id,
//     name: resName,
//     avgRating,
//     sla: { slaString }
// } = restaurant.info;