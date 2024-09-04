# Setting Up a Local Database in SQL Server

## Introduction
This guide outlines the steps to create a local database in SQL Server and execute SQL scripts for schema creation and data insertion. This process is useful for development and testing purposes.

## Prerequisites
- **SQL Server**: Ensure that SQL Server is installed on your local machine.
- **SQL Server Management Studio (SSMS)**: Install SSMS for executing SQL scripts.

## Steps

### 1. Open SQL Server Management Studio (SSMS)
   - Launch SSMS and connect to your local SQL Server instance.

### 2. Create a New Database
   - Right-click on "Databases" in the Object Explorer.
   - Select "New Database."
   - Enter a name for your database (e.g., `MCAPSHelpVnextData`).
   - Configure other settings as needed and click "OK."

### 3. Execute SQL Script for Schema Creation
   - Run a SQL script from the Tables Folder and Run the (e.g.,`Script.sq`) with the necessary SQL statements for table creation, constraints, etc.
   - Open the script in SSMS.
   - Select the target database (`MCAPSHelpVnextData`) in the toolbar.
   - Execute the script by clicking the "Execute" button or pressing `F5`.
   - Once you execute the above script now you need to execute the another one
   - Now open the folder, TestData, open the Services.sql and BSO.Area.sql and execute it.
   - after the execution of this, need to run the StoredProcedures, open the folder 
   - SP_AddUser.sql
	- SP_FindUser.sql
	- SP_GetAllUsers.sql
	- SP_UpdateUser.sql
	

### 4. Now modify the connection string
   - Open the connection string from the appSetting.json
   - Modify the connection string and change the name of the DB.
   - Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=MCAPSHelpVnextData;Integrated Security=True;Encrypt=False"

