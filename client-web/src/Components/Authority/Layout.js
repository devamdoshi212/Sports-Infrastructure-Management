import React, { useState } from "react";
import {
  Outlet,
  NavLink,
  Link,
  useNavigate,
  useLoaderData,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserActions } from "../../store/UserData";
import { FetchDistrict } from "../../API/FetchDistrict";
import Swal from "sweetalert2";
const Layout = () => {
  const dispatch = useDispatch();
  dispatch(UserActions.getuserdata(useLoaderData()));
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You redirect to Login page...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };
  FetchDistrict();

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <aside className="relative bg-[#3d68ff] h-screen w-64 hidden sm:block shadow-xl">
        <div className="p-6">
          <a
            href="index.html"
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
          >
            Authority
          </a>
        </div>
        <nav className=" text-base font-semibold pt-3">
          <Link
            to={"profile"}
            className="flex items-center active-nav-link text-white py-4 pl-6 nav-item gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            Profile
          </Link>
          <Link
            to={"/authority"}
            className="flex items-center active-nav-link text-white py-4 pl-6 nav-item gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
              />
            </svg>
            Dashboard
          </Link>
          <Link
            className="flex items-center active-nav-link text-white py-4 pl-6 nav-item gap-2"
            to={"allsportscomplex"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
              />
            </svg>
            Sports Complex
          </Link>
          <Link
            className="flex items-center active-nav-link text-white py-4 pl-6 nav-item gap-2"
            to={"allmanager"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
              />
            </svg>
            Manager
          </Link>
          {/* <Link className="flex items-center active-nav-link text-white py-4 pl-6 nav-item gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
              />
            </svg>
            Sports
          </Link> */}
          <div className="p-6">
            {/* <NavLink to={"addmanager"}>
              <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                <i className="fas fa-plus mr-3"></i>Add Manager
              </button>
            </NavLink>
            <NavLink to={""}>
              <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                <i className="fas fa-plus mr-3"></i>Complex Details
              </button>
            </NavLink>
            <NavLink to={""}>
              <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                <i className="fas fa-plus mr-3"></i>Sports/Facilities
              </button>
            </NavLink> */}
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
                onClick={handleLogout}
                className="realtive z-10 w-20 rounded-lg h-12 bg-white overflow-hidden border-4 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
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
              <svg
                style={{ display: isOpen ? "none" : "block" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                style={{ display: isOpen ? "block" : "none" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
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
              onClick={handleLogout}
              className="flex items-center active-nav-link text-white py-2 pl-4 nav-item"
            >
              Logout
            </Link>
            <div>
              <NavLink>
                <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                  <i className="fas fa-plus mr-3"></i> New Place
                </button>
              </NavLink>
              <NavLink>
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
