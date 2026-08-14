class MealBooking {
    #student;
    #mealDate;
    #mealType;
    #quantity;
    #dietaryNote;
    #bookingStatus;

    constructor(
        student,
        mealDate,
        mealType,
        quantity,
        dietaryNote = "",
        bookingStatus = "Pending"
    ) {
        // Validate Student object
        if (!student || student.constructor.name !== "Student") {
            throw new Error("A valid Student object is required.");
        }

        this.#student = student;

        this.mealDate = mealDate;
        this.mealType = mealType;
        this.quantity = quantity;
        this.dietaryNote = dietaryNote;
        this.bookingStatus = bookingStatus;
    }

    // Student getter
    get student() {
        return this.#student;
    }

    // Meal date getter
    get mealDate() {
        return this.#mealDate;
    }

    // Meal date setter
    set mealDate(value) {
        if (!value || value.trim() === "") {
            throw new Error("Meal date cannot be empty.");
        }

        this.#mealDate = value.trim();
    }

    // Meal type getter
    get mealType() {
        return this.#mealType;
    }

    // Meal type setter
    set mealType(value) {
        if (!value || value.trim() === "") {
            throw new Error("Meal type cannot be empty.");
        }

        const validMealTypes = ["breakfast", "lunch", "dinner"];

        if (!validMealTypes.includes(value.trim().toLowerCase())) {
            throw new Error(
                "Meal type must be Breakfast, Lunch, or Dinner."
            );
        }

        this.#mealType =
            value.trim().charAt(0).toUpperCase() +
            value.trim().slice(1).toLowerCase();
    }

    // Quantity getter
    get quantity() {
        return this.#quantity;
    }

    // Quantity setter
    set quantity(value) {
        const number = Number(value);

        if (!Number.isInteger(number) || number <= 0) {
            throw new Error("Quantity must be a positive whole number.");
        }

        this.#quantity = number;
    }

    // Dietary note getter
    get dietaryNote() {
        return this.#dietaryNote;
    }

    // Dietary note setter
    set dietaryNote(value) {
        this.#dietaryNote = value ? value.trim() : "";
    }

    // Booking status getter
    get bookingStatus() {
        return this.#bookingStatus;
    }

    // Booking status setter
    set bookingStatus(value) {
        if (!value || value.trim() === "") {
            throw new Error("Booking status cannot be empty.");
        }

        const validStatuses = ["confirmed", "pending", "cancelled"];

        if (!validStatuses.includes(value.trim().toLowerCase())) {
            throw new Error(
                "Booking status must be Confirmed, Pending, or Cancelled."
            );
        }

        this.#bookingStatus =
            value.trim().charAt(0).toUpperCase() +
            value.trim().slice(1).toLowerCase();
    }

    // Calculate total meal cost
    calculateTotal() {
        let price;

        switch (this.#mealType.toLowerCase()) {
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
                throw new Error("Invalid meal type.");
        }

        return price * this.#quantity;
    }

    // Check whether booking belongs to a particular Student
    belongsTo(student) {
        return this.#student === student;
    }

    // Create booking summary
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
`;
    }
}

module.exports = MealBooking;