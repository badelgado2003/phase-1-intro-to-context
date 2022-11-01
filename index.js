

function createEmployeeRecord(employee) {
    let records = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return records
}

function createEmployeeRecords(employRecord) {
    let employ = employRecord
    return employ.map(employee => createEmployeeRecord(employee))
    
}

function createTimeInEvent(employee, clockIn) {
    let [date, hour] = clockIn.split(" ")
    let eventTime = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
      }
    employee.timeInEvents = [...employee.timeInEvents, eventTime]
   return employee
}

function createTimeOutEvent(employee, clockOut) {
    let [date, hour] = clockOut.split(" ")
    let eventTime = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
      }
    employee.timeOutEvents = [...employee.timeOutEvents, eventTime]
   return employee
}

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date)
    const timeOut = employee.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employee, date) {
    const time = hoursWorkedOnDate(employee, date)
    return employee.payPerHour * time
}

function allWagesFor (employee) {
    const eligibleDates = employee.timeInEvents.map(function (e) {
        return e.date
    })
    const payable = eligibleDates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }.bind(employee), 0)
    return payable
}

function calculatePayroll(employRecords) {
    const record = employRecords.map(employee => allWagesFor(employee))
    return record.reduce((currentValue, total) => currentValue + total)
}