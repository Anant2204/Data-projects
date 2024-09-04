IF OBJECT_ID('[BSO].[GetLoggedInServices]', 'P') IS NOT NULL
BEGIN
    -- Drop the stored procedure if it exists
    DROP PROCEDURE [BSO].[GetLoggedInServices];
END
GO

-- Create the stored procedure
CREATE PROCEDURE BSO.GetLoggedInServices
AS
BEGIN
		SELECT 

    [ID],
    [Name],

    CASE 
        WHEN [IsNonIRISService] = 0 THEN [IRIS_Utterance]
        WHEN [IsNonIRISService] = 1 AND [IsDropdownUI] = 1 THEN [ServiceDropDownLinks]
        ELSE [ServiceRequestFormLink]
    END AS [FinalData],
	[IsNonIRISService],
	[IsDropdownUI],
	

    [AboutService],
    [relatedinformation],
   
    [ServiceCategories],
    [IsPrivate],
    [DataverseRowID],
    [isActive]
FROM [BSO].[Services] WITH (NOLOCK) WHERE isActive = 1
END;
