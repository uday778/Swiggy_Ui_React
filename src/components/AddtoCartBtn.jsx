import toast from "react-hot-toast";
import { addTocart } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";



function AddtoCartBtn({info,resInfo,handleIsDiffRes}) {
    
    
    const cartData = useSelector((state) => state.cartSlice.cartItems)
    const dispatch = useDispatch()
    const getResInfoFromLocalStorage = useSelector((state) => state.cartSlice.resInfo)
 


    function handleAddTocart() {
        const isAdded = cartData?.length > 0 && cartData.find((data) => data.id === info?.id);
        if (!isAdded) {
          if (getResInfoFromLocalStorage.name === resInfo?.name || getResInfoFromLocalStorage.length === 0) {
            dispatch(addTocart({ info, resInfo }))
            toast.success("Item Added To Cart")
          }
          else {
            
            toast.error("Different Restaurant Item")
            handleIsDiffRes()
          }
        }
        else {
          toast.error("Already Added"
          )
        }
      }
  return (
    <div>
      <button className="bg-white absolute bottom-[-20px] left-1/2  -translate-x-1/2 text-lg text-green-700 font-bold rounded-xl border px-10 py-2 drop-shadow  "
            onClick={handleAddTocart}
          >Add</button>
    </div>
  )
}

export default AddtoCartBtn
