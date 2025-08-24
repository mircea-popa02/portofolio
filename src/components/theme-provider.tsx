import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
}
const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    ...props
}: ThemeProviderProps) {
    // Initialize to stored theme if present, otherwise default to system
    const [theme, setThemeState] = useState<Theme>(() => {
        try {
            const stored = (typeof window !== "undefined"
                ? (localStorage.getItem(storageKey) as Theme | null)
                : null)
            return stored ?? defaultTheme
        } catch {
            return defaultTheme
        }
    })

    useEffect(() => {
        const root = window.document.documentElement
        const media = window.matchMedia("(prefers-color-scheme: dark)")

        const applyTheme = (t: Theme) => {
            root.classList.remove("light", "dark")
            if (t === "system") {
                root.classList.add(media.matches ? "dark" : "light")
            } else {
                root.classList.add(t)
            }
        }

        applyTheme(theme)

        // If following system, react to OS theme changes
        if (theme === "system") {
            const onChange = () => applyTheme("system")

            if (typeof media.addEventListener === "function") {
                media.addEventListener("change", onChange)
                return () => media.removeEventListener("change", onChange)
            }
            if (typeof media.addListener === "function") {
                media.addListener(onChange)
                return () => media.removeListener(onChange)
            }
        }
    }, [theme])

    const value = {
        theme,
        setTheme: (t: Theme) => {
            try {
                localStorage.setItem(storageKey, t)
            } catch {
                // ignore write errors (e.g., private mode)
                void 0
            }
            setThemeState(t)
        },
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}