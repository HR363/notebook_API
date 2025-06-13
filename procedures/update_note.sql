CREATE OR ALTER PROCEDURE UpdateNote
  @id INT,
  @title NVARCHAR(255),
  @content NVARCHAR(MAX)
AS
BEGIN
  UPDATE Notes
  SET
    title = ISNULL(@title, title),
    content = ISNULL(@content, content)
  WHERE id = @id;

  SELECT * FROM Notes WHERE id = @id;
END
