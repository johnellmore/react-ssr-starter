import { useEffect, useState } from "react";

export function ClientSideView() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);
  return (
    <div>
      <h1>Client-side rendering</h1>
      <p>
        This view was rendered on the client side. The window dimensions are{" "}
        {dimensions.width}x{dimensions.height}.
      </p>
    </div>
  );
}
