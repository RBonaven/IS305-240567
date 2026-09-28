/*
  Program: Dining Meal Booking Feature
  Student Name: Raymond BONAVEN
  Student ID: 240567
  Date: 20 July 2026
*/

const readline = require("readline");
const Student = require("./student");
const MealBooking = require("./mealDining");

const DiningAccount = require("./DiningAccount");
const RewardsDiningAccount = require("./RewardsDiningAccount");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Store all meal bookings
const bookings = [];

// Ask user a question
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

// Display booking history for a student
function displayBookingHistory(student, bookingArray) {

    const studentBookings = bookingArray.filter(
        (booking) => booking.belongsTo(student)
    );

    console.log("\n========================================");
    console.log("          STUDENT INFORMATION");
    console.log("========================================");

    console.log(`Student ID: ${student.studentId}`);
    console.log(`Student Name: ${student.getFullName()}`);

    console.log("\n========================================");
    console.log("            BOOKING HISTORY");
    console.log("========================================");

    if (studentBookings.length === 0) {
        console.log("No bookings found.");
        console.log("========================================");
        return;
    }

    let combinedCost = 0;

    studentBookings.forEach((booking, index) => {

        console.log(
            `${index + 1}. ${booking.mealType} - ${booking.mealDate}`
        );

        console.log(`   Quantity: ${booking.quantity}`);
        console.log(`   Status: ${booking.bookingStatus}`);

        console.log(
            `   Cost: K${booking.calculateTotal().toFixed(2)}`
        );

        if (booking.dietaryNote) {
            console.log(
                `   Dietary Note: ${booking.dietaryNote}`
            );
        }

        console.log("");

        combinedCost += booking.calculateTotal();
    });

    console.log(
        `Total Bookings: ${studentBookings.length}`
    );

    console.log(
        `Combined Cost: K${combinedCost.toFixed(2)}`
    );

    console.log("========================================");
}

// Check for duplicate bookings
function isDuplicateBooking(newBooking, bookingArray) {

    return bookingArray.some(
        (existingBooking) =>
            existingBooking.student === newBooking.student &&
            existingBooking.mealDate === newBooking.mealDate &&
            existingBooking.mealType.toLowerCase() ===
                newBooking.mealType.toLowerCase()
    );
}

// ========================================
// LAB 3 PART 1 DEMONSTRATION
// ========================================

function demonstrateStandardAccount() {

    console.log("\n========================================");
    console.log("       STANDARD DINING ACCOUNT");
    console.log("========================================");

    // Create account with K1000 opening balance
    const diningAccount = new DiningAccount(
        "DA001",
        1000
    );

    console.log(
        `Account Number: ${diningAccount.accountNumber}`
    );

    console.log(
        `Opening Balance: K${diningAccount.getBalance().toFixed(2)}`
    );

    // Deposit K500
    diningAccount.deposit(
        500,
        "Weekly meal allowance"
    );

    console.log("Deposit: K500.00");

    // Pay K200 for meal
    const paymentSuccessful =
        diningAccount.payForMeal(
            200,
            "Meal payment"
        );

    console.log("Meal Payment: K200.00");

    if (paymentSuccessful) {
        console.log("Payment Status: Successful");
    } else {
        console.log(
            "Payment Status: Insufficient funds"
        );
    }

    console.log(
        `Final Balance: K${diningAccount.getBalance().toFixed(2)}`
    );

    console.log("========================================");

    return diningAccount;
}

// ========================================
// REWARDS ACCOUNT DEMONSTRATION
// ========================================

function demonstrateRewardsAccount() {

    console.log("\n========================================");
    console.log("        REWARDS DINING ACCOUNT");
    console.log("========================================");

    // Create RewardsDiningAccount
    const rewardsAccount =
        new RewardsDiningAccount(
            "RA001",
            1500,
            2.5
        );

    // Deposit K500
    rewardsAccount.deposit(
        500,
        "Weekly meal allowance"
    );

    console.log(
        `Account Number: ${rewardsAccount.accountNumber}`
    );

    console.log(
        `Balance Before Reward: K${rewardsAccount.getBalance().toFixed(2)}`
    );

    console.log(
        `Reward Rate: ${rewardsAccount.rewardRate}%`
    );

    // Calculate reward
    const reward =
        rewardsAccount.calculateReward();

    console.log(
        `Reward Earned: K${reward.toFixed(2)}`
    );

    // Apply reward
    rewardsAccount.applyReward();

    console.log(
        `Final Balance: K${rewardsAccount.getBalance().toFixed(2)}`
    );

    console.log("========================================");

    return rewardsAccount;
}

