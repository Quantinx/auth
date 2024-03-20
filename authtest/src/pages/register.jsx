import { useRef, useState } from "react";

export default function RegisterPage() {
  const userRef = useRef();
  const passwordRef = useRef();
  const [response, setResponse] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      username: userRef.current.value,
      password: passwordRef.current.value,
    };
    sendData(payload);
  }
  async function sendData(data) {
    const url = "http://localhost:8080/register";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();
    setResponse(resData);
  }
  return (
    <>
      <h2>New user</h2>
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
