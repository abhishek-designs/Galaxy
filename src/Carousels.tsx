import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect, useRef } from "react";
import SwiperCore, {
  Pagination,
  Navigation,
  Thumbs,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  EffectFlip,
  SwiperOptions,
} from "swiper";
import "swiper/swiper-bundle.css";

SwiperCore.use([
  Pagination,
  Thumbs,
  Navigation,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  EffectFlip,
]);

const Carousels = () => {
  const swipe = useRef();
  const [index, setIndex] = useState(0);
  const [thumbPos, setThumbPos] = useState();

  const slides = [
    {
      id: 1,
      title: "This is slide",
    },
    {
      id: 2,
      title: "This is slide",
    },
    {
      id: 3,
      title: "This is slide",
    },
    {
      id: 4,
      title: "This is slide",
    },
    {
      id: 5,
      title: "This is slide",
    },
    {
      id: 6,
      title: "This is slide",
    },
    {
      id: 7,
      title: "This is slide",
    },
  ];

  // useEffect(() => {
  //   console.log(index);
  // }, [index]);

  return (
    <div className="carousel-container">
      <Swiper
        spaceBetween={20}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{ ...Navigation }}
        grabCursor
        resistance={true}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 2,
          },
        }}
      >
        {slides?.map((slide, i) => (
          <SwiperSlide key={slide.id} zoom>
            <div className="slide-box">
              {slide.title} {i + 1}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <br />
      <br />
      <Swiper
        spaceBetween={20}
        pagination={{ clickable: true }}
        navigation={{ ...Navigation }}
        effect="cube"
      >
        {slides?.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="slide-box">{slide.title}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      <br />
      <br />
      <Swiper
        spaceBetween={20}
        pagination={{ clickable: true }}
        navigation={{ ...Navigation }}
        effect="coverflow"
      >
        {slides?.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="slide-box">{slide.title}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      <br />
      <br />
      <Swiper
        spaceBetween={20}
        pagination={{ clickable: true }}
        navigation={{ ...Navigation }}
        effect="flip"
      >
        {slides?.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="slide-box">{slide.title}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousels;
