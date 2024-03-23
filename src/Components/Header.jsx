import React from "react";
import { Link } from "react-router-dom";
import { IoSunny } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { MdPlaylistAdd } from "react-icons/md";
function Header() {
  document.body.style.overflow = 'auto'
  return (
    <>
    {/* Header  */}

      <header className=" w-screen bg-gray-800 h-12 grid grid-cols-[minmax(200px,_1fr)_200px]">
        <div className="flex px-4 p-2 gap-5">
          <Link to="/home/billgenerator">
            <MdPlaylistAdd className="text-white text-3xl" />
          </Link>
          <Link to="/home/customerlist">
            <HiUsers className="text-white text-3xl" />
          </Link>
        </div>
        {/* <div className="flex gap-3 justify-end p-2">
          <MdDarkMode className="text-white text-3xl" />
          <FaUserCircle className="text-white text-3xl" />
        </div> */}
      </header>



    {/* SideNav */}


      {/* <nav className="hidden w-[60px] z-50 md:block">
        <nav className="fixed z-50 grid grid-rows-[minmax(100px,_1fr)_100px] bg-gray-800 w-[65px] h-screen ">
          <div className=" px-4 p-2">
            <Link to="/home/billgenerator">
              <MdPlaylistAdd className="text-white text-3xl" />
            </Link>
            <Link to="/home/customerlist">
              <HiUsers className="text-white mt-5 text-3xl" />
            </Link>
          </div>

       
        </nav>
      </nav> */}
    </>
  );
}

export default Header;
