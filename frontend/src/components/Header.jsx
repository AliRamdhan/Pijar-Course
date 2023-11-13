import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Textarea,
  Label,
  TextInput,
  Dropdown,
} from "flowbite-react";
import Hamburger from "hamburger-react";
import { Link, useLocation } from "react-router-dom";
import UserServices from "../services/user.service";
import { logout } from "../actions/auth";
import { useDispatch } from "react-redux";
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
const Header = () => {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
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
        alert("logout successful");
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

        <nav>
          <ul className="flex items-center gap-x-20">
            <li>
              <Link
                to="/"
                className={`text-[17px] font-medium text-slate-900 hover:text-gray-600 transition-all ${
                  location.pathname === "/"
                    ? "px-2.5 py-1.5 border-b-2 border-gray-600"
                    : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/course/all"
                className={`text-[17px] font-medium text-slate-900 hover:text-gray-600 transition-all ${
                  location.pathname.startsWith("/course/all")
                    ? "px-2.5 py-1.5 border-b-2 border-gray-600"
                    : ""
                }`}
              >
                Courses{" "}
                <span className="py-1 px-2 bg-gray-600 rounded-sm text-white font-semibold text-[13px]">
                  NEW
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/blogs/all"
                className={`text-[17px] font-medium text-slate-900 hover:text-gray-600 transition-all ${
                  location.pathname.startsWith("/blogs")
                    ? "px-2.5 py-1.5 border-b-2 border-gray-600"
                    : ""
                }`}
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex gap-x-5">
          {user ? (
            <div className="flex w-full gap-10">
              <Link
                to="/dashboard"
                className="bg-transparent hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-600 hover:text-white px-4 rounded-md font-medium text-gray-800 hover:border-white focus:ring-0 py-2"
              >
                Dashboard
              </Link>
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
                <Dropdown.Divider />
                <Dropdown.Item icon={FiLogOut}>
                  <button onClick={handleLogout}>Sign out</button>
                </Dropdown.Item>
              </Dropdown>
            </div>
          ) : (
            <>
              <button
                onClick={() => props.setOpenModal("default")}
                className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-600 hover:to-gray-600 px-4 rounded-full font-medium text-white border-0 focus:ring-0 py-2"
              >
                Get In Touch
              </button>
              <Link
                to="/login"
                className="bg-transparent hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-800 px-6 rounded-full font-medium text-gray-800 hover:text-white border-[1px] border-gray-600 hover:border-white focus:ring-0 py-2"
              >
                Masuk
              </Link>
            </>
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
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Get in touch with us</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form className="flex w-full flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email2" value="Email" />
                </div>
                <TextInput
                  id="email2"
                  placeholder="example@gmail.com"
                  required
                  shadow
                  type="email"
                  autoComplete="off"
                />
              </div>
              <div id="textarea">
                <div className="mb-2 block">
                  <Label htmlFor="comment" value="Your message" />
                </div>
                <Textarea
                  className="resize-none focus:border-blue-600"
                  id="comment"
                  placeholder="Leave a comment..."
                  required
                  rows={4}
                />
              </div>
              <Button
                className="mt-5 bg-blue-600 enabled:hover:bg-blue-700"
                type="submit"
              >
                Kirim
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
