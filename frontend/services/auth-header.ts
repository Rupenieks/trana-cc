export default function authHeader() {
    let user;

    if (typeof window !== "undefined") {
        user = JSON.parse(localStorage.getItem('user'));
    }

    if (user && user.access_token) {
      return { Authorization: 'Bearer ' + user.access_token };
    } else {
      return {};
    }
  }