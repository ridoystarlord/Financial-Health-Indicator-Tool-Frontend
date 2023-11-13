export const getToken = () => {
  const key = "token" + "=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(key) === 0) {
      return cookie.substring(key.length, cookie.length);
    }
  }
  return false;
};

export const setToken = (token: string) => {
  const cookie = escape("token") + "=" + escape(token);
  document.cookie = cookie;
};

// export function removeToken() {
//   setToken("token" + " " + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
// }
export function removeToken() {
  const now = new Date();
  now.setMonth(now.getMonth() - 10);
  const expiration = now.toUTCString();
  const cookie = escape("token") + "=" + escape("") + ";expires=" + expiration;
  document.cookie = cookie;
}
