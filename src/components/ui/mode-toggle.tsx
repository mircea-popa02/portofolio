import { Moon, Sun } from "lucide-react"
import { Switch } from '@/components/ui/switch';
import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [resolvedTheme, setResolvedTheme] = useState<string>("light");
    
    useEffect(() => {
        const updateResolvedTheme = () => {
            if (theme === "system") {
                const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                setResolvedTheme(systemTheme);
            } else {
                setResolvedTheme(theme);
            }
        };

        updateResolvedTheme();

        // Listen for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            if (theme === "system") {
                updateResolvedTheme();
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);
    
    const isDark = resolvedTheme === "dark";

    return (
        <div className="flex items-center gap-1">
            <Switch
                checked={isDark}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                aria-label="Toggle dark mode"
            />
            <span className="hidden md:inline-flex">
                {isDark ? (
                    <Moon className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                    <Sun className="h-[1.2rem] w-[1.2rem]" />
                )}
            </span>
        </div>
    )
}
