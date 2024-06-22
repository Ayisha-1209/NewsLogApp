import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { useSelector } from "react-redux";
import LogoutBtn from "./Header/LogoutButton";

function TopStag() {
  const authStatus = useSelector((state) => state.auth.status);

  // Render different UI based on authentication status
  return (
    <header>
      {/* Top bar with title */}
      <div className="flex flex-row lg:mx-5 md:mx-5 sm:mx-5 space-y-6 sm:space-y-0 sm:py-1 justify-evenly items-center">
        <h3 className="font-bold text-sm font-mono ml-2 mt-2 !text-red-50 sm:text-xs sm:w-full sm:m-0">
          Stay updated with NewsLog!
        </h3>
        <h3 className="font-bold text-sm font-mono ml-2 mt-2 !text-red-50 sm:hidden">
          Fearless, Independant, Reader-Funded!
        </h3>
        {/* Conditional rendering based on authentication status */}
        {authStatus ? (
          <Link to="/login">
            <LogoutBtn />
          </Link>
        ) : (
          <div className="flex flex-row gap-3 sm:gap-1 sm:m-0">
            <Link to="/login">
              <Button
                className="rounded-full text-white-A700 font-bold hover:variant-outline sm:size-8"
                size="lg"
                shape="round"
                color="red_50"
              >
                Login
              </Button>
            </Link>

            <Link to="/signup">
              <Button
                className="rounded-full text-white-A700 font-bold hover:variant-outline sm:size-8"
                size="lg"
                shape="round"
                color="red_50"
              >
                Signup
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Divider line */}
      <div className="my-2 border-y-4 border-black w-full"></div>

      {/* Logo */}
      <div className="mr-4 flex flex-row items-start md:mt-8 lg:mt-8 sm:mt-2 sm:mb-2 mb-2">
        <Link to="/">
          <img src="logo.png" className="w-[30%] mx-auto mb-0" alt="logo" />
        </Link>
      </div>

      {/* Name */}
      <div className="bg-white pb-2 pt-2 border-t-2 border-b-2 border-black-900">
        <img src="name.png" alt="name" className="w-44 mx-auto" />
      </div>
    </header>
  );
}

export default TopStag;
