export default function authHeader() {
  const user = JSON.parse(localStorage.getItem(process.env.SECRET_KEY_JWT));

  if (user) {
    return { Authorization: "Bearer " + user };
  } else {
    return {};
  }
}
