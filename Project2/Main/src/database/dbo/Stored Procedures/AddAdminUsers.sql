CREATE procedure AddAdminUsers 
(@alias nvarchar(20))
As
begin
	if not exists (select 1 from dbo.[user] where alias = @alias)
	begin
		insert into [user]
		(alias)
		values(@alias)
	end
	declare @roleid int
	select @roleid = id from [role] where name = 'admin'
	if not exists (select 1 from dbo.[userrole] where alias = @alias and roleId = @roleid)
	begin
		
		insert into [userrole]
		(alias,roleid,isactive)
		values(@alias,@roleid,1)

		select 'User added successfully'
	end
	else 
	begin
		select 'User already exists or invalid parameter'
	end
end


