# IS305 Dining App

A Node.js console application for managing student meal bookings and dining accounts. The project demonstrates object-oriented programming concepts including classes, inheritance, private fields, constructors, getters and setters, validation, object references, arrays of objects, polymorphism, constructor chaining, and simulated constructor/method overloading using default parameters.

## Project Files

* `student.js` - Defines the `Student` class and stores student information and the student's dining account.
* `mealDining.js` - Defines the `MealBooking` class and manages meal-booking information and booking payments.
* `DiningAccount.js` - Defines the standard `DiningAccount` class for managing balances, deposits, meal payments, and transactions.
* `RewardsDiningAccount.js` - Defines the `RewardsDiningAccount` subclass and calculates dining rewards.
* `CreditDiningAccount.js` - Defines the `CreditDiningAccount` subclass and allows meal payments using an approved credit limit.
* `DiningApp.js` - Runs the console application and demonstrates dining accounts, polymorphism, students, meal bookings, and payments.
* `README.md` - Project documentation.

## Student Class

The `Student` class stores student information using private fields:

* `#studentId`
* `#firstName`
* `#lastName`
* `#diningAccount`

It provides getters and setters for the student information. The setters reject empty student IDs, first names, and last names.

### Methods

* `getFullName()` - Returns the student's first and last name together.
* `displayInfo()` - Displays the student's ID, full name, and assigned dining account.
* `assignDiningAccount(account)` - Assigns a `DiningAccount` or one of its subclasses to the student.
* `diningAccount` getter - Returns the student's assigned dining account.

The `assignDiningAccount()` method validates that the supplied object is a `DiningAccount` or subclass such as `RewardsDiningAccount` or `CreditDiningAccount`.

## MealBooking Class

The `MealBooking` class is connected to a `Student` object. Each booking stores a reference to the Student instead of duplicating student information.

A booking contains:

* Student
* Meal date
* Meal type
* Quantity
* Dietary note
* Booking status
* Payment status

### Methods

* `calculateTotal()` - Calculates the total meal cost.
* `belongsTo(student)` - Checks whether a booking belongs to a particular Student object.
* `processPayment(diningAccount)` - Processes the booking payment using the supplied dining account.
* `isPaid()` - Checks whether payment has already been processed.
* `getSummary()` - Displays booking information using the connected Student object.

### Booking Payment

The `processPayment()` method uses polymorphism by calling:

```javascript
diningAccount.payForMeal()
```

The `MealBooking` class does not contain separate payment code for standard, rewards, or credit accounts.

If payment succeeds:

* The payment is recorded.
* The booking status changes to `Confirmed`.
* The payment is marked as processed.

If payment fails:

* The booking remains `Pending`.
* The payment is not recorded as a successful transaction.

A booking cannot be paid for twice.

## DiningAccount Class

The `DiningAccount` class is the base class for managing student dining funds.

It contains three private fields:

* `#accountNumber`
* `#balance`
* `#transactions`

### Constructor

The constructor accepts an account number and an optional opening balance:

```javascript
const account1 = new DiningAccount("DA001");

const account2 = new DiningAccount("DA002", 500);
```

The opening balance defaults to `0` if it is not provided.

### Methods

* `deposit(amount, description)` - Adds money to the account.
* `payForMeal(amount, description)` - Pays for a meal when sufficient funds are available.
* `getBalance()` - Returns the current account balance.
* `getTransactions()` - Returns a safe copy of the transaction history.
* `displayAccountSummary()` - Displays account information.

A standard dining account cannot have a negative balance.

## RewardsDiningAccount Class

`RewardsDiningAccount` extends `DiningAccount`.

It demonstrates:

* Inheritance
* Constructor chaining using `super()`
* Method reuse
* Private fields
* Polymorphism

The class contains the private field:

```javascript
#rewardRate
```

### Reward Calculation

The reward is calculated using:

```text
Reward = Current Balance × Reward Rate ÷ 100
```

For example, with a balance of K2000 and a reward rate of 2.5%:

```text
Reward = K2000 × 2.5 ÷ 100
Reward = K50
```

### Methods

* `calculateReward()` - Calculates the reward amount.
* `applyReward()` - Deposits the calculated reward into the account.
* `displayAccountSummary()` - Displays rewards account information.

## CreditDiningAccount Class

`CreditDiningAccount` extends `DiningAccount`.

It contains the private field:

```javascript
#creditLimit
```

A credit account allows the balance to go below zero up to the approved credit limit.

For example:

```javascript
const account = new CreditDiningAccount("CA001", 1000, 500);
```

The account has:

```text
Opening Balance: K1000
Credit Limit: K500
```

A K1500 meal payment is allowed:

```text
K1000 - K1500 = K-500
```

However, another payment that would make the balance lower than `-K500` is rejected.

### Methods

* `payForMeal(amount, description)` - Overrides the base method and allows the account to use its credit limit.
* `displayAccountSummary()` - Displays credit account information.
* `creditLimit` getter - Returns the credit limit.

## Polymorphism

The application demonstrates polymorphism by storing different account types in the same array:

```javascript
const accounts = [
    standardAccount,
    rewardsAccount,
    creditAccount
];
```

The same method can then be called on every account:

```javascript
accounts.forEach(account => {
    account.displayAccountSummary();
});
```

