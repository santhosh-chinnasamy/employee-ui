export function authHeader() {
  // return authorization header with jwt token
  const jwt = JSON.parse(localStorage.getItem("jwt"));

  if (jwt) {
    return { Authorization: `Bearer ${jwt}` };
  } else {
    return {};
  }
}
