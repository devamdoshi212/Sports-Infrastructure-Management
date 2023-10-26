import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-gray-100 font-family-karla flex">
      <aside className="relative bg-[#3d68ff] h-screen w-64 hidden sm:block shadow-xl">
        <div className="p-6">
          <a
            href="index.html"
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
          >
            Admin
          </a>
        </div>
        <nav className=" text-base font-semibold pt-3">
          <Link
            to={"/admin"}
            className="flex items-center active-nav-link text-white py-4 pl-6 nav-item"
          >
            <i className="fas fa-tachometer-alt mr-3"></i>
            Dashboard
          </Link>
          <Link
            to={""}
            className="flex items-center active-nav-link text-white py-4 pl-6 nav-item"
          >
            <i className="fas fa-tachometer-alt mr-3"></i>
            Authority
          </Link>
          <Link
            to={""}
            className="flex items-center active-nav-link text-white py-4 pl-6 nav-item"
          >
            <i className="fas fa-tachometer-alt mr-3"></i>
            Sports
          </Link>
          <div className="p-6">
            <NavLink to={""}>
              <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                <i className="fas fa-plus mr-3"></i> New Authority
              </button>
            </NavLink>
            <NavLink to={""}>
              <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                <i className="fas fa-plus mr-3"></i> New Sports Complex
              </button>
            </NavLink>
            <NavLink to={""}>
              <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                <i className="fas fa-plus mr-3"></i> New Sports/Facilities
              </button>
            </NavLink>
          </div>
        </nav>
      </aside>

      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <header className="w-full items-center bg-[#252525] py-2 px-6 hidden sm:flex">
          <div className="w-1/2"></div>
          <div
            x-data="{ isOpen: false }"
            className="relative w-1/2 flex justify-end"
          >
            <NavLink to={""}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="realtive z-10 w-20 rounded-lg h-12 bg-white overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
              >
                Logout
              </button>
            </NavLink>
            <button
              style={{ display: isOpen ? "block" : "none" }}
              onClick={() => setIsOpen(false)}
              className="h-full w-full fixed inset-0 cursor-default"
            ></button>
            {/* <div
              style={{ display: isOpen ? "block" : "none" }}
              className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16"
            >
              <a
                href="#"
                className="block px-4 py-2 account-link hover:text-white"
              >
                Account
              </a>
              <a
                href="#"
                className="block px-4 py-2 account-link hover:text-white"
              >
                Support
              </a>
              <a
                href="#"
                className="block px-4 py-2 account-link hover:text-white"
              >
                Sign Out
              </a>
            </div> */}
          </div>
        </header>

        <header
          x-data="{ isOpen: false }"
          className="w-full bg-[#3d68ff] py-5 px-6 sm:hidden"
        >
          <div className="flex items-center justify-between">
            <Link className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
              Admin
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-3xl focus:outline-none"
            >
              <i
                style={{ display: isOpen ? "none" : "block" }}
                className="fas fa-bars"
              ></i>
              <i
                style={{ display: isOpen ? "block" : "none" }}
                className="fas fa-times"
              ></i>
            </button>
          </div>

          <nav className={isOpen ? "flex flex-col" : "hidden"}>
            <Link
              to={""}
              className="flex items-center active-nav-link text-white py-2 pl-4 nav-item"
            >
              <i className="fas fa-tachometer-alt mr-3"></i>
              Dashboard
            </Link>
            <Link
              to={""}
              className="flex items-center active-nav-link text-white py-2 pl-4 nav-item"
            >
              <i className="fas fa-tachometer-alt mr-3"></i>
              Logout
            </Link>
            <div>
              <NavLink to={""}>
                <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                  <i className="fas fa-plus mr-3"></i> New Place
                </button>
              </NavLink>
              <NavLink to={""}>
                <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                  <i className="fas fa-plus mr-3"></i> New Blog
                </button>
              </NavLink>
              <NavLink>
                <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                  <i className="fas fa-plus mr-3"></i> New Category
                </button>
              </NavLink>
            </div>
          </nav>
        </header>

        <div className="w-full overflow-x-hidden border-t flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
