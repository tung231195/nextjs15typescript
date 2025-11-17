export type Overview = {
  icon: string; // icon name from Iconify
  title: string;
  total: string;
  cash?: string;
  card?: string;
  credit?: string;
  color: string;
};

const overviews: Overview[] = [
  {
    icon: "mdi:cash",
    title: "Today Orders",
    total: "$1200",
    cash: "$500",
    card: "$400",
    credit: "$300",
    color: "#1976d2",
  },
  {
    icon: "mdi:credit-card",
    title: "Yesterday Orders",
    total: "$800",
    cash: "$0",
    card: "$500",
    credit: "$300",
    color: "#9c27b0",
  },
  {
    icon: "mdi:wallet",
    title: "This Month",
    total: "$600",

    color: "#4caf50",
  },
  {
    icon: "mdi:bank-transfer",
    title: "Last Month",
    total: "$400",

    color: "#f44336",
  },
  {
    icon: "mdi:cash-multiple",
    title: "All-Time Sales",
    total: "$200",
    color: "#ff9800",
  },
];

export { overviews };
