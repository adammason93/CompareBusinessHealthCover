import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

type ResponsiveImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  webpSrcSet?: string;
  avifSrcSet?: string;
};

export function ResponsiveImage({
  webpSrcSet,
  avifSrcSet,
  sizes,
  alt,
  ...imgProps
}: ResponsiveImageProps) {
  return (
    <picture>
      {avifSrcSet ? <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} /> : null}
      {webpSrcSet ? <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} /> : null}
      <ImageWithFallback alt={alt} sizes={sizes} {...imgProps} />
    </picture>
  );
}
