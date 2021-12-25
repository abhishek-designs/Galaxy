import "./styles/main.min.css";
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
  useMotionTemplate,
  useAnimation,
  animate,
} from "framer-motion";
import { useState, useEffect } from "react";
import Carousels from "./Carousels";
import Calender from "./Calender";

const App = () => {
  const [open, setOpen] = useState(false);
  const x = useMotionValue(-250);
  const [autoSlide, setAutoSlide] = useState(0);
  // const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);
  const boxHorizontal = useTransform(x, [-200, 0, 200], [-200, 0, 200]);
  const shadowAnim = useTransform(x, [-200, 0, 200], [-200, 3, 200]);
  const { scrollYProgress } = useViewportScroll();
  const controls = useAnimation();
  const variants = {
    hidden: {
      x: "-100vw",
    },
    visible: {
      x: 0,
    },
  };

  controls.start({
    x: "20rem",
    // scale: 2,
    // boxShadow: "0px 0px 4px 4px rgba(0,0,0,0.2)",

    backgroundColor: "red",
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { x: -20, opacity: 1 },
    show: { x: 0, opacity: 1 },
  };

  const boxItem = {
    hidden: { scale: 0 },
    show: { scale: 1 },
  };
  // Function to increase auto slide
  const onAutoSlide = () => {
    // setInterval(() => {
    setAutoSlide((prev) => prev + 1);
    // }, 300);
  };

  useEffect(() => {
    // const controls = animate(x, 10, {
    //   type: "spring",
    //   stiffness: 2000,
    //   onComplete: () => console.log("completed"),
    // });

    return controls.stop;
  }, [autoSlide]);

  return (
    // <Calender />
    <>
      {new Array(100).fill("star").map((num, i) => (
        <motion.div
          key={i}
          drag
          className="star"
          style={{
            top: `${Math.random() * 1000}px`,
            left: `${Math.random() * 2000}px`,
          }}
        ></motion.div>
      ))}
      <div className="container">
        {/* <motion.ul
        className="list-items"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <motion.li key={num} className="list-item" variants={item}>
            <h4>Item {num}</h4>
          </motion.li>
        ))}
      </motion.ul> */}
        <motion.div
          className="boxes"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => (
            <motion.div
              key={num}
              className="box"
              variants={boxItem}
              drag
              style={{
                top: `${
                  num % 2 === 0 ? Math.random() * 1000 : Math.random() * 1700
                }px`,
                left: ` ${
                  num % 2 === 0 ? Math.random() * 1000 : Math.random() * 700
                }px`,
              }}
            ></motion.div>
          ))}

          <motion.div drag className="sun" variants={boxItem}>
            <div className="sun_container">
              {[1, 2, 3, 4].map((v) => (
                <div className="holes"></div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        {/* <motion.div
        drag
        // animate={controls}
        // onDrag={() => console.log(y)}
        style={{
          x,
          boxShadow: `8px 3px 4px 8px rgba(255,0,0,0.2)`,
          transition: "background-color 0.3s ease",
        }}
        // whileHover={{ scale: 1.2 }}
        //     drag
        //     style={{ x, opacity }}
        //     // whileTap={{ scale: 0.8 }}
        className="box"
        //     // initial="hidden"
        //     animate={{
        //       scale: [1.1, 0.8, 1, 5, 1],
        //       rotate: [90, 85, -90, 180],
        //     }}
        //     // variants={variants}
      ></motion.div> */}
        {/* <motion.div
        className="box"
        animate={controls}
        transition={{ duration: 3 }}
        style={{ x: boxHorizontal, marginTop: "2rem" }}
      ></motion.div> */}
        {/* <motion.div
        className="box"
        style={{ scale: boxScale, marginTop: "2rem" }}
      ></motion.div> */}
        {/* <motion.div
        className="box"
        style={{ opacity: boxOpacity, marginTop: "1rem" }}
      ></motion.div> */}
        {/* <button onClick={() => setOpen(prev => !prev)}>
         {open ? "Hide" : "Show"}
       </button> */}
      </div>
    </>
  );
};

export default App;
