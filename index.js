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

function viewAllEmployees() {
    const queryString = `
    
    `
    db.query(queryString, (err, result) => {
        if (err) {
            console.log("Oops! Trouble showing all employees.", err);
            return;
        }
        console.table(result);
    })
}

// addDepartment
// addRole
// addEmployee
// updateRole

startUp()


// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        // SELECT * FROM employee

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
        // INSERT INTO department(column_list)
        // VALUES(value_list)

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
        // INSERT INTO role(column_list)
        // VALUES(value_list)

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
        // INSERT INTO employee(column_list)
        // VALUES(value_list)

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
        // UPDATE role
        // SET column_1 = value_1,
        // WHERE condition