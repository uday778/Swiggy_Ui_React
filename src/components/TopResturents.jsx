import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import RestaurantCard from "./RestaurantCard";


function TopResturents({ data=[],title }) {
  const [value, setvalue] = useState(0);
  
 
  

  function handleprev() {
    value <= 0 ? "" : setvalue((prev) => prev - 56);
  }
  function handlenext() {
    value >= 448 ? "" : setvalue((prev) => prev + 56);
  }

  return (
    <div>
      <div className="flex justify-between ">
        <h1 className="text-2xl font-bold">
          {title}
        </h1>
        <div className="flex gap-4">
          <div
            className={
              `rounded-2xl p-2 cursor-pointer ` +
              (value <= 0 ? "bg-gray-200" : "bg-gray-300")
            }
            onClick={handleprev}
          >
            <FaArrowLeft
              className={value <= 0 ? "text-gray-400" : "text-gray-800"}
            />
          </div>
          <div
            className={
              `rounded-2xl p-2 cursor-pointer ` +
              (value >= 450 ? "bg-gray-200" : "bg-gray-300")
            }
            onClick={handlenext}
          >
            <FaArrowRight
              className={value >= 450 ? "text-gray-400" : "text-gray-800"}
            />
          </div>
        </div>
      </div>
      <div
        className={`flex mt-4 gap-5 w-full  duration-1000`}
        style={{ translate: `-${value}%` }}
      >
        {data && data.map(({ info , cta:{link} }) => (
          <div key={info.id} className="hover:scale-95 duration-300">
           <RestaurantCard {...info} link={link} />
          </div>
        ))}
      </div>
      <hr className="border my-10 "></hr>
    </div>
  );
}

export default TopResturents;
