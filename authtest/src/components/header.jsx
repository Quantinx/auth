import { Link } from "react-router-dom";

export default function HeaderBar() {
  function logOut() {
    logoff();
  }

  async function logoff() {
    const url = "http://localhost:8080/logout";

    const res = await fetch(url, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();
    return resData;
  }

  return (
    <>
      <h1>This is a site header</h1>
      <div>
        <Link to="/">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={logOut}>Log Out</button>
      </div>
    </>
  );
}
