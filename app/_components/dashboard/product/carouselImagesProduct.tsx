import { ProductUploadImageType } from "@/app/_types/product";
import Image from "next/image";
import { Carousel } from "nuka-carousel";

export default function CarouselImagesProduct({
  images,
  hasDeleteImage = false,
  handleRemoveImage = undefined,
  productId = undefined,
}: {
  images: ProductUploadImageType[];
  hasDeleteImage?: boolean;
  handleRemoveImage?: (image_id: number, product_id: number) => void;
  productId?: number;
}) {
  if (images.length === 0) {
    return <></>;
  }

  /* TODO: CHECK WHY CAROUSEL DONT REFRESH WHEN ADD OR REMOVE IMAGES */

  return (
    <div className="md:w-[500px] w-[80vw] md:h-[400px] h-[40vw] overflow-y-hidden mb-4">
      <Carousel
        showArrows
        wrapMode="wrap"
        className="w-full max-w-full h-full max-h-full"
      >
        {images.map((image, index) => {
          return (
            <div
              className="relative w-[500px] h-[400px]"
              key={index}
            >
              <Image
                alt="preview image"
                src={image.url}
                className="w-[500px] h-[400px] max-w-[500px] max-h-[400px]"
                width={500}
                height={400}
              />
              {image?.id &&
                hasDeleteImage &&
                handleRemoveImage &&
                productId && (
                  <span
                    className="absolute top-0 right-0 mr-2 mt-2 cursor-pointer inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-base font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                    onClick={() =>
                      handleRemoveImage(image.id as number, productId)
                    }
                  >
                    Eliminar
                  </span>
                )}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
