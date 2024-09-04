SET IDENTITY_INSERT [BSO].[Announcement] ON 
GO
INSERT [BSO].[Announcement] ([ID], [Title], [Description], [StartDate], [EndDate], [IsAnnouncement], [Type]) VALUES (1, N'Scheduled Maintenance', N'<div>Site is under maintenance. </div>', CAST(N'2024-01-01T14:48:55.160' AS DateTime), CAST(N'2024-01-03T14:48:55.160' AS DateTime), 1, N'Critical')
SET IDENTITY_INSERT [BSO].[Announcement] OFF
GO