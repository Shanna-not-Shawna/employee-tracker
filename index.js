const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'rootytooty',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

db.query('SELECT * FROM employees', function (err, results) {
    console.log(results);
});

function startUp() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        }
    ]).then(answers => {
        switch (answers.action) {
            case "View all departments":
                viewAllDepartments();
                break;
            case "View all roles":
                viewAllRoles();
                break;
            case "View all employees":
                viewAllEmployees();
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee role":
                updateRole();
                break;
            default:
                return;
        } 
         startUp();   
    })
}

function viewAllDepartments() {
    const queryString = `
    SELECT * FROM department
    `
    db.query(queryString, (err, result) => {
        if (err) {
            console.log("Oops! Trouble showing all departments.", err);
            return;
        }
        console.table(result);
    })
}

// TODO figure out how to remove column with array numbers?
function viewAllRoles() {
    const queryString = `
    SELECT role.id, title, name AS department, salary FROM role INNER JOIN department ON department_id = department.id;
    `
    db.query(queryString, (err, result) => {
        if (err) {
            console.log("Oops! Trouble showing all roles.", err);
            return;
        }
        console.table(result);
    })
}
// TODO remove column with array numbers and figure out manager_id
function viewAllEmployees() {
    const queryString = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS "department", role.salary, employee.manager_id FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department on role.department_id = department.id;
    `
    db.query(queryString, (err, result) => {
        if (err) {
            console.log("Oops! Trouble showing all employees.", err);
            return;
        }
        console.table(result);
    })
}

// TODO finish
function addDepartment() {
    inquirer.prompt([
        {
            type: 'text',
            message: 'Enter the name of the department you want to add:',
            name: 'dptName',
        }
    ]).then(answers => {
        const newDepartment = answers.dptname
        console.log(newDepartment)
        const queryString = `
        INSERT INTO department (name) VALUES ('$answers.dptName')
        `
    })
}

// TODO finish
function addRole() {
    inquirer.prompt([
        {
            type: 'text',
            message: 'Enter the name of the role you want to add:',
            name: 'roleName',
        }
    ]).then(answers => {
        const newRole = answers.roleName
        console.log(newDepartment)
        const queryString = `
        INSERT INTO role (name) VALUES ('$answers.roleName')
        `
    })
}

// TODO finish
function addEmployee() {
    inquirer.prompt([
        {
            type: 'text',
            message: "What is the employee's first name?",
            name: 'newFirst_Name',
        },
        {
            type: 'text',
            message: "What is the employee's last name?",
            name: 'newLast_Name',
        },
        {
            type: 'list',
            message: "What is the employee's role?",
            name: 'newEmRole',
            choices: []
        },
        {
            type: 'list',
            message: "Who is the employee's manager?",
            name: 'newManager',
            choices: []
        },
    ]).then(answers => {
        const queryString = `
       
        `
    })
}

function updateRole() {
    inquirer.prompt([
        {
            type: 'list',
            message: "Which employee's role do you want to update?",
            name: 'updateRoleEmployee',
            choices: []
        },
        {
            type: 'list',
            message: "Which role do you want to assign the selected employee?",
            name: 'updateRoleTitle',
            choices: []
        },
}

startUp()


// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database