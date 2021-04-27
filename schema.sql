drop table authors;
drop table blogs;
drop table tags;
drop table blogtags;

CREATE TABLE authors (
	id INT AUTO_INCREMENT, 
    name VARCHAR(30) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE blogs (
	id INT AUTO_INCREMENT,
    title VARCHAR(60) NOT NULL,
    content VARCHAR(250) NOT NULL,
    authorid INT NOT NULL,
    created_at timestamp DEFAULT NOW(),
    edited_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (authorid) REFERENCES authors(id)
);

CREATE TABLE tags (
	id INT AUTO_INCREMENT, 
    name VARCHAR(30) NOT NULL UNIQUE,
    _created TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id)  
);

CREATE TABLE blogtags (
	blogid INT NOT NULL,
	tagid INT NOT NULL,
    PRIMARY KEY (blogid, tagid),
    FOREIGN KEY (blogid) REFERENCES blogs(id) ON DELETE CASCADE,
    FOREIGN KEY (tagid) REFERENCES tags(id) ON DELETE CASCADE
);

INSERT INTO authors (name, email) VALUES ("Sam", "sam@sam.com"), ("Goof", "goof@goof.com"), ("Spam", "spam@spam.com"), ("Spaz", "spaz@spaz.com");
INSERT INTO blogs (title, content, authorid) Values ("Things","Lorem ipsum epsilon", 1), (" More Things","Lorem ipsum epsilon lawdy lawdy", 1), ("Stuff","Whoopsie daisys", 1), ("Other Things","cups,plates and dishes", 1);
INSERT INTO tags (name) Values ("Sweet"), ("Caroline"), ("bah"), ("dah"), ("baahhh"), ("gotcha again");
INSERT INTO blogtags (blogid, tagid) Values (1,1), (1,2), (2,2), (2,5), (3,4), (4,1);

DELIMITER &&
CREATE PROCEDURE spBlogTags(pizza INT)
	BEGIN
		SELECT tags.name, tags.id 
        FROM blogtags
	JOIN tags ON tags.id = blogtags.tagid
	WHERE blogid = pizza;
	END&&
DELIMITER ;

CALL spBlogTags(3);


SELECT * FROM blogs;
SELECT * FROM authors;
Select * from tags;
Select * FROM blogtags;

SELECT blogs.id, authors.name, authors.email, blogs.created_at, blogs.title, blogs.content, blogs.authorid, blogs.edited_at FROM authors Right JOIN blogs on authors.id = blogs.authorid ORDER BY blogs.created_at DESC;
SELECT * FROM authors JOIN blogs on authors.id = blogs.authorid WHERE blogs.id = 3;

CREATE USER 'blog_fullstack'@'localhost' IDENTIFIED BY 'blog_fullstack';
GRANT ALL PRIViLEGES ON blog_fullstack.* TO 'blog_fullstack'@'localhost';
FLUSH PRIVILEGES;

SELECT * FROM tags JOIN blogtags ON blogtags.blogid WHERE blogtags.blogid = blogid;





