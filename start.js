// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
//const util = require("util");

// Setting up mySQL connection
var connection = mysql.createConnection({

    host: "localhost",

    port: 3306,

    user: "root",

    password: "Pokemon01!",
    database: "employeeTrackerDB"
});

//let departmentIDs = []

connection.connect(function (err) {
    if (err) throw err;
   // departmentIDs = currentDepartments();
    startQuestion();
});

//connection.query = util.promisify(connection.query);

function startQuestion() {
    inquirer
        .prompt([
            {
                name: "userToDo",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View All Employees",
                    "View All Departments",
                    "View All Roles",
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "Update Employee Role",
                    "Exit Application"
                ]
            }
        ])
        .then(function (response) {
            switch (response.userToDo) {
                case "View All Employees":
                    viewEmployees();
                    break;
                case "View All Departments":
                    viewDepartments();
                    break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    addDepartment();
                    break;
                default:
                    connection.end();
                    process.exit(0);
            }
        })
}

function viewEmployees() {
    var query = "SELECT * FROM employee;";
    connection.query(query, function (err, data) {
        if (err) throw err;
        console.table(data)
        startQuestion();
    })
}

function viewDepartments() {
    var query = "SELECT * FROM department;";
    connection.query(query, function (err, data) {
        if (err) throw err;
        console.table(data)
        startQuestion();
    })
}

function viewRoles() {
    var query = "SELECT * FROM role;";
    connection.query(query, function (err, data) {
        if (err) throw err;
        console.table(data)
        startQuestion();
    })
}

function addDepartment() {
    inquirer
        .prompt([
            {
                name: "new_department",
                type: "input",
                message: "What is the name of the department you would like to add?"
            }
        ])
        .then(function (response) {
            var query = "INSERT INTO department (name) values (?)";
            connection.query(query, response.new_department, function (err, data) {
                if (err) throw err;
                console.table(data)
                startQuestion();
            })
        })

}

function addRole() {
    inquirer
        .prompt([
            {
                name: "new_role",
                type: "input",
                message: "What is the title of the role you would like to add?"
            },
            {
                name: "new_role_salary",
                type: "input",
                message: "What is the salary for this new role?"
            },
            {
                name: "new_role_department_id",
                type: "input",
                message: "What is the department id for this new role?",
                // choices: currentDepartments()
            }
        ])
        .then(function (response) {
            var query = "INSERT INTO role (title, salary, department_id) values (?)";
            connection.query(query, response.new_role, response.new_role_salary, response.new_role_department_id, function (err, data) {
                if (err) throw err;
                console.table(data)
                startQuestion();
                //THIS IS WHERE I STOPPED
            })
        })

}


// function currentDepartments() {
//     var query = "SELECT (id) FROM department";
//     return connection.query(query);
// }