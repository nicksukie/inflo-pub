RANT ALL ON *.* TO 'root'@'localhost';

FLUSH PRIVILEGES;

CREATE TABLE User
(
  userID int NOT NULL AUTO_INCREMENT,
  email VARCHAR(500) NOT NULL,
  name VARCHAR(500) NOT NULL,
  PRIMARY KEY (userID),
  UNIQUE (email)
);


CREATE TABLE `auth_user` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `password` varchar(128) NOT NULL,
 `last_login` datetime(6) DEFAULT NULL,
 `is_superuser` tinyint(1) NOT NULL,
 `username` varchar(150) NOT NULL,
 `first_name` varchar(30) NOT NULL,
 `last_name` varchar(150) NOT NULL,
 `email` varchar(254) NOT NULL,
 `is_staff` tinyint(1) NOT NULL,
 `is_active` tinyint(1) NOT NULL,
 `date_joined` datetime(6) NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `username` (`username`)
);

CREATE TABLE Login
(
  password VARCHAR(500) NOT NULL,
  email VARCHAR(500) NOT NULL,
  userID int NOT NULL,
  PRIMARY KEY (email),
  FOREIGN KEY (userID) REFERENCES User(userID)
);

CREATE TABLE Story
(
  storyID int NOT NULL AUTO_INCREMENT,
  date VARCHAR(500) NOT NULL,
  source VARCHAR(500),
  thumbnail VARCHAR(500),
  details VARCHAR(500),
  headline VARCHAR(500),
  originalStory VARCHAR(500),
  sourceLink VARCHAR(500),
  url VARCHAR(500),
  keywords VARCHAR(500),
  timeposted VARCHAR(500),
  category VARCHAR(500),
  isnews bool NOT NULL,
  PRIMARY KEY (storyID)
);



CREATE TABLE Comments
(
  commentID int NOT NULL AUTO_INCREMENT,
  timestamp DATE NOT NULL,
  text VARCHAR(500) NOT NULL,
  commentaryType VARCHAR(500) NOT NULL,
  storyID int NOT NULL,
  userID int NOT NULL,
  PRIMARY KEY (commentID),
  FOREIGN KEY (storyID) REFERENCES Story(storyID),
  FOREIGN KEY (userID) REFERENCES auth_user(id)
);


CREATE TABLE USER_STORY
(
  timestamp DATE NOT NULL,
  id1 int NOT NULL AUTO_INCREMENT,
  userID int NOT NULL,
  storyID int NOT NULL,
  firstornot tinyint(4) NOT NULL,
  firstCommentary int NOT NULL,
  PRIMARY KEY (id1),
  FOREIGN KEY (userID) REFERENCES auth_user(id),
  FOREIGN KEY (storyID) REFERENCES Story(storyID),
  FOREIGN KEY (firstCommentary) REFERENCES Comments(commentID)
);

CREATE TABLE Notification
(
  notificationID int NOT NULL AUTO_INCREMENT,
  time DATE NOT NULL,
  status INT NOT NULL,
  storyID int NOT NULL,
  userID int NOT NULL,
  PRIMARY KEY (notificationID),
  FOREIGN KEY (storyID) REFERENCES Story(storyID),
  FOREIGN KEY (userID) REFERENCES User(userID)
);
