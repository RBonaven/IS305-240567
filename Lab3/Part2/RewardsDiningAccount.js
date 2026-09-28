const DiningAccount = require("./DiningAccount");

class RewardsDiningAccount extends DiningAccount {

    #rewardRate;

    constructor(
        accountNumber,
        openingBalance = 0,
        rewardRate = 0
    ) {

        // Constructor chaining
        super(accountNumber, openingBalance);

        const rate = Number(rewardRate);

        if (
            !Number.isFinite(rate) ||
            rate < 0
        ) {
            throw new Error(
                "Reward rate cannot be negative."
            );
        }

        this.#rewardRate = rate;
    }

    // Reward rate getter
    get rewardRate() {
        return this.#rewardRate;
    }

    // Calculate reward
    calculateReward() {

        return (
            this.getBalance() *
            this.#rewardRate /
            100
        );
    }

    // Apply reward
    applyReward() {

        const reward =
            this.calculateReward();

        if (reward > 0) {

            this.deposit(
                reward,
                "Dining rewards"
            );
        }

        return reward;
    }

    // Display account summary
    displayAccountSummary() {

        console.log("========================================");
        console.log("        REWARDS DINING ACCOUNT");
        console.log("========================================");

        console.log(
            `Account Number: ${this.accountNumber}`
        );

        console.log(
            "Account Type: Rewards Dining Account"
        );

        console.log(
            `Reward Rate: ${this.#rewardRate}%`
        );

        console.log(
            `Current Balance: K${this.getBalance().toFixed(2)}`
        );

        console.log("========================================");
    }
}

module.exports = RewardsDiningAccount;