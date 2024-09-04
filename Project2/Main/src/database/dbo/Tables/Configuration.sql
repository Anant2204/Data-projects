create table dbo.Configuration 
([key] nvarchar (100),
 [value] nvarchar (max) ,
 createdDate datetime default getutcdate(),
 createdby nvarchar(40) default 'system',
 modifiedDate datetime default getutcdate(),
 modifiedBy nvarchar(40)  default 'system'
 PRIMARY KEY ([Key])
 )