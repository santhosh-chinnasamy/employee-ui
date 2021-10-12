import * as config from "config";
import { requestHeaders, logout, handleResponse, filterParams } from "utils";

export const employeeService = {
  login,
  logout: logout,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function login({ email, password }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${config.apiHost}/auth/login`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      localStorage.setItem("user", JSON.stringify(data.employee));
      localStorage.setItem("jwt", JSON.stringify(data.auth_token));
      return data;
    });
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: requestHeaders(),
  };

  return fetch(
    `${config.apiHost}/employees?${filterParams()}`,
    requestOptions
  ).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: requestHeaders(),
  };

  return fetch(`${config.apiHost}/employees/${id}`, requestOptions).then(
    handleResponse
  );
}

function create(employee) {
  const requestOptions = {
    method: "POST",
    headers: requestHeaders(),
    body: JSON.stringify(employee),
  };

  return fetch(`${config.apiHost}/employees/`, requestOptions).then(
    handleResponse
  );
}

function update(id, employee) {
  const requestOptions = {
    method: "PATCH",
    headers: requestHeaders(),
    body: JSON.stringify(employee),
  };

  return fetch(`${config.apiHost}/employees/${id}`, requestOptions).then(
    handleResponse
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: requestHeaders(),
  };

  return fetch(`${config.apiHost}/employees/${id}`, requestOptions).then(
    handleResponse
  );
}
