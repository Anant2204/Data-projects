Create   table dbo.ErrorLogTable
( ErrorType nvarchar(256) ,
  TableName nvarchar(256),
  ErrorMsg nvarchar (max),
  createdDatetime datetime default getutcdate(),
  createdBy nvarchar(40) default 'system',
  modifiedDatetime datetime default getutcdate(),
  modifiedBy nvarchar(40) default 'system'
  );