CREATE OR ALTER PROCEDURE GetAllNotes
AS
BEGIN
  SELECT * FROM Notes ORDER BY createdAt DESC;
END
