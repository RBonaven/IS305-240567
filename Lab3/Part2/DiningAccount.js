/*
  Program: Dining Meal Booking Feature
  Student Name: Raymond BONAVEN
  Student ID: 240567
  Date: 20 July 2026
*/

const readline = require("readline");

const Student = require("./student");
const MealBooking = require("./mealDining");

const DiningAccount =
    require("./DiningAccount");

const RewardsDiningAccount =
    require("./RewardsDiningAccount");

const CreditDiningAccount =
    require("./CreditDiningAccount");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// Store all meal bookings
const bookings = [];


// Ask question
function askQuestion(question) {

    return new Promise((resolve) => {

        rl.question(question, (answer) => {
            resolve(answer);
        });

    });
}


// ========================================
// DISPLAY TRANSACTION HISTORY
// ========================================

function displayTransactionHistory(account) {

    console.log("\n========================================");
    console.log("          TRANSACTION HISTORY");
    console.log("========================================");

    const transactions =
        account.getTransactions();

    if (transactions.length === 0) {

        console.log("No transactions found.");
        console.log("========================================");

        return;
    }

    transactions.forEach(
        (transaction, index) => {

            console.log(
                `${index + 1}. ${transaction.type} - K${transaction.amount.toFixed(2)}`
            );

            console.log(
                `   Description: ${transaction.description}`
            );

            console.log(
                `   Date and Time: ${transaction.dateTime}`
            );

            console.log(
                `   Balance: K${transaction.balanceAfter.toFixed(2)}`
            );

            console.log("");
        }
    );

    console.log(
        `Total Transactions: ${transactions.length}`
    );

    console.log("========================================");
}


// ========================================
// DISPLAY BOOKING HISTORY
// ========================================

function displayBookingHistory(
    student,
    bookingArray
) {

    const studentBookings =
        bookingArray.filter(
            booking =>
                booking.belongsTo(student)
        );

    console.log("\n========================================");
    console.log("          STUDENT INFORMATION");
    console.log("========================================");

    console.log(
        `Student ID: ${student.studentId}`
    );

    console.log(
        `Student Name: ${student.getFullName()}`
    );

    console.log("\n========================================");
    console.log("            BOOKING HISTORY");
    console.log("========================================");

    if (studentBookings.length === 0) {

        console.log("No bookings found.");
        console.log("========================================");

        return;
    }

    let combinedCost = 0;

    studentBookings.forEach(
        (booking, index) => {

            console.log(
                `${index + 1}. ${booking.mealType} - ${booking.mealDate}`
            );

            console.log(
                `   Quantity: ${booking.quantity}`
            );

            console.log(
                `   Status: ${booking.bookingStatus}`
            );

            console.log(
                `   Cost: K${booking.calculateTotal().toFixed(2)}`
            );

            console.log(
                `   Paid: ${booking.isPaid() ? "Yes" : "No"}`
            );

            if (booking.dietaryNote) {

                console.log(
                    `   Dietary Note: ${booking.dietaryNote}`
                );
            }

            console.log("");

            combinedCost +=
                booking.calculateTotal();
        }
    );

    console.log(
        `Total Bookings: ${studentBookings.length}`
    );

    console.log(
        `Combined Cost: K${combinedCost.toFixed(2)}`
    );

    console.log("========================================");
}


// ========================================
// DUPLICATE BOOKING CHECK
// ========================================

function isDuplicateBooking(
    newBooking,
    bookingArray
) {

    return bookingArray.some(
        existingBooking =>

            existingBooking.student ===
                newBooking.student &&

            existingBooking.mealDate ===
                newBooking.mealDate &&

            existingBooking.mealType.toLowerCase() ===
                newBooking.mealType.toLowerCase()
    );
}


// ========================================
// PART 1 DEMONSTRATION
// ========================================

function demonstrateStandardAccount() {

    console.log("\n========================================");
    console.log("       STANDARD DINING ACCOUNT");
    console.log("========================================");

    const account =
        new DiningAccount(
            "DA001",
            1000
        );

    console.log(
        `Account Number: ${account.accountNumber}`
    );

    console.log(
        `Opening Balance: K${account.getBalance().toFixed(2)}`
    );

    account.deposit(
        500,
        "Weekly meal allowance"
    );

    console.log(
        "Deposit: K500.00"
    );

    const successful =
        account.payForMeal(
            200,
            "Meal payment"
        );

    console.log(
        "Meal Payment: K200.00"
    );

    console.log(
        `Payment Status: ${
            successful
                ? "Successful"
                : "Rejected"
        }`
    );

    console.log(
        `Final Balance: K${account.getBalance().toFixed(2)}`
    );

    console.log("========================================");

    return account;
}


// ========================================
// REWARDS DEMONSTRATION
// ========================================

