CREATE OR ALTER PROCEDURE CreateNote
  @title NVARCHAR(255),
  @content NVARCHAR(MAX)
AS
BEGIN
  INSERT INTO Notes (title, content)
  VALUES (@title, @content);

  SELECT * FROM Notes WHERE id = SCOPE_IDENTITY();
END
