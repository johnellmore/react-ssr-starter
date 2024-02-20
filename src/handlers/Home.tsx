import { useState } from "react";
import { generateRandomNumber } from "../lib/serverLogic";
import { useLoader } from "../react/useLoader";

export function load() {
  const random = generateRandomNumber();
  return { random };
}

export function Home() {
  const { random } = useLoader<typeof load>();
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <p>
        Server number: {random}
        <br />
        Clicks until reached: {random - count}
      </p>
    </div>
  );
}
