DROP DATABASE IF EXISTS polls;

CREATE DATABASE polls;

USE polls;

CREATE TABLE users (
  userId int NOT NULL AUTO_INCREMENT,
  email varchar(40) NOT NULL,
  password varchar(300) NOT NULL,
  username varchar(30) NOT NULL,
  createdOn DATE NOT NULL,
  PRIMARY KEY (userId)
);

CREATE TABLE categories (
  categoryId int NOT NULL AUTO_INCREMENT,
  text varchar(50) NOT NULL,
  PRIMARY KEY (categoryId)
);

CREATE TABLE polls (
  pollId int NOT NULL AUTO_INCREMENT,
  question varchar(300) NOT NULL,
  createdByUserId int NOT NULL,
  categoryId int NOT NULL,
  createdOn DATE NOT NULL,
  PRIMARY KEY (pollId),
  FOREIGN KEY (createdByUserId) REFERENCES users(userId),
  FOREIGN KEY (categoryId) REFERENCES categories(categoryId)
);

CREATE TABLE pollOptions (
  pollOptionId int NOT NULL AUTO_INCREMENT,
  text varchar(300) NOT NULL,
  pollId int NOT NULL,
  voteCount int,
  PRIMARY KEY (pollOptionId),
  FOREIGN KEY (pollId) REFERENCES polls(pollId)
);


CREATE TABLE photos (
  photoId int NOT NULL AUTO_INCREMENT,
  pollId int NOT NULL,
  url varchar(300) NOT NULL,
  PRIMARY KEY (photoId),
  FOREIGN KEY (pollId) REFERENCES polls(pollId)
);

/*  Execute this file from the command line by typing:
 *    mysql -u <USER> < schema.sql
 *    OR
 *    mysql -u <USER> -p < schema.sql
 *  For example, on a pairing station, it'll be
 *    mysql -u student -p < schema.sql
 *  and then you'll have to enter the password, student
 *  On your personal computer, if you haven't set up
 *  a password, it'll be
 *    mysql -u root < schema.sql
*/

INSERT INTO categories (categoryId, text) VALUES (1, "Family");
INSERT INTO categories (categoryId, text) VALUES (2, "Healthcare");
INSERT INTO categories (categoryId, text) VALUES (3, "Politics");
INSERT INTO categories (categoryId, text) VALUES (4, "Social");
INSERT INTO categories (categoryId, text) VALUES (5, "Technology");