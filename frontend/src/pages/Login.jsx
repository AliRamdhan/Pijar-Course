import "../global.css";
import { Flowbite, TextInput, Checkbox, Label, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible } from "react-icons/ai";
import log from "/assets/signin.jpg";
import { useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { login } from "../actions/auth";
const Login = () => {
  const dispatch = useDispatch();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  // const user = useSelector((state) => state.auth.user); //ambil dari reducer itu token

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the login action directly
      const response = await dispatch(login(usernameOrEmail, password));
      if (response) {
        alert("Login successful");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const customTheme = {
    textInput: {
      field: {
        rightIcon: {
          base: "cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3",
          svg: "h-5 w-5 text-gray-600 dark:text-gray-500",
        },
        input: {
          sizes: {
            sm: "p-2 sm:text-xs",
            md: "p-3 text-sm",
          },
          colors: {
            gray: "bg-gray-50 text-gray-900 focus:border-gray-400 focus:ring-[2px] focus:ring-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-50",
          },
        },
      },
    },
    checkbox: {
      root: {
        base: "h-4 w-4 rounded focus:ring-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 bg-gray-100",
        color: {
          default:
            "cursor-pointer focus:ring-gray-500 dark:ring-offset-gray-500 dark:focus:ring-gray-500 text-gray-500",
        },
      },
    },
    button: {
      color: {
        blue: "text-white bg-gradient-to-r from-gray-800 to-blue-950",
      },
    },
  };

  return (
    <div id="login" className="w-full h-screen grid grid-cols-12">
      {/* <div className="col-span-5 h-screen bg-[url('/assets/loginBanner.png')] bg-cover bg-center bg-no-repeat hidden md:block"></div> */}
      <div className="col-span-5 md:block relative h-screen">
        <img
          src={log}
          className="h-5/6 bg-cover bg-center bg-no-repeat"
          alt="Login Page"
        />
        <div className="w-full text-center mt-4">
          <p className="text-2xl font-semibold text-gray-700">
            Belajar lebih mantap dengan Pijar Course
          </p>
          <p className="text-lg font-normal text-gray-600 tracking-wide">
            Amunisi paket belajar lengkap , video , module , serta source code
          </p>
        </div>
      </div>
      <div className="col-span-12 md:col-span-7 h-screen bg-gradient-to-br from-gray-600 to-gray-800 flex justify-center items-center">
        <div className="w-full md:w-96 lg:w-1/2 flex flex-col gap-y-10 px-3">
          <div className="flex flex-col gap-y-2">
            <p className="text-3xl md:text-4xl text-white font-bold">
              Pijar Pelajar
            </p>
            <p className="text-md text-white font-normal">
              Selamat datang kembali, silahkan login terlebih dahulu
            </p>
          </div>
          <form className="w-full" onSubmit={handleLogin}>
            <ul className="w-full flex flex-col gap-y-6">
              <li>
                <Flowbite theme={{ theme: customTheme }}>
                  <TextInput
                    className="w-full"
                    type="text"
                    placeholder="Username or Email"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    autoComplete="off"
                    autoFocus
                  />
                </Flowbite>
              </li>
              <li>
                <Flowbite theme={{ theme: customTheme }}>
                  <TextInput
                    className="w-full"
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    rightIcon={AiFillEyeInvisible}
                  />
                </Flowbite>
              </li>
              <li className="flex items-center gap-2">
                <Flowbite theme={{ theme: customTheme }}>
                  <Checkbox id="rememberMe" />
                  <Label className="text-white" htmlFor="rememberMe">
                    <p>ingat saya</p>
                  </Label>
                </Flowbite>
              </li>
              <li>
                <Flowbite theme={{ theme: customTheme }}>
                  <Button type="submit" className="w-full" color="blue">
                    Sign in
                  </Button>
                </Flowbite>
              </li>
              <li>
                <p className="text-white">
                  Belum punya akun?{" "}
                  <Link to="/register" className="font-medium">
                    Daftar
                  </Link>
                </p>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  register: (usernameOremail, password) =>
    dispatch(login(usernameOremail, password)),
});

// Connect your component with mapDispatchToProps
export default connect(null, mapDispatchToProps)(Login);
