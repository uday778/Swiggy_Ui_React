import {  useContext, useEffect, useState } from "react";
import OnYourMind from "./OnYourMind";
import TopResturents from "./TopResturents";
import OnlineFoodDelivery from "./OnlineFoodDelivery";
import { Coordinates } from "../context/contextApi";
import { useSelector } from "react-redux";




function Body() {
  const[topRestaurantData,setTopRestaurantData]=useState([])
  const[onYourMind,setOnYourMind]=useState([])
  const[TopResTitle,setResTitle]=useState("")
  const[OnlineTitle,setOnlineTitle]=useState("")
  const[Data,setData]=useState({})
const {coord:{lat,lng}}=useContext(Coordinates)



 async function fetchData() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );    
    const response = await data.json();
    setData(response?.data)    
   setResTitle(response?.data?.cards[1]?.card?.card?.header?.title);
   
   
    setOnlineTitle(response?.data?.cards[2]?.card?.card?.title);
    setTopRestaurantData(
      response?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );


    setOnYourMind(response?.data?.cards[0]?.card?.card?.imageGridCards?.info)
    
  }
  useEffect(() => {
    fetchData()
  }, [lat,lng]);


  const filterVal = useSelector((state) => state?.filterSlice?.filterVal);


  
  
  
  
  


    const filteredData = topRestaurantData?.filter((item) => { 
        if (!filterVal) return true;

        switch (filterVal) {
            case "Ratings 4.0+":
                return item?.info?.avgRating > 4;
            case "Rs. 300-Rs. 600":
                return (
                    item?.info?.costForTwo?.slice(1, 4) >= "300" &&
                    item?.info?.costForTwo?.slice(1, 4) <= "600"
                );
            case "Offers":
                return(
                  item?.info?.aggregatedDiscountInfoV3?.header?.slice(1,3)<="10%" 
                )
            case "Less than Rs. 300":
                return item?.info?.costForTwo?.slice(1, 4) < "300";
            default:
                return true;
        }
    });
 

  if(Data?.communication){
    return( 
      <div className="flex justify-center flex-col  items-center ">
        <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_470//portal/m/location_unserviceable` }alt="" className="w-60" />
         <h1 className="font-semibold text-2xl">Location Unserviceable</h1>
         <p className="text-md">We don`t have any services here till now.Try   changing location.</p>
      </div>
   )
  }

  
 
 

  return (
   <div className="w-full ">
      <div className="md:w-[75%] w-full sm:w-[90%]  mx-auto mt-6 overflow-hidden px-8 lg:w-[80%]">
        <OnYourMind data={onYourMind} />
        <TopResturents data={topRestaurantData} title={TopResTitle} />
        <OnlineFoodDelivery data={filterVal?filteredData:topRestaurantData} title={OnlineTitle}/>
      </div>
      
    </div>
  );
}

export default Body;
