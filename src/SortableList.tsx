import { useState, useEffect, useRef } from "react";
import { animated, useSpring, useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";
// import swap from 'lodash-move';

const SortableList = () => {
  const [items, setItems] = useState<number[]>([1, 2, 3]);

  // Function to swap the numbers
  const swap = (arr: number[], from: number, to: number) => {
    arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
  };

  // Function to arrange the cards
  const arrangeCards =
    (
      cardItems: number[],
      curIndex = 0,
      originalIndex = 0,
      active = false,
      yDir = 0
    ) =>
    (index: number) => {
      return active && originalIndex === index
        ? {
            y: curIndex * 100 + yDir,
            scale: 1.1,
            zIndex: 2,
            immediate: (key: string) => key === "y" || key === "zIndex",
          }
        : {
            y: cardItems.indexOf(index) * 50,
            scale: 1,
            zIndex: 1,
            immediate: false,
          };
    };

  const [springs, api] = useSprings(items.length, arrangeCards(items));
  const itemOrders = useRef(items.map((_, i) => i));
  const bind = useDrag(({ args: [originalIndex], active, offset: [, y] }) => {
    const curIndex = itemOrders.current.indexOf(originalIndex);
    const newIndex = clamp(
      Math.round((curIndex + y) / 100),
      0,
      items.length - 1
    );
    const newOrders = api.start(
      arrangeCards(itemOrders.current, curIndex, originalIndex, active, y)
    );
  });

  useEffect(() => {
    bind();
    console.log(swap(items, 1, 2));
  }, []);

  return (
    <div className="container">
      {springs.map((styles, i) => (
        <animated.div
          key={i}
          {...bind(i)}
          style={styles}
          className="card"
        ></animated.div>
      ))}
    </div>
  );
};

export default SortableList;
