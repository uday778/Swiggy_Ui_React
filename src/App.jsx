import { Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Head from "./components/Head";
import RestaurantMenu from "./components/RestaurantMenu";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartContext, Coordinates } from "./context/contextApi";
import Cart from "./components/Cart";






function App() {

  const [coord, setCoord] = useState({ lat: 17.4375084, lng: 78.4482441 })


  // const [cartData, setCartData] = useState([])

  const visible = useSelector((state) => state.toogleSlice.searchToogle)
  const loginvisible = useSelector((state) => state.toogleSlice.loginToggle)

//   async function get_data_from_local_Storage() {
//     // Retrieve and parse the data from local storage
//     let dataa = JSON.parse(localStorage.getItem("cartData")) ;
    
//     // Set the cart data state
//     setCartData(dataa);
// }

// useEffect(() => {
//     get_data_from_local_Storage();
// }, []);
  return (
   
      <Coordinates.Provider value={{ coord, setCoord }}>
        <div className={visible|| loginvisible ? "max-h-screen overflow-hidden" : ""}>
          <Routes>
            <Route path="/" element={<Head />}>
              <Route path="/" element={<Body />} />
              <Route path="/restaurantmenu/:id" element={<RestaurantMenu />} />
              <Route path="/cart" element={<Cart />} />
              
              <Route path="*" element={<h1>comming soon....</h1> } />
            </Route>
          </Routes>
        </div>
      </Coordinates.Provider>
    
  );
}

export default App;
