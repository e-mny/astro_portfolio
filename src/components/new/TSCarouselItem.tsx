import { Image } from "astro:assets";
import { Card, CardContent } from "../ui/card";
import { CarouselItem } from "../ui/carousel";

const TSCarouselItem: React.FC<{ key: string; src: string }> = ({ key, src }) => {
  return (
    <CarouselItem
      key={key}
      className="basis-1/3 p-4 pl-1 sm:pl-1 md:pl-2 lg:pl-2"
    >
      <Card className="flex w-full h-full aspect-square items-center justify-center text-center bg-transparent border-none">
        <CardContent className="flex w-full h-full items-center justify-center align-middle p-0">
          {/* {src} */}
          
          <img src={src} alt={key} loading="lazy" decoding="async" className="aspect-square rounded-lg bg-transparent" />
        </CardContent>
      </Card>
    </CarouselItem>
  );
};

export default TSCarouselItem;
