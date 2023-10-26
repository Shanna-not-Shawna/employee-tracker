const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const titleArt = (`
**************************************************************************
  _______  __   __  _______  ___      _______  __   __  _______  _______ 
 |       ||  |_|  ||       ||   |    |       ||  | |  ||       ||       |
 |    ___||       ||    _  ||   |    |   _   ||  |_|  ||    ___||    ___|
 |   |___ |       ||   |_| ||   |    |  | |  ||       ||   |___ |   |___ 
 |    ___||       ||    ___||   |___ |  |_|  ||_     _||    ___||    ___|
 |   |___ | ||_|| ||   |    |       ||       |  |   |  |   |___ |   |___ 
 |_______||_|   |_||___|    |_______||_______|  |___|  |_______||_______|
     _______  ______    _______  _______  ___   _  _______  ______       
    |       ||    _ |  |   _   ||       ||   | | ||       ||    _ |      
    |_     _||   | ||  |  |_|  ||       ||   |_| ||    ___||   | ||      
      |   |  |   |_||_ |       ||       ||      _||   |___ |   |_||_     
      |   |  |    __  ||       ||      _||     |_ |    ___||    __  |    
      |   |  |   |  | ||   _   ||     |_ |    _  ||   |___ |   |  | |    
      |___|  |___|  |_||__| |__||_______||___| |_||_______||___|  |_|    

**************************************************************************       
`);

console.log(titleArt);

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootytooty',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

// db.query('SELECT * FROM employees', function (err, results) {
//     console.log(results);
// });

async function startUp() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        }
    ])

    switch (answers.action) {
        case "View all departments":
            await viewAllDepartments();
            break;
        case "View all roles":
            await viewAllRoles();
            break;
        case "View all employees":
            await viewAllEmployees();
            break;
        case "Add a department":
            addDepartment();
            break;
        case "Add a role":
            addRole();
            break;
        case "Add an employee":
            await addEmployee();
            break;
        case "Update an employee role":
            updateRole();
            break;
        default:
            return;
    }

    startUp();
}

async function viewAllDepartments() {
    try {
        const queryString = `SELECT department.id AS "Dept ID", department.name AS "Department" FROM department`
        const [departments] = await db.promise().query(queryString);
        console.table(departments);

    } catch (err) {
        console.log("Oops! Trouble showing all departments.", err);
    }

}

async function viewAllRoles() {
    try {
        const queryString = `
    SELECT role.id AS "ID", title AS "Job Title", name AS "Department", salary AS "Salary" FROM role INNER JOIN department ON department_id = department.id
    `
    const [roles] = await db.promise().query(queryString);
    console.table(roles);
    } catch (err) {
        console.log("Oops! Trouble showing all roles.", err);
    }   
}

async function viewAllEmployees() {
    try {
        const queryString = `
    SELECT employee.id AS "ID", CONCAT(employee.first_name, " ", employee.last_name) AS "Employee Name", role.title AS "Job Title", department.name AS "Department", role.salary AS "Salary", CONCAT(manager.first_name, " ", manager.last_name) AS "Manager" FROM employee JOIN role ON role.id = employee.role_id JOIN department on role.department_id = department.id LEFT JOIN employee AS manager on employee.manager_id = manager.id ORDER BY id
    `
        const [employees] = await db.promise().query(queryString);
        console.table(employees);
    } catch (err) {
        console.log("Oops! Trouble showing all employees.", err);
    }
}

// TODO finish
async function addDepartment() {
    const newDepartment = await inquirer.prompt([
        {
            type: 'text',
            message: 'Enter the name of the department you want to add:',
            name: 'name',
        }
    ])
    try {
        const [department] = await db.promise().query(queryString);
        console.table(department);
    } catch (err) {
        console.log("Something went wrong", err)
    }
    // .then(answers => {
    //     const newDepartment = answers.dptname
    //     console.log(newDepartment)
    //     const queryString = `
    //     INSERT INTO department (name) VALUES ('${answers.dptName}')
    //     `
    // })
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
async function addEmployee() {
    try {
        const roleChoices = await getAllRoles();
        const managerChoices = await getAllManagers();

        const newEmployee = await inquirer.prompt([
            {
                type: 'text',
                message: "What is the employee's first name?",
                name: 'first_name',
            },
            {
                type: 'text',
                message: "What is the employee's last name?",
                name: 'last_name',
            },
            {
                type: 'list',
                message: "What is the employee's role?",
                name: 'role_id',
                choices: roleChoices
            },
            {
                type: 'list',
                message: "Who is the employee's manager?",
                name: 'manager_id',
                choices: managerChoices
            },
        ])

        await db.promise().query("INSERT INTO employee SET ?", newEmployee);
        console.log(`${newEmployee.first_name} ${newEmployee.last_name} has been added!`);
    } catch (err) {
        console.log("Oops! Trouble showing all employees.", err);
    }

}

function updateRole() {
    // inquirer.prompt([
    //     {
    //         type: 'list',
    //         message: "Which employee's role do you want to update?",
    //         name: 'updateRoleEmployee',
    //         choices: []
    //     },
    //     {
    //         type: 'list',
    //         message: "Which role do you want to assign the selected employee?",
    //         name: 'updateRoleTitle',
    //         choices: []
    //     },
}

async function getAllRoles() {
    try {
        const [roleChoices] = await db.promise().query(`Select id AS value, title AS name FROM role`);
        return roleChoices;
    } catch (err) {
        console.log("Somethings went wrong", err)
    }

}

async function getAllManagers() {
    try {
        const queryString = `
        Select id AS value, CONCAT(first_name, " ", last_name) AS name
             FROM employee
        `
        const [managerChoices] = await db.promise().query(queryString);
        return managerChoices;
    } catch (err) {
        console.log("Somethings went wrong", err)
    }

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