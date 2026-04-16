import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const fullText = "<hello world/>";

  useEffect(() => {
    // Faster loading on mobile devices
    const isMobile = window.innerWidth < 768;
    const typingSpeed = isMobile ? 50 : 80;
    const finalDelay = isMobile ? 300 : 600;

    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);

        setTimeout(() => {
          onComplete();
        }, finalDelay);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black text-gray-100 flex flex-col items-center justify-center px-4 py-8 md:px-12 md:py-16">
      <div className="mb-4 text-3xl md:text-4xl font-mono font-bold text-center">
        {text} <span className="animate-blink ml-1"> | </span>
      </div>

      <div className="w-full max-w-xs sm:w-[250px] md:w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
        <div className="w-[40%] h-full bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-loading-bar"></div>
      </div>
    </div>
  );
};
