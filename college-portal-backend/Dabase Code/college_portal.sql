create database college_portal;

use college_portal;
-- Table structure for table `roles`
--
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--
INSERT INTO `roles` VALUES (5,'Admin'),(8,'Exam Cell'),(2,'Faculty'),(3,'HOD'),(9,'Hostel Manager'),(7,'Lab-in-Charge'),(4,'Manager'),(6,'Parent'),(1,'Student'),(10,'Transport Manager');

--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `college_id` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`college_id`),
  KEY `fk_users_roles` (`role_id`),
  CONSTRAINT `fk_users_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL,
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--
INSERT INTO `users` VALUES ('ADM101','$2b$08$ahvq/0zPpwHV3rWB9FdTe./Ut5pzcVB3nqBCawO/k88v7l0BaCrj6','admin@example.com',5,'2025-08-04 06:46:48'),('EXC801','$2b$08$ahvq/0zPpwHV3rWB9FdTe./Ut5pzcVB3nqBCawO/k88v7l0BaCrj6','examcell@example.com',8,'2025-08-03 15:58:14'),('FAC201','$2b$08$ahvq/0zPpwHV3rWB9FdTe./Ut5pzcVB3nqBCawO/k88v7l0BaCrj6','faculty1@example.com',2,'2025-08-03 15:05:02'),('HOD301','$2b$08$ahvq/0zPpwHV3rWB9FdTe./Ut5pzcVB3nqBCawO/k88v7l0BaCrj6','hod1@example.com',3,'2025-08-03 15:05:02'),('HSM901','$2b$08$ahvq/0zPpwHV3rWB9FdTe./Ut5pzcVB3nqBCawO/k88v7l0BaCrj6','hostel@example.com',9,'2025-08-03 15:58:14'),('LAB601','$2b$08$ahvq/0zPpwHV3rWB9FdTe./Ut5pzcVB3nqBCawO/k88v7l0BaCrj6','lab1@example.com',7,'2025-08-03 15:05:02'),('MGR401','$2b$08$ahvq/0zPpwHV3rWB9FdTe./Ut5pzcVB3nqBCawO/k88v7l0BaCrj6','manager1@example.com',4,'2025-08-03 15:05:02'),('STD101','$2b$08$ahvq/0zPpwHV3rWB9FdTe./Ut5pzcVB3nqBCawO/k88v7l0BaCrj6','student1@example.com',1,'2025-08-03 15:05:02'),('STD102','$2b$08$ahvq/0zPpwHV3rWB9FdTe./Ut5pzcVB3nqBCawO/k88v7l0BaCrj6','student2@example.com',1,'2025-08-03 15:05:02'),('TRM1001','$2b$08$ahvq/0zPpwHV3rWB9FdTe./Ut5pzcVB3nqBCawO/k88v7l0BaCrj6','transport@example.com',10,'2025-08-03 15:58:14');

--
-- Table structure for table `admin`
--
CREATE TABLE `admin` (
  `college_id` varchar(10) NOT NULL,
  `admin_name` varchar(100) NOT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`college_id`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `users` (`college_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--
INSERT INTO `admin` VALUES ('ADM101','Mr. Narayana Rao','9876543210',NULL);

--
-- Table structure for table `departments`
--
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `departments`
--
INSERT INTO `departments` VALUES (4,'Civil'),(1,'Computer Science'),(6,'Electrical'),(2,'Electronics'),(5,'IT'),(3,'Mechanical');

