import { useState } from "react";
import { useLoader } from "../react/useLoader";

/**
 * An example of server-side-only logic. This would cause errors if run
 * client-side.
 */
function generateRandomNumber() {
  console.log("this is running on the server!");
  console.log("cpu usage", process.cpuUsage());
  return Math.floor(Math.random() * 100);
}

/**
 * Generate some data for the view. This runs ONLY on the server; the code will
 * not be sent to the client.
 */
export function BasicExampleLoader() {
  const randomNumber = generateRandomNumber();
  return { randomNumber };
}

/**
 * Render the view. This runs on both the server AND the client.
 */
export function BasicExampleView() {
  const { randomNumber } = useLoader<typeof BasicExampleLoader>();
  const [count, setCount] = useState(randomNumber);
  return (
    <div>
      <h1>Basic example</h1>
      <p>Random number received from server: {randomNumber}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Current number on client: {count}</p>
      <ul>
        <li>
          <a href="/server-side-example">Server-side fetch example</a>
        </li>
        <li>
          <a href="/client-side-example">Client-side load example</a>
        </li>
      </ul>
    </div>
  );
}
