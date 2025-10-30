import React from "react";

export type BrandImgProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
};

export function BrandImg({ src, alt, className, width, height, style }: BrandImgProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      style={style}
      loading="eager"
      decoding="sync"
    />
  );
}
