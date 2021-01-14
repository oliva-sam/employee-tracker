USE employeeTrackerDB;

INSERT INTO department (name) values ("Marketing");
INSERT INTO department (name) values ("Production");
INSERT INTO department (name) values ("Administration");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id) values ("Manager", 100, 1);
INSERT INTO role (title, salary, department_id) values ("Manager", 100, 2);
INSERT INTO role (title, salary, department_id) values ("Manager", 100, 3);

INSERT INTO role (title, salary, department_id) values ("Senior Marketing Agent", 75, 1);
INSERT INTO role (title, salary, department_id) values ("Production Designer",50, 2);
INSERT INTO role (title, salary, department_id) values ("Receptionist", 25, 3);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("John", "Doe", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Jane", "Doe", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Samantha", "Oliva", 3, null);
SELECT * FROM employee;
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Haley", "Fury", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Estelle", "Howard", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Abraham", "Smith", 3, 3);
SELECT * FROM employee e, role r, department d WHERE e.role_id = r.id AND r.department_id = d.id;