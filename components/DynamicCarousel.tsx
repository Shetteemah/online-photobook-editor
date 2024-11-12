import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

interface CarouselProps {
  images: { src: string; alt: string }[]; // Accepts an array of objects with src and alt for each image
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <div className="w-full items-center pb-2 text-center justify-center">
      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        className="max-w-[300px] mx-auto"
      >
        {/* Main Image Carousel */}
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.src}
              alt={image.alt}
              className="w-[250px] h-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <div className="flex justify-center mt-4 space-x-4">
        {images.map((image, index) => (
          <div key={index} className="w-20 h-20 border-2 border-gray-300 cursor-pointer">
            <img src={image.src} alt={image.alt} className="h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
