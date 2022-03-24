const inquirer = require("inquirer");
const mysql = require("mysql2");
const { promisify } = require('util')

require('console.table');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'helloworld',
    database: 'employee_db'
});

connection.connect(function (err) {
    if (err) {
        console.error('something went wrong' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);

    ques()
});

const query = promisify(connection.query.bind(connection))

function ques() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: [ 'Departments', 'Employees', 'Roles','Add Department', 'Add Employee', 'Add Role', 'Change Employee Role',]
        }
    ]).then((answer) => {
        switch (answer.action) {
            case 'Add Department':
                addDept()
                break;
            case 'Add Employee':
                addEmp()
                break;
            case 'Add Role':
                addRole()
                break;
            case 'Change Employee Role':
                updateEmployeeRole()
                break;
            case 'Departments':
                viewDept()
                break;
            case 'Employees':
                viewEmp()
                break;
            case 'Roles':
                viewRole()
                break;
        }
    })
}
//add department
function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Department Name',
            name: 'deptName'
        }
    ]).then((answer) => {
        connection.query(`INSERT INTO Departments (name) VALUES ('${answer.deptName}');`, (error, result) => {
            if (error) {
                console.error('ups! something went wrong please try again.')
                throw error
            }
            console.log(result)
            ques()
        })
    })
}
//add employee function
function addEmp() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Employee First Name:',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Employee Last Name:',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'Role ID:',
            name: 'role'
        },
        {
            type: 'input',
            message: 'Manager ID:',
            name: 'manager'
        }
    ]).then((answer) => {
        connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.role}', '${answer.manager}');`, (error, result) => {
            if (error) {
                console.error('UPS! something went wrong,pls try again!')
                throw error
            }
            console.log(result)
            ques()
        })
    })
}
//add role function
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Title:',
            name: 'roleTitle'
        },
        {
            type: 'input',
            message: 'Salary:',
            name: 'roleSal'
        },
        {
            type: 'input',
            message: 'Department ID:',
            name: 'roleDept'
        }
    ]).then((answer) => {
        connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${answer.roleTitle}', '${answer.roleSal}', '${answer.roleDept}');`, (error, result) => {
            if (error) {
                console.error('UPS! something went wrong,pls try again!')
                throw error
            }
            ques()
        })
    })
}
//update employee function
async function updateEmployeeRole() {
    // first list out all the employees with a select * statement and print to the CLI
    const employees = (await query(`SELECT * FROM employees;`)).map((employee) => {
        return {
            name: employee.first_name + ' ' + employee.last_name,
            value: employee.id,
        }
    })

    const roles = (await query(`SELECT * FROM roles;`)).map((roles) => {
        return {
            name: roles.title,
            value: roles.id,
        }
    })

    const answer = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee would you like to update',
            name: 'emp',
            choices: employees
        },
        {
            type: 'list',
            message: 'select new role for employee',
            name: 'newRole',
            choices: roles
        },
    ])
    console.log(answer)

    await query(`UPDATE employees SET role_id = ? WHERE id = ?;`, [
        answer.newRole,
        answer.emp,
    ])
    ques()
    return

    inquirer.prompt([
        {
            type: 'list',
            message: 'Which ',
            name: 'deptName',
            // choices: choices
            choices: ['',]
        },
    ]).then((answer) => {
        connection.query(`INSERT INTO departments (name) VALUES ('${answer.deptName}');`, (error, result) => {
            if (error) {
                console.error('UPS! something went wrong,pls try again!')
                throw error
            }
            ques()
        })
    })
}
//view departments function
function viewDept() {
    connection.query(`SELECT * FROM departments;`, (error, result) => {
        if (error) {
            console.error('UPS! something went wrong,pls try again!')
            throw error
        }
        console.table(result)
        ques()
    })
}
//view employees function
function viewEmp() {
    connection.query(`SELECT * FROM employees;`, (error, result) => {
        if (error) {
            console.error('UPS! something went wrong,pls try again!')
            throw error
        }
        console.table(result)
        ques()
    })
}
//view all roles function
function viewRole() {
    connection.query(`SELECT * FROM roles;`, (error, result) => {
        if (error) {
            console.error('UPS! something went wrong,pls try again!')
            throw error
        }
        console.table(result)
        ques()
    })
}