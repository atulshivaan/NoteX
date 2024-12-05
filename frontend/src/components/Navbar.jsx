import { H1 } from "../context/AuthContext"


const Navbar = () => {
    const {user} = H1()
  return (
    <div className="flex items-center text-black justify-between bg-red-500 px-5 pt-2 pb-2 ">
      <p>Welcome {user.name}</p>
      <button className="px-4 py-2 text-white  bg-red-600 border rounded-md  hover:bg-red-600">Logout</button>
    </div>
  )
}

export default Navbar