function demonstrateRewardsAccount() {

    console.log("\n========================================");
    console.log("        REWARDS DINING ACCOUNT");
    console.log("========================================");

    const account =
        new RewardsDiningAccount(
            "RA001",
            1500,
            2.5
        );

    account.deposit(
        500,
        "Weekly meal allowance"
    );

    console.log(
        `Account Number: ${account.accountNumber}`
    );

    console.log(
        `Balance Before Reward: K${account.getBalance().toFixed(2)}`
    );

    console.log(
        `Reward Rate: ${account.rewardRate}%`
    );

    const reward =
        account.calculateReward();

    console.log(
        `Reward Earned: K${reward.toFixed(2)}`
    );

    account.applyReward();

    console.log(
        `Final Balance: K${account.getBalance().toFixed(2)}`
    );

    console.log("========================================");

    return account;
}


// ========================================
// CREDIT ACCOUNT DEMONSTRATION
// ========================================

function demonstrateCreditAccount() {

    console.log("\n========================================");
    console.log("         CREDIT DINING ACCOUNT");
    console.log("========================================");

    const account =
        new CreditDiningAccount(
            "CA001",
            1000,
            500
        );

    console.log(
        `Account Number: ${account.accountNumber}`
    );

    console.log(
        `Opening Balance: K${account.getBalance().toFixed(2)}`
    );

    console.log(
        `Credit Limit: K${account.creditLimit.toFixed(2)}`
    );

    // K1500 payment should succeed
    console.log(
        "\nAttempting K1500 payment..."
    );

    const successful =
        account.payForMeal(
            1500,
            "Catering payment"
        );

    if (successful) {

        console.log(
            "Payment Status: Successful"
        );

    } else {

        console.log(
            "Payment Status: Rejected"
        );
    }

    console.log(
        `Resulting Balance: K${account.getBalance().toFixed(2)}`
    );

    // Exceed credit limit
    console.log(
        "\nAttempting another K1.00 payment..."
    );

    const secondPayment =
        account.payForMeal(
            1,
            "Additional meal"
        );

    if (!secondPayment) {

        console.log(
            "Payment Status: Rejected - Credit limit exceeded."
        );
    }

    console.log(
        `Final Balance: K${account.getBalance().toFixed(2)}`
    );

    console.log("========================================");

    return account;
}


// ========================================
// POLYMORPHISM DEMONSTRATION
// ========================================

function demonstratePolymorphism(
    standardAccount,
    rewardsAccount,
    creditAccount
) {

    console.log("\n========================================");
    console.log("          POLYMORPHISM TEST");
    console.log("========================================");

    const diningAccounts = [
        standardAccount,
        rewardsAccount,
        creditAccount
    ];

    for (
        const account of diningAccounts
    ) {

        account.displayAccountSummary();
    }
}


// ========================================
// METHOD / CONSTRUCTOR OVERLOADING
// ========================================

function demonstrateOverloading() {

    console.log("\n========================================");
    console.log("       OVERLOADING DEMONSTRATION");
    console.log("========================================");

    // Constructor variations
    const account1 =
        new DiningAccount("DA002");

    const account2 =
        new DiningAccount(
            "DA003",
            500
        );

    console.log(
        `DA002 Balance: K${account1.getBalance().toFixed(2)}`
    );

    console.log(
        `DA003 Balance: K${account2.getBalance().toFixed(2)}`
    );

    // Method variations
    account1.deposit(100);

    account1.deposit(
        100,
        "Additional meal funds"
    );

    console.log(
        `DA002 Balance After Deposits: K${account1.getBalance().toFixed(2)}`
    );

    console.log("========================================");
}


// ========================================
// MAIN APPLICATION
// ========================================

