import {
    createContext,
    useContext,
    useEffect,
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
  
  export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("dark");
  
    // Load saved theme
    useEffect(() => {
      const saved = localStorage.getItem("theme") as Theme | null;
  
      if (saved) {
        setThemeState(saved);
        document.documentElement.classList.toggle(
          "dark",
          saved === "dark"
        );
      } else {
        // Default to dark (your project base)
        document.documentElement.classList.add("dark");
      }
    }, []);
  
    const setTheme = (newTheme: Theme) => {
      setThemeState(newTheme);
      localStorage.setItem("theme", newTheme);
  
      document.documentElement.classList.toggle(
        "dark",
        newTheme === "dark"
      );
    };
  
    const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
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