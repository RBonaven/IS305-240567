class Student {
    #studentId;
    #firstName;
    #lastName;
    
    constructor(studentId, firstName, lastName) {
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Student ID getter and setter
    get studentId() {
        return this.#studentId;
    }

    set studentId(value) {
        if (!value || value.trim() === "") {
            throw new Error("Student ID cannot be empty.");
        }

        this.#studentId = value.trim();
    }

    // First name getter and setter
    get firstName() {
        return this.#firstName;
    }

    set firstName(value) {
        if (!value || value.trim() === "") {
            throw new Error("First name cannot be empty.");
        }

        this.#firstName = value.trim();
    }

    // Last name getter and setter
    get lastName() {
        return this.#lastName;
    }

    set lastName(value) {
        if (!value || value.trim() === "") {
            throw new Error("Last name cannot be empty.");
        }

        this.#lastName = value.trim();
    }

    // Return the student's full name
    getFullName() {
        return `${this.#firstName} ${this.#lastName}`;
    }

    // Display student information
    displayInfo() {
        console.log("========================================");
        console.log("             STUDENT DETAILS");
        console.log("========================================");
        console.log(`Student ID: ${this.#studentId}`);
        console.log(`Student Name: ${this.getFullName()}`);
        console.log("========================================");
    }
}

module.exports = Student;