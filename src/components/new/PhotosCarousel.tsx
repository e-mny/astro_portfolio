import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import PhotosCarouselItem from "./PhotosCarouselItem";


interface ImageProps {
  default?: {
    src: string;
  };
  alt: string;
}

interface TechStackCarouselProps {
  images: ImageProps[]; // Array of image results
}

const TechStackCarousel: React.FC<TechStackCarouselProps> = ({ images }) => {
  // console.log(images.default)

  return (
    <Carousel
      plugins={[
        Autoplay({
          // stopOnInteraction: false,
          // stopOnMouseEnter: true,
          // stopOnFocusIn: false,
          delay: 500,
        }),
        AutoScroll({
          startDelay: 0,
          speed: 1.5,
        }),
      ]}
      opts={{
        align: "center",
        loop: true,
        watchDrag: false,
      }}
      className="w-full h-full justify-center items-center m-0 flex"
    >
      <CarouselContent className="text-white">
        {Object.entries(images).map(([imagesIndex, imagesProps]) => {
          return PhotosCarouselItem({
            key: imagesProps.alt || `image-${imagesIndex}`,
            src: imagesProps.default.src,
          });
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default TechStackCarousel;
