import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import TSCarouselItem from "./TSCarouselItem";

// const IconPath = {
//   "Python": "src/assets/icons/python.svg",
//   "JavaScript": "src/assets/icons/javascript.svg",
//   "TypeScript": "src/assets/icons/typescript.svg",
//   "HTML": "src/assets/icons/html.svg",
//   "CSS": "src/assets/icons/css.svg",
//   "React": "src/assets/icons/react.svg",
//   "Go": "src/assets/icons/golang.svg",
//   "PyTorch": "src/assets/icons/pytorch.svg",
// };

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
          speed: 1.75,
        }),
      ]}
      opts={{
        align: "center",
        loop: true,
        watchDrag: false,
      }}
      className="w-full h-full justify-center items-center flex"
    >
      <CarouselContent className="text-white">
        {Object.entries(images).map(([imagesIndex, imagesProps]) => {
          return TSCarouselItem({
            key: imagesProps.alt || `image-${imagesIndex}`,
            src: imagesProps.default.src,
          });
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default TechStackCarousel;
