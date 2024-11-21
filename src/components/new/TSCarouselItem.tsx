import { Image } from "astro:assets";
import { Card, CardContent } from "../ui/card";
import { CarouselItem } from "../ui/carousel";

const TSCarouselItem: React.FC<{ key: string; src: string }> = ({ key, src }) => {
  // console.log(key)
  return (
    <CarouselItem
      key={key}
      className="flex-shrink-0 w-full sm:basis-1/4 md:basis-1/3 lg:basis-1/2 p-6 pl-1 sm:pl-1 md:pl-2 lg:pl-2"
    >
      <Card className="flex flex-col w-full h-full aspect-square items-center justify-center text-center bg-transparent border-none">
        <div className="flex flex-col w-full h-full">

        <CardContent className="flex flex-col h-full w-full items-center text-center justify-center p-4">
          
          <img src={src} alt={key} loading="lazy" decoding="async" className="aspect-square rounded-lg bg-transparent w-full p-0 m-0" />
          <div className="text-white text-xl pt-0 mt-0">{key}</div>
        </CardContent>
        </div>
      </Card>
    </CarouselItem>
  );
};

export default TSCarouselItem;
