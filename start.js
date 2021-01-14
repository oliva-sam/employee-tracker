var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

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
                    "View Employees",
                    "View Departments",
                    "View Roles",
                    "Add Department",
                    "Add Roles",
                    "Add Employees",
                    "Exit Application"
                ]
            }
        ])
        .then(function (response) {
            switch(response.userToDo) {
                case "View Employee":
                    viewEmployee();
                    break;
                case "View Department":
                    viewDepartment();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                    //NEED TO ADD ALL OF THE OPTIONS
                default :
                    connection.end();
                    process.exit(0);
            }
        })
}

function viewEmployee() {
    var query =  "SELECT * FROM employee;";
    connection.query (query, function(err, response) {
        if (err) throw err;
        console.table(response)
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
   .then(function(response) {
     var query = "INSERT INTO department (name) values (?)";
     connection.query (query, response.new_department, function(err, response) {
        if (err) throw err;
        console.table(response)
        startQuestion();
    })
   })

}