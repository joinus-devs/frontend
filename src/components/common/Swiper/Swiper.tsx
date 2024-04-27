import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper as _Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface SwiperProps<T> extends React.ComponentProps<typeof _Swiper> {
  datas: T[];
  renderItem: ({ data }: { data: T }) => JSX.Element;
}

const Swiper = <T,>({ datas, renderItem, ...rest }: SwiperProps<T>) => {
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
      {...rest}
    >
      {datas.map((data, index) => (
        <SwiperSlide key={index}>{renderItem({ data })}</SwiperSlide>
      ))}
    </_Swiper>
  );
};

export default Swiper;
