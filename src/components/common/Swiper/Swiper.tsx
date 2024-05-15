import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper as _Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface SwiperProps<T> {
  datas: T[];
  renderItem: ({ data }: { data: T }) => JSX.Element;
}
const Swiper = <T,>({ datas, renderItem }: SwiperProps<T>) => {
  return (
    <_Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      loop={true}
      pagination={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, EffectCoverflow, Pagination]}
      className="mySwiper"
      style={{ width: "100%", height: "100%" }}
    >
      {datas.map((data, index) => (
        <SwiperSlide key={index}>{renderItem({ data })}</SwiperSlide>
      ))}
    </_Swiper>
  );
};

export default Swiper;