// ========================================
// MAIN APPLICATION
// ========================================

async function main() {

    try {

        // ========================================
        // LAB 3 PART 1
        // ========================================

        demonstrateStandardAccount();

        demonstrateRewardsAccount();


        // ========================================
        // CREATE STUDENT
        // ========================================

        console.log("\n========================================");
        console.log("           STUDENT DETAIL");
        console.log("========================================");

        const studentId =
            await askQuestion("Enter Student ID: ");

        const firstName =
            await askQuestion("Enter First Name: ");

        const lastName =
            await askQuestion("Enter Last Name: ");

        const student = new Student(
            studentId,
            firstName,
            lastName
        );

        console.log(
            "\nStudent created successfully."
        );

        student.displayInfo();


        // ========================================
        // CREATE FIRST MEAL BOOKING
        // ========================================

        console.log("\n========================================");
        console.log("          CREATE MEAL BOOKING");
        console.log("========================================");

        const mealDate =
            await askQuestion("Enter Meal Date: ");

        const mealType =
            await askQuestion(
                "Enter Meal Type (Breakfast/Lunch/Dinner): "
            );

        const quantity =
            await askQuestion("Enter Quantity: ");

        const dietaryNote =
            await askQuestion("Enter Dietary Note: ");

        const bookingStatus =
            await askQuestion(
                "Enter Booking Status (Confirmed/Pending/Cancelled): "
            );

        const booking = new MealBooking(
            student,
            mealDate,
            mealType,
            quantity,
            dietaryNote,
            bookingStatus
        );


        // ========================================
        // CHECK DUPLICATE BOOKING
        // ========================================

        if (isDuplicateBooking(
            booking,
            bookings
        )) {

            throw new Error(
                "Duplicate booking detected. " +
                "The student already has this meal booking."
            );
        }


        // Add booking to array
        bookings.push(booking);

        console.log(
            "\nBooking created successfully."
        );


        // ========================================
        // DISPLAY BOOKING
        // ========================================

        console.log("\n========================================");
        console.log("          BOOKING INFORMATION");
        console.log("========================================");

        console.log(
            booking.getSummary()
        );


        // ========================================
        // ASK FOR ANOTHER BOOKING
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

            const newBookingStatus =
                await askQuestion(
                    "Enter Booking Status (Confirmed/Pending/Cancelled): "
                );

            const newBooking =
                new MealBooking(
                    student,
                    newMealDate,
                    newMealType,
                    newQuantity,
                    newDietaryNote,
                    newBookingStatus
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

                bookings.push(newBooking);

                console.log(
                    "\nBooking added successfully."
                );
            }

            addAnother =
                await askQuestion(
                    "\nWould you like to add another booking? (yes/no): "
                );
        }


        // ========================================
        // DISPLAY BOOKING HISTORY
        // ========================================

        displayBookingHistory(
            student,
            bookings
        );


        // ========================================
        // UPDATE STUDENT NAME
        // ========================================

        const updateName =
            await askQuestion(
                "\nWould you like to update the student's name? (yes/no): "
            );

        if (
            updateName.toLowerCase() === "yes"
        ) {

            console.log("\n========================================");
            console.log("          UPDATE STUDENT");
            console.log("========================================");

            const newFirstName =
                await askQuestion(
                    "Enter new first name: "
                );

            const newLastName =
                await askQuestion(
                    "Enter new last name: "
                );

            // Use setters
            student.firstName = newFirstName;
            student.lastName = newLastName;

            console.log(
                "\nStudent information updated successfully."
            );

            // Display updated student
            student.displayInfo();

            console.log(
                "\nUpdated Booking History:"
            );

            displayBookingHistory(
                student,
                bookings
            );
        }

    } catch (error) {

        console.log("\n========================================");
        console.log("               ERROR");
        console.log("========================================");

        console.log(error.message);

        console.log("========================================");

    } finally {

        rl.close();
    }
}

// Start application
main();