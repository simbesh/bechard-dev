"use client";

import type { ComponentProps, ReactNode } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export type ImageZoomProps = {
  className?: string;
  backdropClassName?: string;
  children?: ReactNode;
  src?: string;
  alt?: string;
  imgClassName?: string;
  loading?: ComponentProps<"img">["loading"];
  width?: number;
  height?: number;
};

export const ImageZoom = ({
  className,
  backdropClassName,
  children,
  src,
  alt,
  imgClassName,
  loading,
  width,
  height,
}: ImageZoomProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isZoomed) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsZoomed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isZoomed]);

  const inlineContent = children ??
    (src ? (
      <img
        src={src}
        alt={alt ?? ""}
        className={imgClassName}
        loading={loading}
        width={width}
        height={height}
      />
    ) : null);

  const modalContent = src ? (
    <img
      src={src}
      alt={alt ?? ""}
      loading={loading}
      width={width}
      height={height}
      className="relative z-[1] max-h-[96vh] w-auto max-w-[98vw] object-contain shadow-2xl motion-reduce:animate-none animate-[zoomImageIn_220ms_cubic-bezier(0.23,1,0.32,1)_both]"
    />
  ) : (
    <div className="relative z-[1] max-h-[96vh] max-w-[98vw] motion-reduce:animate-none animate-[zoomImageIn_220ms_cubic-bezier(0.23,1,0.32,1)_both] [&_img]:max-h-[96vh] [&_img]:w-auto [&_img]:max-w-[98vw] [&_img]:object-contain">
      {children}
    </div>
  );

  const modal = isZoomed ? (
    <div
      className={cn(
        "fixed inset-0 z-[999] flex items-center justify-center bg-background/80 p-2 sm:p-3 backdrop-blur-md motion-reduce:animate-none animate-[zoomOverlayIn_180ms_ease-out_both]",
        backdropClassName
      )}
      role="dialog"
      aria-modal="true"
      aria-label={alt ? `${alt} zoomed` : "Zoomed image"}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-zoom-out"
        onClick={() => setIsZoomed(false)}
        aria-label="Close zoomed image"
      />
      <button
        type="button"
        onClick={() => setIsZoomed(false)}
        className="absolute right-3 top-3 z-[2] flex size-10 items-center justify-center rounded-full border-none bg-foreground/70 p-2 text-background outline-offset-2 sm:right-5 sm:top-5"
        aria-label="Close zoomed image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
          aria-hidden="true"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>

      {modalContent}
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsZoomed(true)}
        aria-label={alt ? `Zoom ${alt}` : "Zoom image"}
        className={cn(
          "relative block w-full cursor-zoom-in overflow-hidden",
          className
        )}
      >
        {inlineContent}
      </button>
      {isMounted ? createPortal(modal, document.body) : null}
    </>
  );
};
