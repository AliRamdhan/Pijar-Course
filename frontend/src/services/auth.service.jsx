import axios from "axios";

const API_URL_AUTH = process.env.URL_API_AUTH;

class AuthService {
  async login(usernameOrEmail, password) {
    let isEmail = usernameOrEmail.includes("@");

    try {
      const data = isEmail
        ? { User_email: usernameOrEmail, User_password: password }
        : { User_username: usernameOrEmail, User_password: password };

      const response = await axios.post(API_URL_AUTH + "/login", data);

      if (response.data.Token) {
        localStorage.setItem(
          process.env.SECRET_KEY_JWT,
          JSON.stringify(response.data.Token)
        );
        return response;
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle the case where the email and password are invalid
        throw new Error("Email and password are invalid");
      } else {
        // Handle other errors
        throw error;
      }
    }
  }

  async logout() {
    return new Promise((resolve, reject) => {
      try {
        localStorage.removeItem(process.env.SECRET_KEY_JWT);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async register(username, email, password, firstname, lastname, phone, role) {
    try {
      const response = await axios.post(API_URL_AUTH + "/register", {
        User_username: username,
        User_email: email,
        User_password: password,
        User_firstname: firstname,
        User_lastname: lastname, // Add this line
        User_phoneNumber: phone, // Add this line
        User_role: role,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle the case where the email and password are invalid
        throw new Error("Email and password are invalid");
      } else {
        // Handle other errors
        throw error;
      }
    }
  }
}

export default new AuthService();
