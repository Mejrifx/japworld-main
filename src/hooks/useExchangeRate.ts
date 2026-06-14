import { useQuery } from "@tanstack/react-query";
import { GBP_TO_JPY_RATE } from "@/lib/currency";

async function fetchGBPtoJPY(): Promise<number> {
  const res = await fetch("https://api.frankfurter.app/latest?from=GBP&to=JPY");
  if (!res.ok) throw new Error(`Exchange rate fetch failed: ${res.status}`);
  const data = await res.json();
  const rate = data?.rates?.JPY;
  if (!rate || typeof rate !== "number") throw new Error("Unexpected response shape");
  return rate;
}

export function useExchangeRate() {
  const { data, isLoading, isError, dataUpdatedAt } = useQuery({
    queryKey: ["exchange_rate", "GBP_JPY"],
    queryFn: fetchGBPtoJPY,
    // Refresh every hour — forex rate doesn't need to be tick-by-tick
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
    retry: 2,
    retryDelay: 3000,
  });

  return {
    // Fall back to the hardcoded constant if fetch fails or is still loading
    rate: data ?? GBP_TO_JPY_RATE,
    isLive: !isError && data !== undefined,
    isLoading,
    lastUpdated: dataUpdatedAt ? new Date(dataUpdatedAt) : null,
  };
}
