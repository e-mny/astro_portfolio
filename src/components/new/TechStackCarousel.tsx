import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import type { GetImageResult } from "astro";
import TSCarouselItem from "./TSCarouselItem";



const IconPath = {
  "Python": "src/assets/icons/python.svg",
  "JavaScript": "src/assets/icons/javascript.svg",
  "TypeScript": "src/assets/icons/typescript.svg",
  "HTML": "src/assets/icons/html.svg",
  "CSS": "src/assets/icons/css.svg",
  "React": "src/assets/icons/react.svg",
  "Go": "src/assets/icons/golang.svg",
  "PyTorch": "src/assets/icons/pytorch.svg",
};

interface TechStackCarouselProps {
  images: GetImageResult[]; // Array of image results
}

const TechStackCarousel: React.FC<TechStackCarouselProps> = ({ images }) => { 
  // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // const handleMouseEnter = (index: number) => {
  //   // Set a delay for showing the text
  //   const timeoutId = setTimeout(() => {
  //     setHoveredIndex(index);
  //   }, 100);

  //   setHoverTimeout(timeoutId);
  // };

  // const handleMouseLeave = () => {
  //   // Clear the timeout if the mouse leaves before the delay
  //   if (hoverTimeout) {
  //     clearTimeout(hoverTimeout);
  //     setHoverTimeout(null);
  //   }

  //   setHoveredIndex(null);
  // }; 

  console.log(images)
  return (
  <Carousel
    plugins={[
      Autoplay({
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: false,
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
    className="w-full max-w-xs"
  >
    <CarouselContent className="text-white">
      {Object.entries(IconPath).map(([imagesKey, imagesProps]) => {
        return (
          TSCarouselItem({
            key: imagesKey,
            src: imagesProps
          })
        )
        
      })}
    </CarouselContent>
  </Carousel>
);
}

export default TechStackCarousel;