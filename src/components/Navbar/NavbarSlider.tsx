"use client";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import users from "@/assests/user.png";
import teacher from "@/assests/teacher.png";
import course from "@/assests/learning.png";
import dashboard from "@/assests/dashboard.png";
import logout from "@/assests/logout.png";
import logo from "@/assests/logo.png";
import subscription from "@/assests/crown.png";
import planList from "@/assests/subscribe.png";
import paymentList from "@/assests/payment-method.png";
import createUser from"@/assests/event-creator.png";
import createTeacher from  "@/assests/course.jpg"

import { FaRegUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { logOut } from "@/Redux/ReduxFunction";
import Cookies from "js-cookie";
import { AppDispatch } from "@/Redux/store";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const navigation = [
  { label: "Dashboard", route: "/", iconPath: dashboard },
  { label: "Users List", route: "/users-list", iconPath: users },
  { label: "Teachers List", route: "/teachers-list", iconPath: teacher },
  { label: "Plan List", route: "/plan-list", iconPath: planList },
  { label: "Courses List", route: "/courses-list", iconPath: course },
  { label: "Create User", route: "/create-user", iconPath: createUser },
  { label: "Create Teacher", route: "/create-teacher", iconPath: createTeacher },
  { label: "Create Plan", route: "/create-plan", iconPath: subscription },

 
  { label: "Payment Info", route: "/payment-list", iconPath: paymentList },


];

const NavbarSlider = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const path = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  // const state= useSelector((state: RootState) => state.Auth);
  // console.log(name,"check name")

  const renderNavItem = (item: {
    label: string;
    route: string;
    iconPath: StaticImageData;
  }) => {
    const isActive = path === item.route;

    return (
      <li key={item.route} className="">
        <Link
          href={item.route}
          style={{
            background: "linear-gradient(90deg, #5B4BCD 0%, #C11F94 100%)",
          }}
          className={`relative flex items-center h-11 pr-6 py-[10px] pl-[24px] text-lg transition-all my-3 duration-300 ${
            isActive
              ? "poppins-semibold text-black   font-bold border-l-4 border-primary  bg-gradient-to-r from-primary/80 to-primary/60"
              : "text-white hover:text-black hover:font-bold border-l-4 border-transparent hover:border-primary hover:bg-gradient-to-r hover:from-primary/80 hover:to-primary/60"
          }`}
        >
          <Image
            src={item.iconPath}
            alt={item.label}
            width={20}
            height={20}
            className="ml-2"
          />
          {isOpen && (
            <span className="ml-3 text-[18px] tracking-wide truncate">
              {item.label}
            </span>
          )}
        </Link>
      </li>
    );
  };

  const route = useRouter();

  const handleLogOut = () => {
    dispatch(logOut());
    Cookies.remove("accessToken");
    route.push("/login");
  };

  return (
    <div className="relative flex">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute z-50 top-4 left-4 text-black p-2 rounded-md bg-white shadow-md"
      >
        {isOpen ? <IoClose size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar Content */}
      <div
        className={`h-screen bg-black duration-300 flex flex-col  font-inter ${
          isOpen ? "md:w-[320px] w-full" : "w-[80px]"
        }`}
      >
        {/* Logo */}
        {isOpen && (
          <Link
            href="/"
            className="flex justify-center mb-6 pt-[20px] pb-[15px]"
          >
            <Image
              width={120}
              height={120}
              className="max-w-32"
              src={logo}
              alt="logo_image"
            />
          </Link>
        )}

        <div
          className={`flex flex-col justify-between  h-screen pb-11 ${
            isOpen ? "pt-0" : "pt-14"
          }`}
        >
          {/* Navigation */}
          <div className="space-y-3">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              {navigation.map(renderNavItem)}
            </ul>
          </div>

          {/* Logout Button */}
          <div>
            <div className="flex px-8 space-x-2  text-md">
              <FaRegUser className="text-2xl text-primary" />
              {isOpen && (
                <p className="font-semibold  text-white lg:block hidden">
                  Hello, Admin
                </p>
              )}
            </div>
            <button
              onClick={handleLogOut}
              className={`relative flex items-center h-11 pr-6 py-[10px] pl-[24px] text-lg transition-all duration-300 poppins-semibold hover:bg-gradient-to-r hover:from-primary/80 hover:to-primary/60 to-white text-black border-l-4 ${
                isOpen ? "" : "justify-center"
              }`}
            >
              <Image
                src={logout}
                alt="logout"
                width={20}
                height={20}
                className="ml-2 "
              />
              {isOpen && (
                <span className="ml-3 text-[18px]  text-white tracking-wide truncate ">
                  Logout
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSlider;
