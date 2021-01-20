// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Setting up mySQL connection
var connection = mysql.createConnection({

    host: "localhost",

    port: 3306,

    user: "root",

    password: "Pokemon01!",
    database: "employeeTrackerDB"
});


connection.connect(function (err) {
    if (err) throw err;
    startQuestion();
});



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
                    updateRole();
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
                console.log("New Department has been added");
            })
            var query = "SELECT * FROM department;";
            connection.query(query, function (err, data) {
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

            }
        ])
        .then(function (response) {
            var query = "INSERT INTO role (title, salary, department_id) values (?,?,?)";
            connection.query(query, [response.new_role, response.new_role_salary, response.new_role_department_id], function (err, data) {
                if (err) throw err;
                console.log("New Role has been added");
            })
            var query = "SELECT * FROM role;";
            connection.query(query, function (err, data) {
                if (err) throw err;
                console.table(data)
                startQuestion();
            })
        })

}


function addEmployee() {
    inquirer
        .prompt([
            {
                name: "new_employee_first",
                type: "input",
                message: "What is the first name of the employee you would like to add?"
            },
            {
                name: "new_employee_last",
                type: "input",
                message: "What is the last name of the employee you would like to add?"
            },
            {
                name: "new_employee_role_id",
                type: "input",
                message: "What is the role id for this new employee?",

            },
            {
                name: "new_employee_manager_id",
                type: "input",
                message: "What is the manager id for this new employee?",

            }
        ])
        .then(function (response) {
            var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) values (?,?,?,?)";
            connection.query(query,
                [response.new_employee_first, response.new_employee_last, response.new_employee_role_id, response.new_employee_manager_id],
                function (err, data) {
                    if (err) throw err;
                    console.log("New Employee has been added");
                })
            var query = "SELECT * FROM employee;";
            connection.query(query, function (err, data) {
                if (err) throw err;
                console.table(data)
                startQuestion();
            })
        })

}

function updateRole() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the first name of the employee?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the last name of the employee?"
            },
            {
                name: "updatedRole",
                type: "input",
                message: "What is the new role ID of the employee?"
            }
        ])
        .then(function (response) {
            var query = "UPDATE employee SET role_id=? WHERE first_name=? AND last_name=?";
            connection.query(query,
                [response.updatedRole, response.firstName, response.lastName], function (err, data) {
                    if (err) throw err;
                    console.log("Employee has been updated");
                })
            var query = "SELECT * FROM employee;";
            connection.query(query, function (err, data) {
                if (err) throw err;
                console.table(data)
                startQuestion();
            })
        })
}


