import {
    createContext,
    useContext,
    useState,
    type ReactNode,
  } from "react";
  
  type Theme = "light" | "dark";
  
  interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
  }
  
  const ThemeContext = createContext<ThemeContextValue | undefined>(
    undefined
  );
  
  /**
   * Determine theme immediately on first render.
   * This prevents dark→light flash.
   */
  function getInitialTheme(): Theme {
    if (typeof window === "undefined") return "dark";
  
    try {
      const saved = localStorage.getItem("theme") as Theme | null;
  
      if (saved === "light" || saved === "dark") {
        return saved;
      }
  
      // fallback to system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "dark";
    }
  }
  
  export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  
    const applyThemeToDOM = (newTheme: Theme) => {
      document.documentElement.classList.toggle(
        "dark",
        newTheme === "dark"
      );
    };
  
    const setTheme = (newTheme: Theme) => {
      setThemeState(newTheme);
      localStorage.setItem("theme", newTheme);
      applyThemeToDOM(newTheme);
    };
  
    const toggleTheme = () => {
      const next = theme === "dark" ? "light" : "dark";
      setTheme(next);
    };
  
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }
  
  export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
      throw new Error("useTheme must be used within ThemeProvider");
    }
    return ctx;
  }