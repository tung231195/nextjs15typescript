import { DiscountType } from "@/app/types";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type PriceProps = {
  amount: number;
  currency?: string;
  locale?: string;
  saleAmount?: DiscountType;
};

export default function PriceFormat({
  amount,
  currency: currencyProp,
  locale = "en",
  saleAmount,
}: PriceProps) {
  const [currency, setCurrency] = useState("USD");
  const [resolvedLocale, setResolvedLocale] = useState("en-US");

  /** Locale + currency resolve */
  useEffect(() => {
    switch (locale) {
      case "vi":
        setCurrency("VND");
        setResolvedLocale("vi-VN");
        break;
      case "de":
        setCurrency("EUR");
        setResolvedLocale("de-DE");
        break;
      default:
        setCurrency("USD");
        setResolvedLocale("en-US");
        break;
    }
  }, [locale]);

  /** Compute final price */
  const computeFinal = () => {
    const base = Number(amount);
    if (isNaN(base) || !saleAmount) return base;

    const value = Number(saleAmount.value);
    if (isNaN(value)) return base;

    if (saleAmount.type === "amount") {
      return Math.max(0, base - value);
    }

    if (saleAmount.type === "percent") {
      return Math.max(0, base - (base * value) / 100);
    }

    return base;
  };

  const finalPrice = computeFinal();
  const displayCurrency = currencyProp || currency;

  const formatter = new Intl.NumberFormat(resolvedLocale, {
    style: "currency",
    currency: displayCurrency,
  });

  const formattedBase = formatter.format(amount);
  const formattedFinal = formatter.format(finalPrice);

  return (
    <Box>
      {saleAmount ? (
        <>
          {/* Giá gạch ngang */}
          <Typography
            sx={{
              textDecoration: "line-through",
              opacity: 0.6,
              fontSize: "0.9rem",
            }}
          >
            {formattedBase}
          </Typography>

          {/* Giá cuối */}
          <Typography
            sx={{
              color: "red",
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            {formattedFinal}
          </Typography>
        </>
      ) : (
        <Typography sx={{ fontWeight: 700 }}>{formattedBase}</Typography>
      )}
    </Box>
  );
}
