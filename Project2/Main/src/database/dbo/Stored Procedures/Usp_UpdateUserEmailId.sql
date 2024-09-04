CREATE PROCEDURE [dbo].[Usp_UpdateUserEmailId]
	@isProd bit = 0
AS
	if @isProd = 0
	begin
		update hr.Brdg_AliasMgrMapping
		set emailId = 'mcttesters@microsoft.com'
	end 
	else
	begin
		update hr.Brdg_AliasMgrMapping
		set emailId = ic + '@microsoft.com'
	end
RETURN 0
