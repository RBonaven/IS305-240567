const DiningAccount = require("./DiningAccount");

class Student {

    #studentId;
    #firstName;
    #lastName;
    #diningAccount;

    constructor(
        studentId,
        firstName,
        lastName
    ) {

        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;

        // No dining account initially
        this.#diningAccount = null;
    }

    // Student ID getter/setter
    get studentId() {
        return this.#studentId;
    }

    set studentId(value) {

        if (
            !value ||
            value.trim() === ""
        ) {
            throw new Error(
                "Student ID cannot be empty."
            );
        }

        this.#studentId = value.trim();
    }

    // First name getter/setter
    get firstName() {
        return this.#firstName;
    }

    set firstName(value) {

        if (
            !value ||
            value.trim() === ""
        ) {
            throw new Error(
                "First name cannot be empty."
            );
        }

        this.#firstName = value.trim();
    }

    // Last name getter/setter
    get lastName() {
        return this.#lastName;
    }

    set lastName(value) {

        if (
            !value ||
            value.trim() === ""
        ) {
            throw new Error(
                "Last name cannot be empty."
            );
        }

        this.#lastName = value.trim();
    }

    // Assign dining account
    assignDiningAccount(account) {

        if (!(account instanceof DiningAccount)) {
            throw new Error(
                "Invalid dining account. " +
                "The account must be a DiningAccount " +
                "or one of its subclasses."
            );
        }

        this.#diningAccount = account;

        return true;
    }

    // Get assigned dining account
    get diningAccount() {
        return this.#diningAccount;
    }

    // Full name
    getFullName() {
        return `${this.#firstName} ${this.#lastName}`;
    }

    // Display student information
    displayInfo() {

        console.log("========================================");
        console.log("             STUDENT DETAILS");
        console.log("========================================");

        console.log(
            `Student ID: ${this.#studentId}`
        );

        console.log(
            `Student Name: ${this.getFullName()}`
        );

        if (this.#diningAccount) {

            console.log(
                `Dining Account: ${this.#diningAccount.accountNumber}`
            );
        } else {

            console.log(
                "Dining Account: Not assigned"
            );
        }

        console.log("========================================");
    }
}

module.exports = Student;