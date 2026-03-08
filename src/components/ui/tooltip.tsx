import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider(props: TooltipPrimitive.Provider.Props) {
    return <TooltipPrimitive.Provider data-slot="tooltip-provider" {...props} />
}

function Tooltip(props: TooltipPrimitive.Root.Props) {
    return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger(props: TooltipPrimitive.Trigger.Props) {
    return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
    className,
    sideOffset = 6,
    ...props
}: TooltipPrimitive.Popup.Props & {
    sideOffset?: number
}) {
    return (
        <TooltipPrimitive.Portal>
            <TooltipPrimitive.Positioner sideOffset={sideOffset}>
                <TooltipPrimitive.Popup
                    className={cn(
                        "z-50 overflow-hidden whitespace-nowrap rounded-md bg-[#111] px-2 py-1 font-medium text-[0.72rem] text-white shadow-sm",
                        "transition duration-150 data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
                        className,
                    )}
                    data-slot="tooltip-content"
                    {...props}
                />
            </TooltipPrimitive.Positioner>
        </TooltipPrimitive.Portal>
    )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
