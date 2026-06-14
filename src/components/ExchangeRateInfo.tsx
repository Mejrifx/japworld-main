import { Info, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { format } from "date-fns";
import { useExchangeRateContext } from "@/contexts/ExchangeRateContext";
import { getExchangeRateInfo } from "@/lib/currency";

interface ExchangeRateInfoProps {
  className?: string;
  variant?: "default" | "minimal";
}

export const ExchangeRateInfo = ({ className = "", variant = "default" }: ExchangeRateInfoProps) => {
  const { rate, isLive, isLoading, lastUpdated } = useExchangeRateContext();
  const rateText = getExchangeRateInfo(rate);

  if (variant === "minimal") {
    return (
      <div className={`flex items-center gap-2 text-xs text-muted-foreground ${className}`}>
        <Info className="h-3 w-3 flex-shrink-0" />
        <span>{rateText}</span>
        {isLoading ? (
          <RefreshCw className="h-3 w-3 animate-spin opacity-60" />
        ) : isLive ? (
          <span className="text-emerald-400/70 flex items-center gap-1">
            <Wifi className="h-3 w-3" />
            live
          </span>
        ) : (
          <span className="text-amber-400/70 flex items-center gap-1">
            <WifiOff className="h-3 w-3" />
            est.
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`border-shoji bg-card/40 p-4 ${className}`}>
      <div className="flex items-start gap-2">
        <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-xs w-full">
          <div className="flex items-center justify-between mb-1">
            <p className="text-foreground font-medium">Currency Information</p>
            {isLoading ? (
              <span className="flex items-center gap-1 text-muted-foreground">
                <RefreshCw className="h-3 w-3 animate-spin" />
                Fetching live rate…
              </span>
            ) : isLive ? (
              <span className="flex items-center gap-1 text-emerald-400">
                <Wifi className="h-3 w-3" />
                Live rate
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-400">
                <WifiOff className="h-3 w-3" />
                Estimated rate
              </span>
            )}
          </div>
          <p className="text-muted-foreground">
            All amounts are displayed in Japanese Yen (¥) with GBP conversion for reference.
          </p>
          <p className="text-muted-foreground mt-1 font-medium">{rateText}</p>
          {lastUpdated && isLive && (
            <p className="text-muted-foreground/60 mt-1">
              Updated {format(lastUpdated, "d MMM yyyy 'at' HH:mm")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
