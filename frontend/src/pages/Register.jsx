import "../global.css";
import { Flowbite, TextInput, Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible } from "react-icons/ai";
import reg from "/assets/signup.jpg";
import { useState } from "react";
import { register } from "../actions/auth";
import { connect } from "react-redux";
const Register = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setretypePassword] = useState("");
  const [firstname, setFirstname] = useState("sssssssssss");
  const [lastname, setLastname] = useState("dddddd");
  const [phone, setPhone] = useState("08934254353");
  const [role, setRole] = useState(3);

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      if (password === retypePassword) {
        // Dispatch the register action
        await dispatch(
          register(username, email, password, firstname, lastname, phone, role)
        );

        // Assuming the register action updates the state with REGISTER_SUCCESS
        alert("Registration successful");
        window.location.href = "/login";
      } else {
        alert("Password not the same as retype");
      }
    } catch (error) {
      console.error(error); // Log the error to the console for more details
      alert("Registration failed. Please check the console for details.");
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

    button: {
      color: {
        blue: "text-white bg-gradient-to-r from-gray-800 to-gray-950",
      },
    },
  };

  return (
    <div id="login" className="w-full h-screen grid grid-cols-12">
      <div className="col-span-5 md:block relative h-screen">
        <img
          src={reg}
          className="h-4/5 bg-cover bg-center bg-no-repeat"
          alt="Register Page"
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
              Pijar Course
            </p>
            <p className="text-md text-white font-normal">
              Selamat datang di Pijar Course. Daftarkan dirimu untuk mendapatkan
              course terbaik
            </p>
          </div>
          <form className="w-full" onSubmit={handleRegistration}>
            <ul className="w-full flex flex-col gap-y-6">
              <li>
                <Flowbite theme={{ theme: customTheme }}>
                  <TextInput
                    className="w-full"
                    type="text"
                    placeholder="Username"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                  />
                </Flowbite>
              </li>
              <li>
                <Flowbite theme={{ theme: customTheme }}>
                  <TextInput
                    className="w-full"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    rightIcon={AiFillEyeInvisible}
                  />
                </Flowbite>
              </li>
              <li>
                <Flowbite theme={{ theme: customTheme }}>
                  <TextInput
                    className="w-full"
                    type="password"
                    placeholder="Retype Password"
                    value={retypePassword}
                    onChange={(e) => setretypePassword(e.target.value)}
                    autoComplete="off"
                    rightIcon={AiFillEyeInvisible}
                  />
                </Flowbite>
              </li>
              <li>
                <Flowbite theme={{ theme: customTheme }}>
                  <Button type="submit" className="w-full" color="blue">
                    Sign up
                  </Button>
                </Flowbite>
              </li>
              <li>
                <p className="text-white">
                  Sudah punya akun?{" "}
                  <Link to="/login" className="font-medium">
                    Masuk
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

// export default connect(null, { register })(Register);
const mapDispatchToProps = (dispatch) => ({
  register: (username, email, password, firstname, lastname, phone, role) =>
    dispatch(
      register(username, email, password, firstname, lastname, phone, role)
    ),
});

// Connect your component with mapDispatchToProps
export default connect(null, mapDispatchToProps)(Register);
