import { authHeader } from "./auth-header";
export * from "./handle-response";
export * from "./filter-params";

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (localStorage.getItem("user")) {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  } else {
    return false;
  }
};

export const requestHeaders = (isFormData) => {
  const defaultHeader = authHeader();
  return isFormData
    ? defaultHeader
    : {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...defaultHeader,
      };
};

export const setCookie = (key, value, days = 0, hours = 0) => {
  let date = new Date();
  if (days || hours) {
    date.setTime(
      date.getTime() + hours * 60 * 60 * 1000 + 24 * 60 * 60 * 1000 * days
    );
    document.cookie =
      key + "=" + value + ";path=/;expires=" + date.toGMTString();
  } else {
    document.cookie = key + "=" + value + ";path=/";
  }
};
