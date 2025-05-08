import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {

  const logout = () => {
    localStorage.removeItem("token")
    setToken("");
  }
  return (
      <div className='flex justify-between items-center pb-6'>
          <img src={assets.logo} className='w-[120px] sm:w-40' />
          <button onClick={logout} className='border border-gray-400 py-1 px-4 rounded-full sm:text-[18px] sm:px-5 hover:bg-gray-700 hover:text-white'>Logout</button>
    </div>
  )
}

export default Navbar