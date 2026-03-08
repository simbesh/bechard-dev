"use client"

import type { ComponentProps, ReactNode } from "react"
import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

export interface ImageZoomProps {
    alt?: string
    backdropClassName?: string
    children?: ReactNode
    className?: string
    height?: number
    imgClassName?: string
    loading?: ComponentProps<"img">["loading"]
    src?: string
    width?: number
}

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
    const [isZoomed, setIsZoomed] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const closeZoom = useCallback(() => {
        setIsZoomed(false)
    }, [])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isZoomed) {
            return
        }

        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeZoom()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            document.body.style.overflow = originalOverflow
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [isZoomed, closeZoom])

    const inlineContent =
        children ??
        (src ? (
            <img alt={alt ?? ""} className={imgClassName} height={height} loading={loading} src={src} width={width} />
        ) : null)

    const modalContent = src ? (
        <img
            alt={alt ?? ""}
            className="relative z-[1] max-h-[96vh] w-auto max-w-[98vw] animate-[zoomImageIn_220ms_cubic-bezier(0.23,1,0.32,1)_both] object-contain shadow-2xl motion-reduce:animate-none"
            height={height}
            loading={loading}
            src={src}
            width={width}
        />
    ) : (
        <div className="relative z-[1] max-h-[96vh] max-w-[98vw] animate-[zoomImageIn_220ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none [&_img]:max-h-[96vh] [&_img]:w-auto [&_img]:max-w-[98vw] [&_img]:object-contain">
            {children}
        </div>
    )

    const modal = isZoomed ? (
        <div
            aria-label={alt ? `${alt} zoomed` : "Zoomed image"}
            aria-modal="true"
            className={cn(
                "fixed inset-0 z-[999] flex animate-[zoomOverlayIn_180ms_ease-out_both] items-center justify-center bg-background/80 p-2 backdrop-blur-md motion-reduce:animate-none sm:p-3",
                backdropClassName,
            )}
            role="dialog"
        >
            <button
                aria-label="Close zoomed image"
                className="absolute inset-0 cursor-zoom-out"
                onClick={closeZoom}
                type="button"
            />
            <button
                aria-label="Close zoomed image"
                className="absolute top-3 right-3 z-[2] flex size-10 items-center justify-center rounded-full border-none bg-foreground/70 p-2 text-background outline-offset-2 sm:top-5 sm:right-5"
                onClick={closeZoom}
                type="button"
            >
                <svg
                    aria-hidden="true"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                </svg>
            </button>

            {modalContent}
        </div>
    ) : null

    return (
        <>
            <button
                aria-label={alt ? `Zoom ${alt}` : "Zoom image"}
                className={cn("relative block w-full cursor-zoom-in overflow-hidden", className)}
                onClick={() => setIsZoomed(true)}
                type="button"
            >
                {inlineContent}
            </button>
            {isMounted ? createPortal(modal, document.body) : null}
        </>
    )
}
