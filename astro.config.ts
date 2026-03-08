// @ts-check
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

let site = process.env.SITE ?? "http://localhost:4321"

if (process.env.VERCEL) {
    site = process.env.VERCEL_ENV === "production" ? "https://bechard.dev" : `https://${process.env.VERCEL_URL}`
}
const base = process.env.BASE || "/"

// https://astro.build/config
export default defineConfig({
    site,
    base,
    integrations: [react()],
    vite: {
        plugins: [tailwindcss()],
    },
})
