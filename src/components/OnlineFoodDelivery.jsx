import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import {setFilterValue} from '../utils/filterSlice'

function OnlineFoodDelivery({ data ,title}) {


  const filterOptions = ["Ratings 4.0+","Rs. 300-Rs. 600","Offers","Less than Rs. 300"]

  const [activeBtn, setActiveBtn ] = useState(null)

  const dispatch = useDispatch()

  function handleFilterBtn (filterName) {
      setActiveBtn(activeBtn === filterName  ? null : filterName)
      console.log(activeBtn);
      
  }
  dispatch(setFilterValue(activeBtn))

 
  return (
    <div>
     <h1 className="text-2xl font-bold mb-2">
          {title}
        </h1>
        <div className="my-7 flex flex-wrap  gap-3  ">
        {
                    filterOptions.map((filterName,i) => (
                        <button key={i} onClick={() => handleFilterBtn(filterName)} className={"filterBtn flex gap-2 " + (activeBtn === filterName ? "active" : "")}>
                            <p>{filterName}</p>
                            <RxCross2 className="cross hidden text-xl mt-1"/>
                        </button>
                    ))
                }

        </div>
      <div className="grid grid-cols-4 gap-8">
        {data && data.map(({ info ,cta:{link}}) => (
          <div key={info.id} className="hover:scale-95 duration-300 items-center">
            <RestaurantCard {...info} link={link} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OnlineFoodDelivery;
