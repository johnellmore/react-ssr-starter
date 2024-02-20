import { useState } from "react";
import { generateRandomNumber } from "../lib/serverLogic";
import { useLoader } from "../react/useLoader";

export function HomeLoader() {
  const random = generateRandomNumber();
  return { random };
}

export function HomeView() {
  const { random } = useLoader<typeof HomeLoader>();
  const [count, setCount] = useState(random);
  return (
    <div>
      <h1>Home</h1>
      <p>Random number received from server: {random}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Current number on client: {count}</p>
    </div>
  );
}
