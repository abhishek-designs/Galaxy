import { useState } from "react";
import { motion } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated, useSprings } from "react-spring";
import "./styles/main.min.css";
import MyItem from "./MyItem";

const App = () => {
  const [childPos, setChildPos] = useState([0, 0]);
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(({ down, offset: [ox] }) => api.start({ x: ox }), {
    bounds: {
      left: -70,
      right: 70,
    },
    rubberband: true,
  });

  return (
    <div className="frame-contain">
      <ul className="list">
        {[1, 2, 3, 4].map((v) => (
          <MyItem key={v} />
          //   <li className="list-item" key={i}>
          //   <animated.div {...bind()} style={{ x }} className="item-container">
          //     <h3 style={{ userSelect: "none" }}>Hello World</h3>
          //   </animated.div>
          //   <button className="left-btn hidden-btn">Update</button>
          //   <button className="right-btn hidden-btn">Delete</button>
          // </li>
        ))}
        {/* {springs.map(({ x }, i) => ( */}

        {/* ))} */}
      </ul>
      {/* <motion.div
        onMouseMove={(e) => setChildPos([e.clientX, e.clientY])}
        className="parent-box"
      >
        <div
          className="child-box"
          style={{ transform: `translate(${childPos[0]}px,${childPos[1]}px)` }}
        ></div>
      </motion.div> */}
    </div>
  );
};

export default App;
