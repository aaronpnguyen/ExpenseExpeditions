let transactionType = [
    "Housing", "Utilities", "Investments", "Groceries", "Gas", "Auto & Transport", "Travel", "Vacation",
    "Cell Phone", "Education", "Pets", "Clothing", "Shopping", "Subscriptions", "Loan Payment", "Social",
    "Dining & Drinks", "Entertainment", "Health & Wellness", "Medical", "Cash & Checks", "Miscellaneous",
    "Other"
]
transactionType.sort()
transactionType.unshift("Choose type")
transactionType.push("Other")
console.log(transactionType.length)

export const Categories = transactionType;

// CHART JS FORMATTING
export const ChartInfo = obj => {
    let chartInfo = {
        labels: Object.keys(obj),
        datasets: [{
            data: Object.values(obj),
            backgroundColor: [
                "#ffcd56", "#a336eb", "#4bc0c0", "#33FF6B",
                "#33FFC1", "#ff6384", "#36a2eb", "#333333",
                "#1a9979", "#bd3724", "#f70000", 
            ],
            borderColor: "black",
            borderWidth: 1,
            width: 300,
            hoverOffset: 5,
            cutout: 150
        }]
    }
    return chartInfo
};

export const DataParser = response => {
    let finance = response.data, expenseData = {}
    for (let i = 0; i < finance.length; i++) {
        let type = finance[i].type, amount = finance[i].amount;
        if (expenseData[type]) expenseData[type] += amount;
        else expenseData[type] = amount;
    }
    return expenseData
}

export const Sum = response => {
    let finance = response.data, sum = 0
    for (let i = 0; i < finance.length; i++) {
        sum += finance[i].amount;
    }
    return sum.toFixed(2)
}