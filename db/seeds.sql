INSERT INTO department (name)
VALUES ("Development"), 
       ("Quality Assurance"), 
       ("Creative"), 
       ("Project Management");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 140000, 1),
       ("Chief Developer", 120000, 1),
       ("Lead Programmer", 100000, 1),
       ("Gameplay Designer", 95000, 1),
       ("QA Manager", 110000, 2),
       ("Game Tester Lead", 85000, 2),
       ("QA Analyst", 80000, 2),
       ("Testing Specialist", 70000, 2),
       ("Creative Director", 110000, 3),
       ("Art Director", 90000, 3),
       ("Character Artist", 75000, 3),
       ("Project Manager", 100000, 4)
       ("Scrum Master", 90000, 4),
       ("Project Analyst", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mario", "Mario", 1, NULL),
       ("Luigi", "Mario", 2, 1),
       ("Toad", "Toadstool", 3, 2),
       ("Yoshi", "Green", 4, 2),
       ("Peach", "Toadstool", 5, 1),
       ("Daisy", "Flowers", 6, 5),
       ("Toadsworth", "Toad", 7, 5),
       ("Shy", "Guy", 8, 6),
       ("Bowser", "Koopa", 9, 1),
       ("Waluigi", "Wario", 10, 9),
       ("Koopa", "Troopa", 11, 9),
       ("Toadette", "Toad", 12, 1),
       ("Bullet", "Bill", 13, 12),
       ("Dry", "Bones", 14, 12);
