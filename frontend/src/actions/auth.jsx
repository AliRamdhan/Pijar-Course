// actions.js
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./type";

import AuthService from "../services/auth.service";

export const register = (
  username,
  email,
  password,
  firstname,
  lastname,
  phone,
  role
) => {
  return async (dispatch) => {
    try {
      const response = await AuthService.register(
        username,
        email,
        password,
        firstname,
        lastname,
        phone,
        role
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      // return Promise.resolve(); // You can remove this line if not needed
    } catch (error) {
      const response =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
        payload: response,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response,
      });

      // return Promise.reject(); // You can remove this line if not needed
    }
  };
};

export const login = (usernameOrEmail, password) => {
  return async (dispatch) => {
    try {
      const response = await AuthService.login(usernameOrEmail, password);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { User: response.data },
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return response.data.User;
    } catch (error) {
      const response =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
        payload: response,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      AuthService.logout();

      dispatch({
        type: LOGOUT,
      });
    } catch {
      const response =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  };
};
