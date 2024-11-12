import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const Carousel = () => {
  return (
    <div className="w-full">
      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        className="max-w-xl mx-auto"
      >
        {/* Main Image */}
        <SwiperSlide>
          <img
            src="/images/Simple-Wedding_2c84136c-d372-4da4-bb36-0e6a94259e91_1000x.webp"
            alt="Book Cover 1"
            className="w-full h-auto"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/Detail-professional-fotoboek-960x720.webp"
            alt="Book Cover 2"
            className="w-full h-auto"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/photo_book_pro_perfect_for_family_photographers.jpg"
            alt="Book Cover 3"
            className="w-full h-auto"
          />
        </SwiperSlide>
      </Swiper>

      {/* Thumbnails */}
      <div className="flex justify-center mt-4 space-x-4">
        <div className="w-20 h-20 border-2 border-gray-300 cursor-pointer">
          <img src="/images/Simple-Wedding_2c84136c-d372-4da4-bb36-0e6a94259e91_1000x.webp" alt="Book Cover 1" className="w-full h-full object-cover" />
        </div>
        <div className="w-20 h-20 border-2 border-gray-300 cursor-pointer">
          <img src="/images/Detail-professional-fotoboek-960x720.webp" alt="Book Cover 2" className="w-full h-full object-cover" />
        </div>
        <div className="w-20 h-20 border-2 border-gray-300 cursor-pointer">
          <img src="/images/photo_book_pro_perfect_for_family_photographers.jpg" alt="Book Cover 3" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
