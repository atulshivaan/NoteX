import { H1 } from "../context/AuthContext"


const Navbar = () => {
    const {user} = H1()
  return (
    <div className="flex items-center text-black justify-between bg-red-500 px-5 pt-2 pb-2 ">
      <p>Welcome {user.name}</p>
      <button className="px-4 py-1 bg-red-900 rounded hover:bg-red-400">Logout</button>
    </div>
  )
}

export default Navbar
