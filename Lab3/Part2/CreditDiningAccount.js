const DiningAccount = require("./DiningAccount");

class CreditDiningAccount extends DiningAccount {

    #creditLimit;

    constructor(
        accountNumber,
        openingBalance = 0,
        creditLimit = 0
    ) {

        // Constructor chaining
        super(accountNumber, openingBalance);

        const limit = Number(creditLimit);

        if (
            !Number.isFinite(limit) ||
            limit < 0
        ) {
            throw new Error(
                "Credit limit cannot be negative."
            );
        }

        this.#creditLimit = limit;
    }

    // Credit limit getter
    get creditLimit() {
        return this.#creditLimit;
    }

    // Override payForMeal()
    payForMeal(
        amount,
        description = "Meal payment"
    ) {

        const paymentAmount = Number(amount);

        if (
            !Number.isFinite(paymentAmount) ||
            paymentAmount <= 0
        ) {
            throw new Error(
                "Meal payment amount must be greater than zero."
            );
        }

        const currentBalance =
            this.getBalance();

        // Lowest allowed balance
        const minimumBalance =
            -this.#creditLimit;

        const resultingBalance =
            currentBalance - paymentAmount;

        // Check credit limit
        if (
            resultingBalance < minimumBalance
        ) {

            console.log(
                "Payment rejected: Credit limit exceeded."
            );

            console.log(
                `Available credit limit: K${this.#creditLimit.toFixed(2)}`
            );

            return false;
        }

        // Payment accepted
        this.setBalance(resultingBalance);

        this.recordTransaction(
            "Meal Payment",
            paymentAmount,
            description
        );

        return true;
    }

    // Display account summary
    displayAccountSummary() {

        console.log("========================================");
        console.log("         CREDIT DINING ACCOUNT");
        console.log("========================================");

        console.log(
            `Account Number: ${this.accountNumber}`
        );

        console.log(
            "Account Type: Credit Dining Account"
        );

        console.log(
            `Credit Limit: K${this.#creditLimit.toFixed(2)}`
        );

        console.log(
            `Current Balance: K${this.getBalance().toFixed(2)}`
        );

        console.log("========================================");
    }
}

module.exports = CreditDiningAccount;