USE employee_db;

INSERT INTO departments (`name`)
VALUES ("Marketing");
INSERT INTO departments (`name`)
VALUES ("Leadership");
INSERT INTO departments (`name`)
VALUES ("Accounting");
INSERT INTO departments (`name`)
VALUES ("R&D");

INSERT INTO roles (`title`, `salary`, `department_id`)
VALUES ("Engineer", 80000, 01);
INSERT INTO roles (`title`, `salary`, `department_id`)
VALUES ("Manager", 60000, 02);
INSERT INTO roles (`title`, `salary`, `department_id`)
VALUES ("Accountant", 40000, 03);

INSERT INTO employees (`first_name`, `last_name`, `role_id`, `manager_id`)
VALUES ('Hugo', 'One', 1, 1);
INSERT INTO employees (`first_name`, `last_name`, `role_id`, `manager_id`)
VALUES ('Rubio', 'Two', 2, 2);
INSERT INTO employees (`first_name`, `last_name`, `role_id`, `manager_id`)
VALUES ('Blanco', 'Three', 3, 3);
INSERT INTO employees (`first_name`, `last_name`, `role_id`, `manager_id`)
VALUES ('Andrea', 'Four', 4 ,4);
INSERT INTO employees (`first_name`, `last_name`, `role_id`, `manager_id`)
VALUES ('Luz', 'Five', 5, 5);
