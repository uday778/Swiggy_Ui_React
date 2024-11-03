import { signInWithPopup, signOut } from "firebase/auth"
import { auth, provider } from "../config/firebaseAuth"
import { useDispatch, useSelector } from "react-redux";
import { addUserData, removeUserData } from "../utils/authSlice";
import { useNavigate } from "react-router-dom";





function SignIn() {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const userData = useSelector((state) => state.authSlice.userData);

  async function handleAuth(){
    let data = await signInWithPopup(auth, provider)
    const userData={
      name:data.user.displayName,
      photo:data.user.photoURL
    }
    dispatch(addUserData(userData))
    navigate("/")
  }

  async function handleLogOut() {
    await signOut(auth)
    dispatch(removeUserData())
  }


  return (
    <div>
      Login
      <button
      onClick={handleAuth}
      className="my-5 w-full text-2xl p-5 bg-[#fc8019] text-white">
        Login with Google
      </button>

      {
        userData &&<button
      onClick={handleLogOut}
      className="my-5 w-full text-2xl p-5 bg-[#fc8019] text-white">
        logout
      </button>
      }
      
    </div>
  )
}

export default SignIn
