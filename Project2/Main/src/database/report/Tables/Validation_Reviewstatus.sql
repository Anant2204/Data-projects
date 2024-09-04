
Create  table report.Validation_Reviewstatus 
( Reviewstatus nvarchar(128),
  EDMReviewstatuscode integer ,
  CountInplanSellerTable int,
  CountInSellerDetailsTable int,
  createdDate datetime default getutcdate(),
  createdBy nvarchar(40) default 'system',
  modifiedDate datetime default getutcdate(),
  modifiedBy nvarchar(40) default 'system'
  )

