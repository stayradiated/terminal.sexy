CREATE TABLE My_table(
    my_field1   INT,
    my_field2   VARCHAR(50),
    my_field3   DATE         NOT NULL,
    PRIMARY KEY (my_field1, my_field2)
);

ALTER TABLE My_table ADD my_field4 NUMBER(3) NOT NULL;

GRANT SELECT, UPDATE
    ON My_table
    TO some_user, another_user;

REVOKE SELECT, UPDATE
    ON My_table
    FROM some_user, another_user;

SELECT Book.title,
        COUNT(*) AS Authors
    FROM  Book JOIN Book_author
       ON Book.isbn = Book_author.isbn
    GROUP BY Book.title;
