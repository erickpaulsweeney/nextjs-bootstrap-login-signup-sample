export function removeToken() {
  window.localStorage.removeItem("token");
  window.sessionStorage.removeItem("token");
}

export function getToken() {
  return (
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token")
  );
}
