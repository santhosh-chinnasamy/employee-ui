import { notification } from "antd";

export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
  setTimeout(() => {
    window.location.href = "/login";
  }, 1000);
  return;
}

export function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    const status = response.status;
    let message = (data && data.message) || response.statusText;

    if (!response.ok) {
      if (status === 401) {
        // auto logout if 401 response returned from api
        logout();
        notification.error({ message });
      }

      const error = (data && data.message) || response.statusText;
      notify(status, error);
      return Promise.reject(error);
    } else {
      if (message !== "OK") notify(status, message);
      return data;
    }
  });
}

function notify(status, message) {
  switch (status) {
    case 200:
      notification.success({ message: message || "Saved Successfully" });
      break;
    case 201:
      notification.success({ message: message || "Saved Successfully" });
      break;
    case 404:
      notification.warn({ message: message || "Not Found" });
      break;
    case 422:
      notification.warn({ message: message || "Failed to save record" });
      break;
    case 429:
      notification.warn({ message: message || "Too Many Request" });
      break;
    case 400:
      notification.error({ message: message || "Bad Request" });
      break;
    case 500:
      notification.error({ message: message || "Internal Server Error" });
      break;
    case 502:
      notification.error({
        message: message || "Could not fetch data from server",
      });
      break;
    default:
      notification.error("Something is not right");
  }
}
