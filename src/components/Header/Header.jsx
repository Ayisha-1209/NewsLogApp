import React from "react";
import Container from "../Container";
import { useLocation, useNavigate } from "react-router-dom";
import Search from "../Search";

function Header({ request, setRequest }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/signup";

  // Handle click on navigation item
  const handleClick = (category) => {
    setRequest({ ...request, category });
    // Redirect to home if on login/signup page
    if (isLoginPage) {
      navigate("/");
    }
  };

  // Navigation items with categories and active state
  const navItems = [
    { name: "Home", category: "general", active: true },
    { name: "Business", category: "business", active: true },
    { name: "Entertainment", category: "entertainment", active: true },
    { name: "Health", category: "health", active: true },
    { name: "Science", category: "science", active: true },
    { name: "Sports", category: "sports", active: true },
    { name: "Technology", category: "technology", active: true },
  ];

  return (
    <header className="sm:hidden flex flex-row md:flex-col justify-between items-center w-full my-0 md:gap-10 sm:p-5 bg-red-50">
      <Container>
        <nav className="flex flex-row sm:flex-col justify-between items-center w-full md:w-auto ml-0 md:ml-5 sm:gap-4 md:gap-10">
          <div className="flex flex-col justify-center items-center w-full">
            {/* Navigation Items */}
            <ul className="flex flex-row items-center text-xs sm:text-sm md:text-md gap-2 sm:gap-4 md:gap-6">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => handleClick(item.category)}
                        className={`inline-block px-3 py-1 sm:px-4 sm:py-2 duration-200 hover:bg-red-100 text-xs sm:text-sm rounded-full font-bold text-white hover:!text-red-50 hover:scale-110 tracking-[0.12px] text-center disabled:bg-red-500 ${
                          item.category === request.category ? "bg-red-500" : ""
                        }`}
                        disabled={item.category === request.category}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              <li>
                <Search />
              </li>
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
