import { createContext, useContext } from "react";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { GBP_TO_JPY_RATE } from "@/lib/currency";

interface ExchangeRateContextValue {
  rate: number;
  isLive: boolean;
  isLoading: boolean;
  lastUpdated: Date | null;
}

const ExchangeRateContext = createContext<ExchangeRateContextValue>({
  rate: GBP_TO_JPY_RATE,
  isLive: false,
  isLoading: false,
  lastUpdated: null,
});

export function ExchangeRateProvider({ children }: { children: React.ReactNode }) {
  const value = useExchangeRate();
  return (
    <ExchangeRateContext.Provider value={value}>
      {children}
    </ExchangeRateContext.Provider>
  );
}

export function useExchangeRateContext() {
  return useContext(ExchangeRateContext);
}
