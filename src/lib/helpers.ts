import { getImage } from "astro:assets";
import type { ImageProps } from "./utils";
import { glob } from 'glob'

export function trimText(input: string, maxLength: number = 100): string {
  if (input.length <= maxLength) return input;
  return input.substring(0, maxLength - 3) + "...";
}
export function getCurrentTimeInSG(): Date {
  // Create a date object with the current UTC time
  const now = new Date();

  // Convert the UTC time to SGT
  const offsetSGT = 8; 
  now.setHours(now.getUTCHours() + offsetSGT);

  return now;
}

export function formatTimeForSG(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // This will format the time in 12-hour format with AM/PM
    timeZone: "Asia/Singapore",
  };

  let formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);

  formattedTime += " SGT";

  return formattedTime;
}

export function formatDate(date: Date): string {
  const formatter = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  return formatter.format(date);
}


export async function processImages(imageFiles: Record<string, ImageProps>) {
  // Extract image data and create an array of image objects
  const images = Object.entries(imageFiles).map(([path, module]) => ({
    ...module.default,
    alt: path.split('/').pop()?.split('.')[0],
  }));


  // Asynchronously process images using getImage and Promise.all
  const optimizedImages = await Promise.all(
    images.map(async (image) => {
      const optimizedImage = await getImage({
        src: image,
        alt: image.alt,
        width: 50,
        height: 50,
        loading: 'lazy',
        decoding: 'async'
      });
      return optimizedImage;
    }),
  );
  
    // console.log("OptimizedImages: ", optimizedImages)

  return optimizedImages;
}       

const imagesFiles: Record<string, ImageProps> = import.meta.glob(
  'src/assets/icons/*.{jpg,jpeg,png,svg}',
  { eager: true },
);

// export function findImageFiles() : Record<string, ImageProps>{
//   return glob('src/assets/icons/*.{jpg,jpeg,png,svg}');
// }

// Returns an ARRAY of images with its original and optimized attributes
const processedImages = await processImages(imagesFiles); 