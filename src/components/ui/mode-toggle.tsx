import { useTheme } from "@/components/theme-provider"
import { ThemeSwitcher } from "@/components/ui/shadcn-io/theme-switcher"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <ThemeSwitcher
            value={theme}
            onChange={setTheme}
            defaultValue="system"
            aria-label="Theme switcher"
        />
    )
}
