const crypto = require("crypto");

let expenses = [];

exports.createExpense = (req, res) => {
    const { amount, category, description, date } = req.body;

    // Duplicate prevention
    const existing = expenses.find(
        (e) =>
            e.amount == amount &&
            e.category === category &&
            e.description === description &&
            e.date === date
    );

    if (existing) return res.json(existing);

    const newExpense = {
        id: crypto.randomUUID(),
        amount,
        category,
        description,
        date,
        created_at: new Date().toISOString(),
    };

    expenses.push(newExpense);

    res.json(newExpense);
};

exports.getExpenses = (req, res) => {
    let result = [...expenses];
    const { category, sort } = req.query;

    // Filter
    if (category) {
        result = result.filter((e) =>
            e.category.toLowerCase().includes(category.toLowerCase())
        );
    }

    // Sort
    if (sort === "date_desc") {
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === "date_asc") {
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    res.json(result);
};