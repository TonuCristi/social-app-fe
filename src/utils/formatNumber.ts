export const formatNumber = (value: number) =>
  Intl.NumberFormat("en", { notation: "compact" }).format(value);