Each account type provides its own implementation of `displayAccountSummary()`.

The application also demonstrates polymorphism when `MealBooking` calls:

```javascript
diningAccount.payForMeal()
```

The correct `payForMeal()` implementation is automatically used depending on whether the account is a standard, rewards, or credit account.

## Transaction History

Every successful account transaction is stored temporarily in a JavaScript array.

Each transaction records:

* Transaction type
* Amount
* Description
* Date and time
* Balance after the transaction

Example:

```text
Type: Meal Payment
Amount: K30.00
Description: Lunch booking
Date/Time: 12/8/2026, 10:30:00 AM
Balance After: K970.00
```

The transaction history is stored only while the application is running.

No database, local storage, or external storage is used.

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
    "Pending"
);
```

If the student's name is updated:

```javascript
student.firstName = "Anna";
student.lastName = "Peter";
```

existing booking summaries will also show the updated name because the booking references the same Student object.

## Simulated Constructor and Method Overloading

JavaScript does not support traditional method overloading in the same way as some other programming languages.

This project simulates overloading using optional/default parameters.

### Constructor Overloading

The following both work:

```javascript
const account1 = new DiningAccount("DA001");

const account2 = new DiningAccount("DA002", 500);
```

The first account uses the default opening balance of `0`.

The second account starts with K500.

### Method Overloading

The `deposit()` method supports different numbers of arguments:

```javascript
account1.deposit(100);

account1.deposit(100, "Additional meal funds");
```

The description uses the default value `"Deposit"` when it is not supplied.

## Validation

The application validates:

* Empty student ID
* Empty first name
* Empty last name
* Empty account number
* Negative opening balance
* Invalid deposit amount
* Invalid meal payment amount
* Invalid meal dates
* Invalid meal types
* Invalid quantities
* Invalid booking statuses
* Negative reward rates
* Negative credit limits
* Invalid dining account assignment
* Insufficient funds
* Credit limit exceeded
* Duplicate bookings
* Duplicate booking payments

## How to Run

Make sure Node.js is installed.

Open a terminal in the project folder and run:

```bash
node DiningApp.js
```

Make sure all JavaScript files are in the same folder:

```text
IS305/
├── student.js
├── mealDining.js
├── DiningAccount.js
├── RewardsDiningAccount.js
├── CreditDiningAccount.js
├── DiningApp.js
└── README.md
```

The imports should match the actual file names, for example:

```javascript
const Student = require("./student");
const MealBooking = require("./mealDining");
const DiningAccount = require("./DiningAccount");
const RewardsDiningAccount = require("./RewardsDiningAccount");
const CreditDiningAccount = require("./CreditDiningAccount");
```

## Example Output

```text
========================================
       STANDARD DINING ACCOUNT
========================================
Account Number: DA001
Account Type: Standard Dining Account
Current Balance: K1300.00
========================================

========================================
        REWARDS DINING ACCOUNT
========================================
Account Number: RA001
Account Type: Rewards Dining Account
Reward Rate: 2.5%
Current Balance: K2050.00
========================================

========================================
         CREDIT DINING ACCOUNT
========================================
Account Number: CA001
Account Type: Credit Dining Account
Credit Limit: K500.00
Current Balance: K-500.00
========================================

Payment rejected: Credit limit exceeded.

Payment successful: K30.00
Booking Status: Confirmed

Payment rejected: This booking has already been paid.
```

## Required Tests

The following tests should be performed:

1. A valid Student object is accepted and displayed correctly.
2. Empty student ID, first name, or last name is rejected.
3. A MealBooking correctly uses the connected Student object.
4. Updating the student's name changes the name shown in existing booking summaries.
5. Booking history displays all bookings belonging to the selected student.
6. Duplicate bookings are rejected.
7. A standard dining account accepts a valid deposit.
8. A standard dining account rejects a meal payment when there are insufficient funds.
9. A rewards account calculates the correct reward.
10. A rewards account successfully applies the calculated reward.
11. A credit account allows payment within the available credit limit.
12. A credit account rejects payment that exceeds the credit limit.
13. Different account types work through polymorphism.
14. A Student can be assigned a valid dining account.
15. An invalid object cannot be assigned as a dining account.
16. A booking payment succeeds when sufficient funds or credit are available.
17. A booking remains `Pending` when payment fails.
18. A successfully paid booking cannot be paid for a second time.
19. Successful transactions contain type, amount, description, date/time, and balance after the transaction.
20. Constructor and method optional parameters work correctly.

## GitHub

Add all project files:

```bash
git add student.js mealDining.js DiningAccount.js RewardsDiningAccount.js CreditDiningAccount.js DiningApp.js README.md
```

Commit the Lab 3 implementation:

```bash
git commit -m "Implement dining accounts polymorphism and booking payments"
```

Push the changes:

```bash
git push
```

## Technologies

* JavaScript
* Node.js
* Object-Oriented Programming
* Git
* GitHub

## OOP Concepts Demonstrated

This project demonstrates the following OOP concepts:

* Classes and objects
* Private fields
* Encapsulation
* Constructors
* Default parameters
* Getters and setters
* Validation
* Object references
* Inheritance
* Constructor chaining
* Method overriding
* Polymorphism
* Arrays of objects
* Transaction management
* Object composition
* Simulated method and constructor overloading
