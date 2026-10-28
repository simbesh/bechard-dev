import arby from "@/assets/arby-dash.png"
import coins from "@/assets/coin-stacker.png"
import hire from "@/assets/mrtrestle-home.png"
import quote from "@/assets/mrtrestle-quote.png"

export const projects = [
    {
        name: "MrTrestle",
        description: "Quotes, bookings and inventory for my brother's equipment hire business.",
        image: hire,
        slides: [
            {
                image: hire,
                alt: "MrTrestle homepage with equipment hire and available gear",
            },
            {
                image: quote,
                alt: "MrTrestle instant quote form with equipment selection and delivery options",
            },
        ],
        alt: "MrTrestle equipment hire website",
        href: "https://mrtrestle.com.au",
        tech: "Next.js · Turso · Redis · Vercel",
        year: "2025",
    },
    {
        name: "CoinStacker",
        description: "Compare Australian crypto exchanges, including trading fees and available orders.",
        image: coins,
        alt: "CoinStacker cryptocurrency price comparison",
        href: "https://coinstacker.com.au",
        tech: "Next.js · PostHog",
        year: "2025",
    },
    {
        name: "Arby",
        description: "Cross-exchange crypto arbitrage, with a dashboard for balances, trades and profit.",
        image: arby,
        alt: "Arby private trading dashboard",
        href: null,
        tech: "Bun · SQLite · Playwright · Vultr",
        year: null,
    },
]
export const interests = ["Home Assistant", "Crypto", "3D printing", "Padel", "PC gaming", "Poker"]
