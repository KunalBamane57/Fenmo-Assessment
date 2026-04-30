const express = require("express");
const router = express.Router();

const {
    createExpense,
    getExpenses,
} = require("../controllers/expenseController");

router.post("/expenses", createExpense);
router.get("/expenses", getExpenses);

module.exports = router;