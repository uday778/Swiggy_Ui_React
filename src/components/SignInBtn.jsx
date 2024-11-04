import { signInWithPopup, signOut } from "firebase/auth"
import { auth, provider } from "../config/firebaseAuth"
import { useDispatch, useSelector } from "react-redux";
import { addUserData, removeUserData } from "../utils/authSlice";
import { useNavigate } from "react-router-dom";
import { toogleLogin } from "../utils/toogleSlice";





function SignInBtn() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.authSlice.userData);

  async function handleAuth() {
    let data = await signInWithPopup(auth, provider)
    const userData = {
      name: data.user.displayName,
      photo: data.user.photoURL
    }
    dispatch(addUserData(userData))
    dispatch(toogleLogin())
    navigate("/")
  }

  async function handleLogOut() {
    await signOut(auth)
    dispatch(removeUserData())
    dispatch(toogleLogin())
  }


  return (
    <>

      {
        userData ?
          (<button
            onClick={handleLogOut}
            className="w-full text-xl bg-[#fc8019] text-white p-5 mt-5">
            logout
          </button>)
          :
          (<button
            onClick={handleAuth}
            className="w-full text-xl bg-[#fc8019] text-white p-5 mt-5" >Login With Google</button>)
      }

    </>
  )
}

export default SignInBtn
