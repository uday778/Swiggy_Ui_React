import { useContext, useEffect, useState } from "react"
import { Coordinates } from "../context/contextApi";
import { retry } from "@reduxjs/toolkit/query";
import Dishes from "./Dishes";
import SearchRestaurant from "./SearchRestaurant";



function Search() {

    const filterOptions = ["Restaurants", "Dishes"]

    const [activeBtn, setActiveBtn] = useState("Dishes")
    const { coord: { lat, lng } } = useContext(Coordinates)
    const [searchQuery, setsearchQuery] = useState([])
    const [dishes, setDishes] = useState([])
    const [restaurantData, setRestaurantData] = useState([])



    function handleFilterBtn(filterName) {
        setActiveBtn(activeBtn === filterName ? activeBtn : filterName)
        // console.log(activeBtn);
    }

    async function fetchDishes() {
        let data = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0`)
        let res = await data.json()
        let finalData = (
            (res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards)
        );
        setDishes(finalData)
        // console.log(finalData);



    }
    async function fetchRestaurants() {
        let data = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0&selectedPLTab=RESTAURANT`)
        let res = await data.json()
        let finalData = (
            (res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards)
        )
        setRestaurantData(finalData)
        // console.log(finalData);

    }
    function handleSearchQuery(e){
        let val=e.target.value.trim()
        if(e.keyCode==13){
            console.log(val)
            setsearchQuery(val)
        }
    }


    useEffect(() => {
        if (searchQuery === "") {
            return
        }
        fetchDishes()
        fetchRestaurants()
    }, [searchQuery])








    return (
        <div className="w-full md:w-[800px] mx-auto">
            <input type="text" placeholder="Search for Restaurant and food" className="border-2 px-10 py-3 focus:outline-none" 
            // onChange={(e) => setsearchQuery(e.target.value)} 
            onKeyDown={handleSearchQuery}
            />

            <div className="my-7 flex flex-wrap  gap-3  ">
                {
                    filterOptions.map((filterName, i) => (
                        <button key={i} onClick={() => handleFilterBtn(filterName)} className={"filterBtn flex gap-2 " + (activeBtn === filterName ? "active" : "")}>
                            <p>{filterName}</p>
                        </button>
                    ))
                }
            </div>

            <div className="w-full md:w-[800px] mt-5  grid grid-cols-1 md:grid-cols-2   bg-[#f4f5f7]">
                {
                    activeBtn === "Dishes"
                        ?
                        (dishes&& dishes.map((data, i) => <Dishes key={i} data={data} />))
                        :
                        (restaurantData&& restaurantData.map((data,i) => <SearchRestaurant data={data} key={i} />))
                }
            </div>

        </div>
    )
}

export default Search
