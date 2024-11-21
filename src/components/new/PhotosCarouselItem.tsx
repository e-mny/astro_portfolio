import { Image } from "astro:assets";
import { Card, CardContent } from "../ui/card";
import { CarouselItem } from "../ui/carousel";

const PhotosCarouselItem: React.FC<{ key: string; src: string }> = ({
  key,
  src,
}) => {
  // console.log(key)
  return (
    <CarouselItem key={key} className="w-full h-full">
      <Card className="flex flex-col w-full h-full aspect-square items-center justify-center text-center bg-transparent border-none">
        <div className="flex flex-col w-full h-full">
          <CardContent className="flex flex-col h-full w-full items-center text-center justify-center p-4">
            <img
              src={src}
              alt={key}
              loading="lazy"
              decoding="async"
              className="aspect-square rounded-lg w-full p-0 m-0"
              width={400}
              height={400}
            />
          </CardContent>
        </div>
      </Card>
    </CarouselItem>
  );
};

export default PhotosCarouselItem;