--
-- Table structure for table `students`
--
CREATE TABLE `students` (
  `college_id` varchar(20) NOT NULL,
  `student_name` varchar(20) DEFAULT NULL,
  `contact_no` varchar(15) NOT NULL,
  `department_id` int DEFAULT NULL,
  `year` int DEFAULT NULL,
  `nfc_id` varchar(100) DEFAULT NULL,
  `class` varchar(5) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`college_id`),
  UNIQUE KEY `nfc_id` (`nfc_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `users` (`college_id`),
  CONSTRAINT `students_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `students`
--
INSERT INTO `students` VALUES ('STD101','Alice','9876543210',1,2,'NFC123','CS2A','/uploads/profiles/STD101.jpg'),('STD102','Bob','8765432109',2,3,'NFC124','EC3B',NULL);

--
-- Table structure for table `exam_cell`
--
CREATE TABLE `exam_cell` (
  `college_id` varchar(20) NOT NULL,
  `exam_cell_name` varchar(100) DEFAULT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`college_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `exam_cell`
--
INSERT INTO `exam_cell` VALUES ('EXC801','Mr. Ramesh','9876500001',NULL);

--
-- Table structure for table `faculty`
--
CREATE TABLE `faculty` (
  `college_id` varchar(20) NOT NULL,
  `faculty_name` varchar(100) DEFAULT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`college_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `users` (`college_id`),
  CONSTRAINT `faculty_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `faculty`
--
INSERT INTO `faculty` VALUES ('FAC201','Dr. Smith','9123456780',1,'Assistant Professor','/uploads/profiles/FAC201.jpg');

--
-- Table structure for table `hod`
--
CREATE TABLE `hod` (
  `college_id` varchar(20) NOT NULL,
  `hod_name` varchar(100) NOT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`college_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `hod_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `users` (`college_id`),
  CONSTRAINT `hod_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hod`
--
INSERT INTO `hod` VALUES ('HOD301','Dr. Reddy','9988776655',1,'/uploads/profiles/HOD301.jpg');

--
-- Table structure for table `hostel_manager`
--
CREATE TABLE `hostel_manager` (
  `college_id` varchar(20) NOT NULL,
  `hostel_manager_name` varchar(100) DEFAULT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`college_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hostel_manager`
--
INSERT INTO `hostel_manager` VALUES ('HSM901','Ms. Priya','9876500002',NULL);

--
-- Table structure for table `lab_in_charge`
--
CREATE TABLE `lab_in_charge` (
  `college_id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `lab_name` varchar(100) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`college_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `lab_in_charge_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `users` (`college_id`),
  CONSTRAINT `lab_in_charge_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `lab_in_charge`
--
INSERT INTO `lab_in_charge` VALUES ('LAB601','Mrs. Latha','9998887776',1,'CS Lab 1','profile_latha.jpg');

--
-- Table structure for table `manager`
--
CREATE TABLE `manager` (
  `college_id` varchar(20) NOT NULL,
  `manager_name` varchar(100) NOT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`college_id`),
  CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `users` (`college_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `manager`
--
INSERT INTO `manager` VALUES ('MGR401','Mr. Kiran','9123451111','Student Affairs',NULL);

--
-- Table structure for table `transport_manager`
--
CREATE TABLE `transport_manager` (
  `college_id` varchar(20) NOT NULL,
  `transport_manager_name` varchar(100) DEFAULT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`college_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transport_manager`
--
INSERT INTO `transport_manager` VALUES ('TRM1001','Mr. Naveen','9876500003',NULL);

--
-- Table structure for table `bus_routes`
--
CREATE TABLE `bus_routes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `route_name` varchar(100) NOT NULL,
  `driver_name` varchar(100) DEFAULT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `bus_allocations`
--
CREATE TABLE `bus_allocations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(20) DEFAULT NULL,
  `route_id` int DEFAULT NULL,
  `pickup_point` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id` (`student_id`),
  KEY `route_id` (`route_id`),
  CONSTRAINT `bus_allocations_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`college_id`),
  CONSTRAINT `bus_allocations_ibfk_2` FOREIGN KEY (`route_id`) REFERENCES `bus_routes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `courses`
--
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `code` varchar(20) NOT NULL,
  `department_id` int DEFAULT NULL,
  `credits` int DEFAULT '3',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `classes`
--
CREATE TABLE `classes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` int DEFAULT NULL,
  `faculty_id` varchar(20) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `semester` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  KEY `faculty_id` (`faculty_id`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `classes_ibfk_2` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`college_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `attendance`
--
CREATE TABLE `attendance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(20) DEFAULT NULL,
  `class_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` enum('Present','Absent','On Duty') DEFAULT 'Absent',
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id` (`student_id`,`class_id`,`date`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`college_id`),
  CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `exams`
--
CREATE TABLE `exams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class_id` int DEFAULT NULL,
  `exam_type` enum('Midterm','Final','Quiz','Lab') NOT NULL,
  `exam_date` date NOT NULL,
  `max_marks` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `exams_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `hostels`
--
CREATE TABLE `hostels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type` enum('Boys','Girls','Co-Ed') NOT NULL,
  `capacity` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `hostel_allocations`
--
CREATE TABLE `hostel_allocations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(20) DEFAULT NULL,
  `hostel_id` int DEFAULT NULL,
  `room_no` varchar(10) DEFAULT NULL,
  `allocation_date` date DEFAULT (curdate()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id` (`student_id`),
  KEY `hostel_id` (`hostel_id`),
  CONSTRAINT `hostel_allocations_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`college_id`),
  CONSTRAINT `hostel_allocations_ibfk_2` FOREIGN KEY (`hostel_id`) REFERENCES `hostels` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `marks`
--
CREATE TABLE `marks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `exam_id` int DEFAULT NULL,
  `student_id` varchar(20) DEFAULT NULL,
  `marks_obtained` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `exam_id` (`exam_id`,`student_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `marks_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
  CONSTRAINT `marks_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`college_id`),
  CONSTRAINT `marks_chk_1` CHECK ((`marks_obtained` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `nfc_credits`
--
CREATE TABLE `nfc_credits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(20) DEFAULT NULL,
  `credited_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `amount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `nfc_credits_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`college_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `notifications`
--
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `sender_id` varchar(20) DEFAULT NULL,
  `sender_role` enum('Faculty','HOD','Admin') DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `target_role` enum('Student','Faculty') DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `notifications`
--
INSERT INTO `notifications` VALUES (1,'Hackathon Announcement','Join the inter-college hackathon next week. Register by 10th.','HOD301','HOD',1,'Student','hackathon.pdf','2025-08-09','2025-08-03 15:09:06'),(2,'Guest Lecture','Data Science Expert Session on Friday at 2 PM.','FAC201','Faculty',1,'Student',NULL,'2025-08-08','2025-08-03 15:09:06');

--
-- Table structure for table `parent`
--
CREATE TABLE `parent` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(20) NOT NULL,
  `parent_name` varchar(100) DEFAULT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `parent_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`college_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `parents`
--
CREATE TABLE `parents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(20) DEFAULT NULL,
  `parent_name` varchar(100) DEFAULT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `relation` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id` (`student_id`),
  CONSTRAINT `parents_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`college_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `parents`
--
INSERT INTO `parents` VALUES (1,'STD101','Mr. Rao','9000112233','parent_rao@example.com','Father');

--
-- Table structure for table `previous_year_question_bank`
--
CREATE TABLE `previous_year_question_bank` (
  `id` int NOT NULL AUTO_INCREMENT,
  `year` int DEFAULT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `uploaded_by` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `student_class_enrollments`
--
CREATE TABLE `student_class_enrollments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(20) DEFAULT NULL,
  `class_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id` (`student_id`,`class_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `student_class_enrollments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`college_id`),
  CONSTRAINT `student_class_enrollments_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `timetable`
--
CREATE TABLE `timetable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department` varchar(50) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `day` varchar(20) DEFAULT NULL,
  `period` int DEFAULT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `faculty_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;