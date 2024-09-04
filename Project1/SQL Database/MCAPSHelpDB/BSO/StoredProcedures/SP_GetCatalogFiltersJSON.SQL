IF OBJECT_ID('BSO.GetCatalogFiltersJSON', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.GetCatalogFiltersJSON;
END
GO

/****** Object:  StoredProcedure [BSO].[GetCatalogFiltersJSON]    Script Date: 12-03-2024 21:33:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [BSO].[GetCatalogFiltersJSON]
AS
BEGIN 

SELECT ID, Name, 'MCEM Stage' as type
FROM BSO.MCEMStage
WHERE IsActive = 1
UNION 

SELECT ID, Name, 'Category' as type
FROM BSO.ServicesCategory
WHERE IsActive = 1 

END;

GO