import { useDrag, useGesture } from "@use-gesture/react";
import { useEffect } from "react";
import { useSpring, animated, useSprings } from "react-spring";

const MyItem = () => {
  //   const [springs, api] = useSprings(4, () => ({ x: 0 }));

  //   const bind = useDrag(
  //     ({ down, offset: [ox] }) => api.start({ x: down ? ox : 0 }),
  //     {
  //       bounds: {
  //         left: -70,
  //         right: 70,
  //       },
  //       rubberband: true,
  //     }
  //   );

  const [{ x }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(
    ({ down, offset: [ox], cancel }) => {
      console.log(down);
      if (ox < -30) {
        console.log("right-side");
        // cancel();
      } else if (ox > 30) {
        console.log("left-side");
        // cancel();
      }
      api.start({ x: down ? ox : 0 });
    },
    {
      preventDefault: true,
      filterTaps: true,
      bounds: {
        left: -70,
        right: 70,
      },
      rubberband: true,
    }
  );

  const bindWithEvents = useGesture({
    onClick: () => console.log("clicked"),
    onDrag: () => console.log("dragging"),
    onDragEnd: () => console.log("not dragging"),
  });
  //   const leftRight = (state: any) => {
  //     console.log(state);

  //     if (state?.movement[0] >= 8) {
  //       navigate("/recruiter/can_demands");
  //       // setShowTextArea(true);
  //       console.log(state.movement);
  //     } else if (state?.movement[0] < -8) {
  //     }
  //   };
  //   const bindWithEvents = useGesture({
  //     onDragEnd: (state: any) => leftRight(state),
  //   });
  return (
    <li className="list-item">
      <animated.a
        {...bind()}
        href="https://www.google.com"
        // {...bindWithEvents()}
        style={{ x }}
        className="item-container"
      >
        <h3 style={{ userSelect: "none" }}>Hello World</h3>
      </animated.a>
      <button className="left-btn hidden-btn">Update</button>
      <button className="right-btn hidden-btn">Delete</button>
    </li>
  );
};

export default MyItem;
