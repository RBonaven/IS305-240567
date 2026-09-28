class DiningAccount {
    #accountNumber;
    #balance;
    #transactions;

    constructor(accountNumber, openingBalance = 0) {

        // Validate account number
        if (!accountNumber || accountNumber.trim() === "") {
            throw new Error("Account number cannot be empty.");
        }

        // Validate opening balance
        const balance = Number(openingBalance);

        if (!Number.isFinite(balance) || balance < 0) {
            throw new Error("Opening balance cannot be negative.");
        }

        this.#accountNumber = accountNumber.trim();
        this.#balance = balance;
        this.#transactions = [];

        // Record opening balance as a transaction
        if (balance > 0) {
            this.#transactions.push({
                type: "Opening Balance",
                amount: balance,
                description: "Opening balance"
            });
        }
    }

    // Account number getter
    get accountNumber() {
        return this.#accountNumber;
    }

    // Deposit money
    // Supports:
    // deposit(500)
    // deposit(500, "Weekly meal allowance")
    deposit(amount, description = "Deposit") {

        const depositAmount = Number(amount);

        if (
            !Number.isFinite(depositAmount) ||
            depositAmount <= 0
        ) {
            throw new Error(
                "Deposit amount must be greater than zero."
            );
        }

        this.#balance += depositAmount;

        this.#transactions.push({
            type: "Deposit",
            amount: depositAmount,
            description: description || "Deposit"
        });

        return this.#balance;
    }

    // Pay for a meal
    payForMeal(amount, description = "Meal payment") {

        const paymentAmount = Number(amount);

        if (
            !Number.isFinite(paymentAmount) ||
            paymentAmount <= 0
        ) {
            throw new Error(
                "Meal payment amount must be greater than zero."
            );
        }

        // Standard account cannot go below zero
        if (paymentAmount > this.#balance) {
            return false;
        }

        this.#balance -= paymentAmount;

        this.#transactions.push({
            type: "Meal Payment",
            amount: paymentAmount,
            description: description
        });

        return true;
    }

    // Return current balance
    getBalance() {
        return this.#balance;
    }

    // Return a safe copy of transaction history
    getTransactions() {
        return this.#transactions.map(transaction => ({
            ...transaction
        }));
    }

    // Display account summary
    displayAccountSummary() {
        console.log("========================================");
        console.log("       STANDARD DINING ACCOUNT");
        console.log("========================================");
        console.log(`Account Number: ${this.#accountNumber}`);
        console.log("Account Type: Standard Dining Account");
        console.log(
            `Current Balance: K${this.#balance.toFixed(2)}`
        );
        console.log("========================================");
    }
}

module.exports = DiningAccount;