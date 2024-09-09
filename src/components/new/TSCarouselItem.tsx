import { Image } from "astro:assets";
import { Card, CardContent } from "../ui/card";
import { CarouselItem } from "../ui/carousel";
import type { GetImageResult } from "astro";
import PythonImage from "../../assets/icons/python.svg"

const TSCarouselItem: React.FC<{ key: string; src: string }> = ({ key, src }) => {
  console.log(src)
  return (
    <CarouselItem
      key={key}
      className="basis-1/3 p-4 pl-1 sm:pl-1 md:pl-2 lg:pl-2"
    >
      <Card className="flex w-full h-full aspect-square items-center justify-center text-center">
        <CardContent className="flex w-full h-full items-center justify-center align-middle">
          {src}
          <Image
            src="assets/icons/python.svg"
            // src="/src/assets/icons/python.svg" // Accessing src directly
            // alt={imgProps.attributes?.alt} 
            // width={imgProps.attributes?.width || 50} // Fallback width if not defined
            // height={imgProps.attributes?.height || 50} // Fallback height if not defined
          />
        </CardContent>
      </Card>
    </CarouselItem>
  );
};

export default TSCarouselItem;
