class MealBooking {

    #student;
    #mealDate;
    #mealType;
    #quantity;
    #dietaryNote;
    #bookingStatus;
    #paymentProcessed;

    constructor(
        student,
        mealDate,
        mealType,
        quantity,
        dietaryNote = "",
        bookingStatus = "Pending"
    ) {

        // Validate Student object
        if (
            !student ||
            student.constructor.name !== "Student"
        ) {
            throw new Error(
                "A valid Student object is required."
            );
        }

        this.#student = student;

        this.mealDate = mealDate;
        this.mealType = mealType;
        this.quantity = quantity;
        this.dietaryNote = dietaryNote;
        this.bookingStatus = bookingStatus;

        // Payment has not happened
        this.#paymentProcessed = false;
    }

    // Student getter
    get student() {
        return this.#student;
    }

    // Meal date
    get mealDate() {
        return this.#mealDate;
    }

    set mealDate(value) {

        if (
            !value ||
            value.trim() === ""
        ) {
            throw new Error(
                "Meal date cannot be empty."
            );
        }

        this.#mealDate = value.trim();
    }

    // Meal type
    get mealType() {
        return this.#mealType;
    }

    set mealType(value) {

        if (
            !value ||
            value.trim() === ""
        ) {
            throw new Error(
                "Meal type cannot be empty."
            );
        }

        const validMealTypes = [
            "breakfast",
            "lunch",
            "dinner"
        ];

        if (
            !validMealTypes.includes(
                value.trim().toLowerCase()
            )
        ) {
            throw new Error(
                "Meal type must be Breakfast, Lunch, or Dinner."
            );
        }

        this.#mealType =
            value.trim().charAt(0).toUpperCase() +
            value.trim().slice(1).toLowerCase();
    }

    // Quantity
    get quantity() {
        return this.#quantity;
    }

    set quantity(value) {

        const number = Number(value);

        if (
            !Number.isInteger(number) ||
            number <= 0
        ) {
            throw new Error(
                "Quantity must be a positive whole number."
            );
        }

        this.#quantity = number;
    }

    // Dietary note
    get dietaryNote() {
        return this.#dietaryNote;
    }

    set dietaryNote(value) {
        this.#dietaryNote =
            value ? value.trim() : "";
    }

    // Booking status
    get bookingStatus() {
        return this.#bookingStatus;
    }

    set bookingStatus(value) {

        if (
            !value ||
            value.trim() === ""
        ) {
            throw new Error(
                "Booking status cannot be empty."
            );
        }

        const validStatuses = [
            "confirmed",
            "pending",
            "cancelled"
        ];

        if (
            !validStatuses.includes(
                value.trim().toLowerCase()
            )
        ) {
            throw new Error(
                "Booking status must be Confirmed, Pending, or Cancelled."
            );
        }

        this.#bookingStatus =
            value.trim().charAt(0).toUpperCase() +
            value.trim().slice(1).toLowerCase();
    }

    // Calculate meal cost
    calculateTotal() {

        let price;

        switch (
            this.#mealType.toLowerCase()
        ) {

            case "breakfast":
                price = 10;
                break;

            case "lunch":
                price = 15;
                break;

            case "dinner":
                price = 20;
                break;

            default:
                throw new Error(
                    "Invalid meal type."
                );
        }

        return price * this.#quantity;
    }

    // Check whether booking belongs to student
    belongsTo(student) {
        return this.#student === student;
    }

    // ========================================
    // PROCESS PAYMENT
    // ========================================

    processPayment(diningAccount) {

        // Validate account
        if (
            !diningAccount ||
            typeof diningAccount.payForMeal !== "function"
        ) {
            throw new Error(
                "A valid dining account is required."
            );
        }

        // Prevent duplicate payment
        if (this.#paymentProcessed) {

            console.log(
                "Payment rejected: This booking has already been paid."
            );

            return false;
        }

        // Calculate booking cost
        const totalCost =
            this.calculateTotal();

        // Polymorphic method call
        const paymentSuccessful =
            diningAccount.payForMeal(
                totalCost,
                `${this.#mealType} booking`
            );

        // Payment successful
        if (paymentSuccessful) {

            this.#paymentProcessed = true;

            this.#bookingStatus =
                "Confirmed";

            console.log(
                `Payment successful: K${totalCost.toFixed(2)}`
            );

            console.log(
                "Booking Status: Confirmed"
            );

            return true;
        }

        // Payment failed
        this.#bookingStatus =
            "Pending";

        console.log(
            `Payment failed: K${totalCost.toFixed(2)}`
        );

        console.log(
            "Booking Status: Pending"
        );

        return false;
    }

    // Check payment status
    isPaid() {
        return this.#paymentProcessed;
    }

    // Booking summary
    getSummary() {

        return `
Student ID: ${this.#student.studentId}
Student Name: ${this.#student.getFullName()}
Meal: ${this.#mealType}
Date: ${this.#mealDate}
Quantity: ${this.#quantity}
Dietary Note: ${this.#dietaryNote || "None"}
Status: ${this.#bookingStatus}
Cost: K${this.calculateTotal().toFixed(2)}
Payment Processed: ${this.#paymentProcessed ? "Yes" : "No"}
`;
    }
}

module.exports = MealBooking;