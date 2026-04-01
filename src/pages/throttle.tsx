import { useState, useRef } from "react";

const baseUrl = "https://jsonplaceholder.typicode.com/users?name_like=";

export default function Throttle() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const lastCallRef = useRef(0);

  async function fetchData(value) {
    try {
      setLoading(true);

      const response = await fetch(baseUrl + value);
      if (!response.ok) throw new Error();

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleInput(e) {
    const value = e.target.value;
    setInputValue(value);

    if (!value) return;

    const now = Date.now();
    console.log(now)
    console.log(lastCallRef.current)

    // THROTTLE LOGIC
    if (now - lastCallRef.current >= 500) {
      lastCallRef.current = now;
      fetchData(value);
    }
  }

  return (
    <>
      <input value={inputValue} onChange={handleInput} />
      {loading && <p>Loading...</p>}
    </>
  );
}