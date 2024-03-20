import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import checkSession from "../helpers/checkSesson";
export default function LoginPage() {
  const userRef = useRef();
  const passwordRef = useRef();
  const [response, setResponse] = useState();
  const [status, setStatus] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useffect running");
    if (status === 200) {
      console.log("Successful login detected");
      navigate("/profile");
      return;
    }
    async function checkAuth() {
      if ((await checkSession()) === 200) {
        navigate("/profile");
      }
    }
    checkAuth();
  });

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      username: userRef.current.value,
      password: passwordRef.current.value,
    };
    sendData(payload);
  }
  async function sendData(data) {
    const url = "http://localhost:8080/login";

    const res = await fetch(url, {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();
    setResponse(resData);
    setStatus(res.status);
    console.log(res.status);
  }
  return (
    <>
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input ref={userRef} type="text" required></input>
        </label>
        <label>
          Password:
          <input ref={passwordRef} type="password" required></input>
        </label>
        <button> Register</button>
      </form>
      <div> Response: {response}</div>
    </>
  );
}