async function main() {

    try {

        // ========================================
        // PART 1 ACCOUNTS
        // ========================================

        const standardAccount =
            demonstrateStandardAccount();

        const rewardsAccount =
            demonstrateRewardsAccount();


        // ========================================
        // CREDIT ACCOUNT
        // ========================================

        const creditAccount =
            demonstrateCreditAccount();


        // ========================================
        // POLYMORPHISM
        // ========================================

        demonstratePolymorphism(
            standardAccount,
            rewardsAccount,
            creditAccount
        );


        // ========================================
        // CONSTRUCTOR/METHOD OVERLOADING
        // ========================================

        demonstrateOverloading();


        // ========================================
        // CREATE STUDENT
        // ========================================

        console.log("\n========================================");
        console.log("           STUDENT DETAIL");
        console.log("========================================");

        const studentId =
            await askQuestion(
                "Enter Student ID: "
            );

        const firstName =
            await askQuestion(
                "Enter First Name: "
            );

        const lastName =
            await askQuestion(
                "Enter Last Name: "
            );

        const student =
            new Student(
                studentId,
                firstName,
                lastName
            );

        console.log(
            "\nStudent created successfully."
        );


        // ========================================
        // ASSIGN DINING ACCOUNT
        // ========================================

        student.assignDiningAccount(
            rewardsAccount
        );

        console.log(
            `Dining account ${rewardsAccount.accountNumber} assigned to student.`
        );

        student.displayInfo();


        // ========================================
        // CREATE MEAL BOOKING
        // ========================================

        console.log("\n========================================");
        console.log("          CREATE MEAL BOOKING");
        console.log("========================================");

        const mealDate =
            await askQuestion(
                "Enter Meal Date: "
            );

        const mealType =
            await askQuestion(
                "Enter Meal Type (Breakfast/Lunch/Dinner): "
            );

        const quantity =
            await askQuestion(
                "Enter Quantity: "
            );

        const dietaryNote =
            await askQuestion(
                "Enter Dietary Note: "
            );

        // Booking starts as Pending
        const booking =
            new MealBooking(
                student,
                mealDate,
                mealType,
                quantity,
                dietaryNote,
                "Pending"
            );


        // ========================================
        // DUPLICATE BOOKING CHECK
        // ========================================

        if (
            isDuplicateBooking(
                booking,
                bookings
            )
        ) {

            throw new Error(
                "Duplicate booking detected."
            );
        }

        bookings.push(booking);


        // ========================================
        // DISPLAY BOOKING
        // ========================================

        console.log("\n========================================");
        console.log("             MEAL BOOKING");
        console.log("========================================");

        console.log(
            `Meal: ${booking.mealType}`
        );

        console.log(
            `Quantity: ${booking.quantity}`
        );

        console.log(
            `Total Cost: K${booking.calculateTotal().toFixed(2)}`
        );

        console.log(
            `Booking Status: ${booking.bookingStatus}`
        );


        // ========================================
        // PROCESS PAYMENT
        // ========================================

        console.log("\n========================================");
        console.log("          PROCESSING PAYMENT");
        console.log("========================================");

        const paymentResult =
            booking.processPayment(
                student.diningAccount
            );

        if (paymentResult) {

            console.log(
                `Payment Status: Successful`
            );

            console.log(
                `Booking Status: ${booking.bookingStatus}`
            );

            console.log(
                `Remaining Balance: K${student.diningAccount.getBalance().toFixed(2)}`
            );

        } else {

            console.log(
                "Payment Status: Failed"
            );

            console.log(
                `Booking Status: ${booking.bookingStatus}`
            );
        }


        // ========================================
        // DUPLICATE PAYMENT TEST
        // ========================================

        console.log("\n========================================");
        console.log("       DUPLICATE PAYMENT TEST");
        console.log("========================================");

        console.log(
            "Attempting to pay for the same booking again..."
        );

        booking.processPayment(
            student.diningAccount
        );


        // ========================================
        // TRANSACTION HISTORY
        // ========================================

        displayTransactionHistory(
            student.diningAccount
        );


        // ========================================
        // BOOKING HISTORY
        // ========================================

        displayBookingHistory(
            student,
            bookings
        );


        // ========================================
        // ADDITIONAL BOOKINGS
        // ========================================

        let addAnother =
            await askQuestion(
                "\nWould you like to add another booking? (yes/no): "
            );

        while (
            addAnother.toLowerCase() === "yes"
        ) {

            console.log("\n========================================");
            console.log("        CREATE ANOTHER BOOKING");
            console.log("========================================");

            const newMealDate =
                await askQuestion(
                    "Enter Meal Date: "
                );

            const newMealType =
                await askQuestion(
                    "Enter Meal Type (Breakfast/Lunch/Dinner): "
                );

            const newQuantity =
                await askQuestion(
                    "Enter Quantity: "
                );

            const newDietaryNote =
                await askQuestion(
                    "Enter Dietary Note: "
                );

            const newBooking =
                new MealBooking(
                    student,
                    newMealDate,
                    newMealType,
                    newQuantity,
                    newDietaryNote,
                    "Pending"
                );


            if (
                isDuplicateBooking(
                    newBooking,
                    bookings
                )
            ) {

                console.log(
                    "\nDuplicate booking detected."
                );

                console.log(
                    "This booking was not added."
                );

            } else {

                bookings.push(
                    newBooking
                );

                console.log(
                    "\nBooking added successfully."
                );

                // Process payment
                console.log(
                    "\nProcessing payment..."
                );

                newBooking.processPayment(
                    student.diningAccount
                );
            }


            addAnother =
                await askQuestion(
                    "\nWould you like to add another booking? (yes/no): "
                );
        }


        // ========================================
        // FINAL TRANSACTION HISTORY
        // ========================================

        displayTransactionHistory(
            student.diningAccount
        );


        // ========================================
        // FINAL BOOKING HISTORY
        // ========================================

        displayBookingHistory(
            student,
            bookings
        );

    } catch (error) {

        console.log("\n========================================");
        console.log("               ERROR");
        console.log("========================================");

        console.log(
            error.message
        );

        console.log("========================================");

    } finally {

        rl.close();
    }
}


// Start application
main();