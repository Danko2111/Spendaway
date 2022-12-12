const HashTransactions = (data, category) => {
  const hash = {};
  data
    .filter((transaction) => {
      if (category === "Income") {
        return transaction.category === "Income";
      } else {
        return transaction.category !== "Income";
      }
    })
    .map((transaction) => {
      const month = new Date(transaction.date).toLocaleString("default", {
        month: "long",
      });

      if (!hash[month]) {
        hash[month] = transaction.amount;
      } else {
        hash[month] += transaction.amount;
      }

      return {
        month: month,
        amount: transaction.amount,
      };
    });

  const labels = [];
  const transactionArr = [];

  for (const key in hash) {
    transactionArr.push(hash[key]);
    labels.push(key);
  }
  return [labels, transactionArr];
};

export default HashTransactions;
