import { useQuery } from "@tanstack/react-query";
import { GBP_TO_JPY_RATE } from "@/lib/currency";

// open.er-api.com is the free tier of ExchangeRate-API.
// It is explicitly CORS-enabled (no key required, updates daily from ECB data).
async function fetchGBPtoJPY(): Promise<number> {
  const res = await fetch("https://open.er-api.com/v6/latest/GBP");
  if (!res.ok) throw new Error(`Exchange rate fetch failed: ${res.status}`);
  const data = await res.json();
  if (data?.result !== "success") throw new Error("Exchange rate API returned non-success");
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
