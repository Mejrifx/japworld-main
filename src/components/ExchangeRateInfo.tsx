import { Info } from "lucide-react";
import { getExchangeRateInfo } from "@/lib/currency";

interface ExchangeRateInfoProps {
  className?: string;
  variant?: "default" | "minimal";
}

export const ExchangeRateInfo = ({ className = "", variant = "default" }: ExchangeRateInfoProps) => {
  if (variant === "minimal") {
    return (
      <div className={`flex items-center gap-2 text-xs text-muted-foreground ${className}`}>
        <Info className="h-3 w-3 flex-shrink-0" />
        <span>{getExchangeRateInfo()}</span>
      </div>
    );
  }

  return (
    <div className={`border-shoji bg-card/40 p-4 ${className}`}>
      <div className="flex items-start gap-2">
        <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="text-foreground font-medium mb-1">Currency Information</p>
          <p className="text-muted-foreground">
            All amounts are displayed in Japanese Yen (¥) with GBP conversion for reference.
          </p>
          <p className="text-muted-foreground mt-1">
            {getExchangeRateInfo()}
          </p>
        </div>
      </div>
    </div>
  );
};
