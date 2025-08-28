import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

// Detect if the current environment is likely a touch device
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return
    }
    const mql = window.matchMedia("(hover: none), (pointer: coarse)")
    const update = () => setIsTouch(mql.matches)
    update()
    // Older browsers
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update)
      return () => mql.removeEventListener("change", update)
    } else if (typeof mql.addListener === "function") {
      mql.addListener(update)
      return () => mql.removeListener(update)
    }
  }, [])

  return isTouch
}

// Context to control tooltip on touch devices
const TouchTooltipContext = React.createContext<{
  isTouch: boolean
  open: boolean
  openFromTrigger: () => void
} | null>(null)

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  const isTouch = useIsTouchDevice()
  const [open, setOpen] = React.useState(false)
  const lastManualOpenTs = React.useRef<number>(0)

  const { children, onOpenChange, ...rest } = props

  const handleOpenChange = (next: boolean) => {
    if (!isTouch) {
      onOpenChange?.(next)
      setOpen(next)
      return
    }
    // On touch, ignore the very first close right after a manual open (tap)
    if (!next && Date.now() - lastManualOpenTs.current < 700) {
      return
    }
    setOpen(next)
    onOpenChange?.(next)
  }

  const openFromTrigger = () => {
    setOpen((prev) => {
      if (!prev) {
        lastManualOpenTs.current = Date.now()
        return true
      }
      return prev
    })
  }

  return (
    <TooltipProvider>
      {isTouch ? (
        <TouchTooltipContext.Provider value={{ isTouch, open, openFromTrigger }}>
          <TooltipPrimitive.Root
            data-slot="tooltip"
            {...rest}
            disableHoverableContent
            open={open}
            onOpenChange={handleOpenChange}
          >
            {children}
          </TooltipPrimitive.Root>
        </TouchTooltipContext.Provider>
      ) : (
        <TooltipPrimitive.Root data-slot="tooltip" {...props} />
      )}
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  const touchCtx = React.useContext(TouchTooltipContext)
  const isTouch = !!touchCtx?.isTouch

  const { tabIndex, ...rest } = props

  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      // Ensure focusability for non-interactive elements like span when used with asChild
      tabIndex={tabIndex ?? (isTouch ? 0 : undefined)}
      onPointerDownCapture={
        isTouch
          ? (e) => {
              if (e.pointerType === "touch") {
                // Open on touch down to avoid synthetic click closing immediately
                e.preventDefault()
                e.stopPropagation()
                touchCtx?.openFromTrigger()
              }
            }
          : undefined
      }
      onClickCapture={
        isTouch
          ? (e) => {
              // Guard against any synthetic click that still fires
              e.preventDefault()
              e.stopPropagation()
            }
          : undefined
      }
      {...rest}
    />
  )
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-[var(--radix-tooltip-content-transform-origin)] rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
