export default function checkSession() {
  async function getSession() {
    const url = "http://localhost:8080/session";
    const res = await fetch(url, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.status);
    return res.status;
  }

  return getSession();
}
