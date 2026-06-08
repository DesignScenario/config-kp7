interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageWithFallback({ src, alt, className }: ImageWithFallbackProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        // Fallback for missing images
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
      }}
    />
  );
}
