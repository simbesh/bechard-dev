import type { ComponentType } from "react"
import { Logos } from "@/components/icons/logo"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const VERCEL = "Vercel" as const
export const TURSO = "Turso" as const
export const REDIS = "Redis" as const
export const NEXT_JS = "Next.js" as const
export const TAILWIND = "Tailwind" as const
export const POSTHOG = "PostHog" as const
export const VULTR = "Vultr" as const
export const BUN = "Bun" as const
export const PLAYWRIGHT = "Playwright" as const
export const SQLITE = "SQLite" as const

export const TECH_STACK_STRINGS = {
    VERCEL,
    TURSO,
    REDIS,
    NEXT_JS,
    TAILWIND,
    POSTHOG,
    VULTR,
    BUN,
    PLAYWRIGHT,
    SQLITE,
} as const

export type TechStackString =
    | typeof VERCEL
    | typeof TURSO
    | typeof REDIS
    | typeof NEXT_JS
    | typeof TAILWIND
    | typeof POSTHOG
    | typeof VULTR
    | typeof BUN
    | typeof PLAYWRIGHT
    | typeof SQLITE

export interface TechStackIconItem {
    icon: ComponentType<{ className?: string }>
    iconClassName?: string
    label: string
}

const techStackItemsByString: Record<TechStackString, TechStackIconItem> = {
    [VERCEL]: {
        label: VERCEL,
        icon: Logos.Vercel,
        iconClassName: "h-3.5 w-auto text-[#111]",
    },
    [TURSO]: { label: TURSO, icon: Logos.Turso, iconClassName: "h-4 w-auto" },
    [REDIS]: { label: REDIS, icon: Logos.Redis, iconClassName: "h-4 w-auto" },
    [NEXT_JS]: {
        label: NEXT_JS,
        icon: Logos.Nextjs,
        iconClassName: "h-4 w-auto",
    },
    [TAILWIND]: {
        label: TAILWIND,
        icon: Logos.Tailwind,
        iconClassName: "h-3 w-auto",
    },
    [POSTHOG]: {
        label: POSTHOG,
        icon: Logos.PostHog,
        iconClassName: "h-3 w-auto",
    },
    [VULTR]: {
        label: VULTR,
        icon: Logos.Vultr,
        iconClassName: "h-4 w-auto",
    },
    [BUN]: {
        label: BUN,
        icon: Logos.Bun,
        iconClassName: "h-4 w-auto",
    },
    [PLAYWRIGHT]: {
        label: PLAYWRIGHT,
        icon: Logos.Playwright,
        iconClassName: "h-6 w-auto",
    },
    [SQLITE]: {
        label: SQLITE,
        icon: Logos.SQLite,
        iconClassName: "h-4 w-auto",
    },
}

export function getTechStackAriaLabel(stack: readonly TechStackString[]) {
    if (stack.length === 0) {
        return "Built with our tech stack"
    }

    if (stack.length === 1) {
        return `Built with ${stack[0]}`
    }
    if (stack.length === 2) {
        return `Built with ${stack[0]} and ${stack[1]}`
    }

    return `Built with ${stack.slice(0, -1).join(", ")}, and ${stack.at(-1)}`
}

interface TechStackIconsProps {
    ariaLabel?: string
    className?: string
    iconButtonClassName?: string
    stack: TechStackString[]
}

export default function TechStackIcons({ stack, className, iconButtonClassName }: TechStackIconsProps) {
    const items = stack.map((item) => techStackItemsByString[item])

    return (
        <TooltipProvider>
            <div className={`flex items-center justify-end gap-0 ${className ?? ""}`.trim()}>
                {items.map(({ label, icon: Icon, iconClassName }) => (
                    <Tooltip key={label}>
                        <TooltipTrigger
                            aria-label={label}
                            className={`inline-flex items-center justify-center rounded-sm p-1 text-[#111] opacity-40 transition-transform hover:scale-105 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddd] ${iconButtonClassName ?? ""}`.trim()}
                            delay={0}
                        >
                            <Icon className={iconClassName} />
                        </TooltipTrigger>
                        <TooltipContent>{label}</TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </TooltipProvider>
    )
}
