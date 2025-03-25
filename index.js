/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

/*const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}*/

// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    const record = {
        firstName,
        familyName, 
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };

    // Bind methods to the record
    record.createTimeInEvent = createTimeInEvent;
    record.createTimeOutEvent = createTimeOutEvent;
    record.hoursWorkedOnDate = hoursWorkedOnDate;
    record.wagesEarnedOnDate = wagesEarnedOnDate;
    record.allWagesFor = allWagesFor;

    return record;
}

// Function to create multiple employee records
function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord);
}

// Function to create a time-in event
function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date
    });
    return this;
}

// Function to create a time-out event
function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(hour),
        date
    });
    return this;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    
    if (!timeIn || !timeOut) return 0;
    
    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(date) {
    const hoursWorked = this.hoursWorkedOnDate(date);
    return hoursWorked * this.payPerHour;
}

// Function to calculate total wages for an employee
function allWagesFor() {
    const dates = this.timeInEvents.map(event => event.date);
    return dates.reduce((total, date) => {
        return total + this.wagesEarnedOnDate(date);
    }, 0);
}

// Function to find an employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// Function to calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
        return total + employee.allWagesFor();
    }, 0);
}

// Export the functions to make them accessible
module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll
};
