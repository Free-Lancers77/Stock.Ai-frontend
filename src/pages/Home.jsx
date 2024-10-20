import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Home = () => {
  const comp = useRef(null);
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from("#intro-slider", {
        xPercent: "-100",
        duration: 1.3,
        delay: 0.3,
        ease: "power2.out",
      })
        .from(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: "+=30",
          stagger: 0.4,
          ease: "back.out(1.7)",
        })
        .to(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: "-=30",
          delay: 0.3,
          stagger: 0.4,
          ease: "back.in(1.7)",
        })
        .to("#intro-slider", {
          xPercent: "-100",
          duration: 1.3,
          ease: "power2.in",
        })
        .from("#welcome", {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        })
        .to("#welcome", {
          onComplete: () => {
            setShowButtons(true);
            gsap.fromTo(
              ".action-button",
              { opacity: 0, scale: 0.5 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                stagger: 0.3,
                ease: "back.out(1.7)",
              }
            );
          },
        });
    }, comp);

    return () => ctx.revert();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="relative" ref={comp}>
      <div
        id="intro-slider"
        className="h-screen p-10 bg-gradient-to-r from-gray-700 via-gray-900 to-black absolute top-0 left-0 z-10 w-full flex flex-col gap-10 tracking-tight text-white"
      >
        <h1 className="text-6xl lg:text-9xl font-bold" id="title-1">
          Stock
        </h1>
        <h1 className="text-6xl lg:text-9xl font-bold" id="title-2">
          Manager
        </h1>
        <h1 className="text-6xl lg:text-9xl font-bold" id="title-3">
          AI
        </h1>
      </div>

      <div className="h-screen flex bg-gradient-to-br from-gray-900 to-gray-950 justify-center items-center flex-col">
        <h1
          id="welcome"
          className="text-6xl lg:text-9xl font-bold text-gray-100 text-center mb-6"
        >
          Welcome.
        </h1>
        {showButtons && (
          <div className="flex gap-6">
            <button
              onClick={() => handleNavigate("/login")}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out action-button"
            >
              Login
            </button>
            <button
              onClick={() => handleNavigate("/signup")}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out action-button"
            >
              Signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
