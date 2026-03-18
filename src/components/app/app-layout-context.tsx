import { createContext, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useLocation } from "wouter";

type TAppLayoutContext = {
  scrolled: boolean;
  onScroll: React.UIEventHandler<HTMLDivElement>;
};

export const AppLayoutContext = createContext<TAppLayoutContext>(
  {} as TAppLayoutContext,
);

function AppLayoutContextProvider({ children }: PropsWithChildren) {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setScrolled(false);
  }, [location]);

  const onScroll = useCallback<React.UIEventHandler<HTMLDivElement>>((event) => {
    const scrollTop = event.currentTarget.scrollTop;
    setScrolled((prev) => (prev ? scrollTop > 0 : scrollTop > 200));
  }, []);

  return (
    <AppLayoutContext.Provider value={{ scrolled, onScroll }}>
      {children}
    </AppLayoutContext.Provider>
  );
}

export default AppLayoutContextProvider;
