GRANT ALL ON *.* TO 'root'@'localhost';

FLUSH PRIVILEGES;

CREATE TABLE User
(
  userID int NOT NULL AUTO_INCREMENT,
  email VARCHAR(500) NOT NULL,
  name VARCHAR(500) NOT NULL,
  PRIMARY KEY (userID),
  UNIQUE (email)
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

CREATE TABLE USER_STORY
(
  timestamp DATE NOT NULL,
  id1 int NOT NULL AUTO_INCREMENT, 
  userID int NOT NULL,
  storyID int NOT NULL,
  firstornot tinyint(4) NOT NULL,
  firstCommentary VARCHAR(500) NOT NULL,
  PRIMARY KEY (id1),
  FOREIGN KEY (firstCommentary) REFERENCES Comments(commentID),
  FOREIGN KEY (userID) REFERENCES auth_user(id),
  FOREIGN KEY (storyID) REFERENCES Story(storyID)
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

CREATE TABLE ConnectionList
(
  clid int NOT NULL AUTO_INCREMENT,
  privacyLevel INT NOT NULL,
  self int NOT NULL,
  other int NOT NULL,
  PRIMARY KEY (clid, self, other),
  FOREIGN KEY (self) REFERENCES User(userID),
  FOREIGN KEY (other) REFERENCES User(userID)
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

CREATE TABLE ConnectionRequests
(
  crID int NOT NULL AUTO_INCREMENT,
  timestamp DATE NOT NULL,
  status INT NOT NULL,
  recieverUser int NOT NULL,
  senderUser int NOT NULL,
  PRIMARY KEY (crID, recieverUser, senderUser),
  FOREIGN KEY (recieverUser) REFERENCES User(userID),
  FOREIGN KEY (senderUser) REFERENCES User(userID)
);

ALTER TABLE USER_STORY add column firstornot bool;
alter table comments drop foreign key comments_ibfk_2
ALTER TABLE comments ADD CONSTRAINT comments_ibfk_2 FOREIGN KEY (userID) REFERENCES auth_user(id);
alter table USER_STORY drop foreign key user_story_ibfk_1;
ALTER TABLE USER_STORY ADD CONSTRAINT user_story_ibfk_1 FOREIGN KEY (userID) REFERENCES auth_user(id);
ALTER TABLE USER_STORY add column id1 int NOT NULL AUTO_INCREMENT; 

ALTER TABLE comments add column commentaryType VARCHAR(500) NOT NULL
ALTER TABLE comments ADD CONSTRAINT comments_ibfk_3 FOREIGN KEY (firstCommentary) REFERENCES Comments(commentID)

