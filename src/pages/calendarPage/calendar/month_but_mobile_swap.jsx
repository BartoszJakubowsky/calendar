import React, { useState } from "react";
import { useSprings, animated } from "react-spring";
import Month from "./Month";

const MonthCarousel = ({ date, name, slots, time }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const monthCount = date.length;

  const springs = useSprings(
    monthCount,
    date.map((month, index) => ({
      transform: `translateX(${(index - currentIndex) * 100}%)`,
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      zIndex: index === currentIndex ? 1 : 0,
    }))
  );

  const handleLeftClick = () => {
    setCurrentIndex((currentIndex - 1 + monthCount) % monthCount);
  };

  const handleRightClick = () => {
    setCurrentIndex((currentIndex + 1) % monthCount);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {springs.map((props, index) => (
        <animated.div key={index} style={{ ...props }}>
          <Month name={name} date={date[index]} slots={slots} time={time} />
        </animated.div>
      ))}
      <div
        onClick={handleLeftClick}
        style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "100%", cursor: "pointer" }}
      ></div>
      <div
        onClick={handleRightClick}
        style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", cursor: "pointer" }}
      ></div>
    </div>
  );
};

export default MonthCarousel;