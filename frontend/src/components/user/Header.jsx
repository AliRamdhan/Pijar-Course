import { useEffect, useState } from "react";
import { Button, Dropdown } from "flowbite-react";
import Hamburger from "hamburger-react";
import { Link, useLocation } from "react-router-dom";
import UserServices from "../../services/user.service";
import { logout } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { FiLogOut, FiSettings, FiUser, FiShoppingBag } from "react-icons/fi";
const Header = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [navbarStatus, setNavbarStatus] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    UserServices.getUserBoard().then((response) => {
      setUser(response.data.User);
    });
  }, []);

  const handleLogout = async (e) => {
    try {
      const a = confirm("logout?");
      if (a == true) {
        const response = await dispatch(logout());
        if (response) {
          alert("logout successful");
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="2xl:w-[1400px] xl:w-[1100px] lg:w-[900px] hidden lg:flex flex-row justify-between items-center py-4">
        <Link
          to={`/`}
          className="text-3xl font-bold flex flex-col bg-gradient-to-r from-gray-700 to-gray-900 text-transparent bg-clip-text"
        >
          Pijar Course
          <span className="text-[16px] text-slate-800 font-normal">
            Upgrade cara belajar mu
          </span>
        </Link>

        <nav className="w-3/5">
          <ul className="flex items-center gap-x-20">
            <li>
              <Link
                to="/dashboard"
                className={`text-[17px] font-medium text-slate-900 hover:text-gray-600 transition-all ${
                  location.pathname === "/dashboard"
                    ? "px-2.5 py-1 border-b-2 border-gray-600"
                    : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/course/my"
                className={`text-[17px] font-medium text-slate-900 hover:text-gray-600 transition-all duration-300 ${
                  location.pathname.startsWith("/course/my")
                    ? "px-2.5 py-1 border-b-2 border-gray-600"
                    : ""
                }`}
              >
                My Courses
              </Link>
            </li>
            <li>
              <Link
                to={`/blogs/all`}
                className={`text-[17px] font-medium text-slate-900 hover:text-gray-600 ${
                  location.pathname.startsWith("/blogs/all")
                    ? "px-2.5 py-1 border-b-2 border-gray-600"
                    : ""
                }`}
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex gap-x-5">
          {user && (
            <Dropdown label={user.User_username} inline>
              <Dropdown.Header>
                <span className="block text-sm">{user.User_username}</span>
                <span className="block truncate text-sm font-medium">
                  {user.User_email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item icon={FiUser}>
                <Link to="/profile">Profile</Link>
              </Dropdown.Item>
              <Dropdown.Item icon={FiSettings}>
                <Link to="/settings">Settings</Link>
              </Dropdown.Item>
              <Dropdown.Item icon={FiShoppingBag}>
                <Link to="/course/history">History</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item icon={FiLogOut}>
                <button onClick={handleLogout}>Sign out</button>
              </Dropdown.Item>
            </Dropdown>
          )}
        </div>
      </section>
      <div
        className={`w-full lg:hidden flex flex-row justify-between items-center py-2 bg-white z-10 px-8 es:px-3 ${
          navbarStatus ? "shadow-none" : "shadow-lg"
        }`}
      >
        <a
          href="#home"
          className="md:text-3xl text-2xl es:text-[20px] text-blue-600 font-bold flex flex-col"
        >
          Pijar Pelajar
          <span className="md:text-[16px] text-sm text-slate-800 font-normal">
            Upgrade cara belajar mu
          </span>
        </a>
        <Hamburger
          size={26}
          onToggle={(toggled) => {
            if (toggled) {
              setNavbarStatus(true);
            } else {
              setNavbarStatus(false);
            }
          }}
          toggled={isOpen}
          toggle={setOpen}
          color="#2563eb"
        />
      </div>
      <section
        className={`w-full ${
          navbarStatus ? "flex" : "hidden"
        } justify-center items-center bg-white py-5 shadow-lg`}
      >
        <div></div>
        <nav className="w-full px-10">
          <ul className="flex flex-col items-center gap-y-4">
            <li className="">
              <a
                href="#courses"
                className="text-[17px] font-semibold text-slate-900 hover:text-gray-600"
              >
                Courses{" "}
                <span className="py-1 px-2 bg-blue-600 rounded-sm text-white font-semibold text-[13px]">
                  NEW
                </span>
              </a>
            </li>
            <li className="">
              <a
                href="#mentor"
                className="text-[17px] font-semibold text-slate-900 hover:text-gray-600 transition-all"
              >
                Mentor
              </a>
            </li>
            <li className="">
              <a
                href="#faq"
                className="text-[17px] font-semibold text-slate-900 hover:text-gray-600 transition-all"
              >
                FAQ
              </a>
            </li>
            <li className="w-full">
              <Button
                onClick={() => props.setOpenModal("default")}
                className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-600 px-4 rounded-full font-semibold text-white border-0 focus:ring-0"
              >
                Get In Touch
              </Button>
            </li>
            <li className="w-full">
              <Link to="/login">
                <Button className="w-full bg-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 px-4 rounded-full font-medium text-blue-600 hover:text-white border-[1px] border-blue-600 hover:border-white focus:ring-0">
                  Masuk
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
};

export default Header;
