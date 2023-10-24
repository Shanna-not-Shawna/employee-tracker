INSERT INTO departments (id, name)
VALUES (001, "Development") 
       (002, "Quality Assurance") 
       (003, "Creative") 
       (004, "Project Management");

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "CEO", 140000, 001)
       (002, "Chief Developer", 120000, 001)
       (003, "Lead Programmer", 100000, 001)
       (004, "Gameplay Designer", 95000, 001)
       (005, "QA Manager", 110000, 002)
       (006, "Game Tester Lead", 85000, 002)
       (007, "QA Analyst", 80000, 002)
       (008, "Testing Specialist", 70000, 002)
       (009, "Creative Director", 110000, 003)
       (010, "Art Director", 90000, 003)
       (011, "Character Artist", 75000, 003)
       (012, "Project Manager", 100000, 004)
       (013, "Scrum Master", 90000, 004)
       (014, "Project Analyst", 80000, 004);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (00001, "Mario", "Mario", 001, NULL)
       (00002, "Luigi", "Mario", 002, "Mario Mario")
       (00003, "Toad", "Toadstool", 003, "Luigi Mario")
       (00004, "Yoshi", "Green", 004, "Luigi Mario")
       (00005, "Peach", "Toadstool", 005, "Mario Mario")
       (00006, "Daisy", "Flowers", 006, "Peach Toadstool")
       (00007, "Toadsworth", "Toad", 007, "Peach Toadstool")
       (00008, "Shy", "Guy", 008, "Daisy Flowers")
       (00009, "Bowser", "Koopa", 009, "Mario Mario")
       (00010, "Waluigi", "Wario", 010, "Bowswer Koopa")
       (00011, "Koopa", "Troopa", 011, "Bowser Koopa")
       (00012, "Toadette", "Toad", 012, "Mario Mario")
       (00013, "Bullet", "Bill", 013, "Toadette Toad")
       (00014, "Dry", "Bones", 014, "Toadette Toad");
       
    