import { useEffect, useState } from "react";

const BlinkCursor = () => {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((v) => (v + 1) % 3);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <span className="text-bold">{'•'.repeat(visible + 1)}</span>;
};

export default BlinkCursor;
