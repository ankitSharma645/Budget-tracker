const express = require("express");
const { loginController, registerController, authController } = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const { addIncome, getIncomes, deleteIncome } = require("../controllers/income");
const { addExpense, getExpense, deleteExpense } = require("../controllers/expense");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

router.post('/add-income',authMiddleware, addIncome)

router.get('/get-incomes',authMiddleware, getIncomes)

router.delete('/delete-income/:id', authMiddleware,deleteIncome)

router.post('/add-expense', authMiddleware,addExpense)

router.get('/get-expenses',authMiddleware, getExpense)

router.delete('/delete-expense/:id', authMiddleware, deleteExpense)

module.exports = router;
