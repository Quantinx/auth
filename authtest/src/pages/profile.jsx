import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import checkSession from "../helpers/checkSesson";
export default function Profile() {
  const [profileText, setProfileText] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function getProfile() {
      const url = "http://localhost:8080/profile";
      const res = await fetch(url, {
        method: "GET",
        withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setProfileText(data); // Set profileText here, not console.log
    }
    async function checkAuth() {
      if ((await checkSession()) === 401) {
        navigate("/login");
      }
    }
    checkAuth();

    getProfile(); // Call the async function
  }, []); // Empty dependency array to run once on mount

  if (profileText) {
    return (
      <>
        <h2>Welcome! {profileText.username}</h2>
        <div>{profileText.profile}</div>
      </>
    );
  }
}
