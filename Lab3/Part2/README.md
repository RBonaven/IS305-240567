# IS305 Dining App

A Node.js console application for managing student meal bookings. The project demonstrates object-oriented programming concepts including classes, private fields, constructors, getters and setters, validation, object references, and arrays of objects.

## Project Files

- `Student.js` - Defines the `Student` class and stores student information.
- `MealBooking.js` - Defines the `MealBooking` class and manages meal-booking information.
- `DiningApp.js` - Runs the console application and manages students and bookings.
- `README.md` - Project documentation.

## Student Class

The `Student` class contains three private fields:

- `#studentId`
- `#firstName`
- `#lastName`

It provides getters and setters for each field. The setters reject empty student IDs, first names, and last names.

### Methods

- `getFullName()` - Returns the student's first and last name together.
- `displayInfo()` - Displays the student's ID and full name.

## MealBooking Class

The `MealBooking` class is connected to a `Student` object. Each booking stores a reference to the Student instead of duplicating student information.

A booking contains:

- Student
- Meal date
- Meal type
- Quantity
- Dietary note
- Booking status

### Methods

- `calculateTotal()` - Calculates the meal cost.
- `belongsTo(student)` - Checks whether a booking belongs to a Student object.
- `getSummary()` - Displays booking information using the connected Student object.

The application also prevents duplicate bookings.

## Booking History

`DiningApp.js` provides `displayBookingHistory()`. It:

1. Receives a Student object and booking array.
2. Finds bookings belonging to that student.
3. Displays the student's information once.
4. Displays all matching meal bookings.
5. Displays the total number of bookings.
6. Calculates the combined cost.

## Object References

A `MealBooking` stores the same Student object created by `DiningApp.js`.

For example:

```javascript
const student = new Student("DWU2026001", "Maria", "Kila");

const booking = new MealBooking(
    student,
    "12 August 2026",
    "Lunch",
    2,
    "",
    "Confirmed"
);
```

If the student's name is updated:

```javascript
student.firstName = "Anna";
student.lastName = "Peter";
```

existing booking summaries will also show the updated name because the booking references the same Student object.

## Validation

The application rejects:

- Empty student ID
- Empty first name
- Empty last name
- Invalid meal dates
- Invalid meal types
- Invalid quantities
- Invalid booking statuses
- Duplicate bookings

## How to Run

Make sure Node.js is installed.

Open a terminal in the project folder and run:

```bash
node DiningApp.js
```

If your main file is named `Dining.js`, run:

```bash
node Dining.js
```

Make sure all JavaScript files are in the same folder:

```text
IS305/
├── Student.js
├── MealBooking.js
├── DiningApp.js
└── README.md
```

The imports should be:

```javascript
const Student = require("./Student");
const MealBooking = require("./MealBooking");
```

## Example Output

```text
========================================
          STUDENT INFORMATION
========================================
Student ID: 240567
Student Name: Raymond Bonaven

========================================
            BOOKING HISTORY
========================================
1. Lunch - 12 August 2026
   Quantity: 2
   Status: Confirmed
   Cost: K30.00

2. Dinner - 13 August 2026
   Quantity: 1
   Status: Pending
   Cost: K20.00

Total Bookings: 2
Combined Cost: K50.00
========================================
```

## Required Tests

Test the following:

1. A valid Student object is accepted and displayed correctly.
2. Empty student ID, first name, or last name is rejected.
3. A MealBooking correctly uses the connected Student object.
4. Updating the student's name changes the name shown in existing booking summaries.
5. Booking history displays all bookings belonging to the selected student.
6. Duplicate bookings are rejected.

## GitHub

Add the project files:

```bash
git add Student.js MealBooking.js DiningApp.js README.md
```

Commit:

```bash
git commit -m "Implement Student and meal booking integration"
```

Push:

```bash
git push
```

## Technologies

- JavaScript
- Node.js
- Git
- GitHub
