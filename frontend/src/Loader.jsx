import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <DotLottieReact
        className="w-40 h-40"
        src="https://lottie.host/2807058f-483e-4249-8b05-52e174383e7a/ACejKqUPDX.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default Loader;
