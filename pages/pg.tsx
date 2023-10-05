import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
const Pg = () => {
  const [isExploding, setIsExploding] = useState(false);
  return (
    <>
      <button onClick={() => setIsExploding(!isExploding)}>Explode</button>
      {isExploding && <ConfettiExplosion />}
    </>
  );
};

export default Pg;
