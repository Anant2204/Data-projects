CREATE TABLE [HR].[Tbl_TestTimeZone] (
    [DecisionMadeOn]        DATETIME       NULL,
    [DecisionMakerComments] NVARCHAR (255) NULL,
    [RequestID]             INT            IDENTITY (1, 1) NOT NULL,
    CONSTRAINT [Tbl_TEST_RequestID_PK] PRIMARY KEY CLUSTERED ([RequestID] ASC)
);

