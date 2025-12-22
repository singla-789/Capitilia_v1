export const prepareExpenseLineChartData = (transactions = []) => {
  if (!Array.isArray(transactions)) return [];

  const grouped = {};

  transactions.forEach((tx) => {
    if (!tx?.date || typeof tx.amount !== "number") return;

    if (!grouped[tx.date]) {
      const d = new Date(tx.date);

      grouped[tx.date] = {
        date: d.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        }),
        amount: 0,
        items: [], // ✅ REQUIRED
      };
    }

    grouped[tx.date].amount += tx.amount;
    grouped[tx.date].items.push({
      id: tx.id,
      name: tx.name,
      categoryName: tx.categoryName,
      amount: tx.amount,
    });
  });

  return Object.values(grouped);
};
