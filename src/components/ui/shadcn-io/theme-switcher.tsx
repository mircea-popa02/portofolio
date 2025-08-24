'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Monitor, Moon, Sun } from 'lucide-react'
import clsx from 'clsx'

export type ThemeSwitcherValue = 'light' | 'dark' | 'system'

export type ThemeSwitcherProps = {
  value?: ThemeSwitcherValue
  onChange?: (theme: ThemeSwitcherValue) => void
  defaultValue?: ThemeSwitcherValue
  className?: string
}

const themes = [
  { key: 'system', icon: Monitor, label: 'System theme' },
  { key: 'light', icon: Sun, label: 'Light theme' },
  { key: 'dark', icon: Moon, label: 'Dark theme' },
] as const

export const ThemeSwitcher = ({
  value,
  onChange,
  defaultValue = 'system',
  className,
}: ThemeSwitcherProps) => {
  // Controlled/uncontrolled support (no external dependency)
  const [uncontrolled, setUncontrolled] = useState<ThemeSwitcherValue>(defaultValue)
  const isControlled = value !== undefined
  const theme = (isControlled ? value : uncontrolled) ?? 'system'

  const setTheme = useCallback(
    (next: ThemeSwitcherValue) => {
      if (!isControlled) setUncontrolled(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )

  // Prevent hydration mismatch in SSR contexts (harmless in Vite, safe for Next)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div
      className={clsx(
        'relative isolate flex h-8 rounded-full bg-background p-1 ring-1 ring-border scale-125',
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key
        return (
          <button
            aria-label={label}
            className="relative h-6 w-6 rounded-full"
            key={key}
            onClick={() => setTheme(key)}
            type="button"
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-secondary"
                layoutId="activeTheme"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <Icon
              className={clsx(
                'relative z-10 m-auto h-4 w-4',
                isActive ? 'text-foreground' : 'text-muted-foreground'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

export default ThemeSwitcher
