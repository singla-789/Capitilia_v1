export const prepareIncomeLineChartData = (transactions = []) => {
  if (!Array.isArray(transactions)) return [];

  const grouped = {};

  transactions.forEach((tx) => {
    if (!tx?.date || typeof tx.amount !== "number") return;

    if (!grouped[tx.date]) {
      const d = new Date(tx.date);
      grouped[tx.date] = {
        date: tx.date,
        month: d.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        }),
        totalAmount: 0,   // ✅ aggregate here
        items: [],
      };
    }

    grouped[tx.date].items.push(tx);
    grouped[tx.date].totalAmount += tx.amount;
  });

  return Object.values(grouped).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
};
