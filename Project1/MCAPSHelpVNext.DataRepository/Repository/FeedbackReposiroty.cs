// <copyright file="FeedbackReposiroty.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using MCAPSHelpVNext.DataRepository.Configurations;
using MCAPSHelpVNext.DataRepository.Context;
using MCAPSHelpVNext.DataRepository.HelperModel;
using MCAPSHelpVNext.DataRepository.IRepository;
using MCAPSHelpVNext.DataRepository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.Repository
{
    public class FeedbackReposiroty : IFeedbackReposiroty, IDisposable
    {

        private readonly BSODBContext _dbContext;
        public FeedbackReposiroty(BSODBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> SASTokenGeneratorAndFileUpload(IFormFile file, string type)
        {
            if (file == null)
            {
                throw new ArgumentNullException(nameof(file));
            }

            try
            {
                var blobNameWithRandomNumber = "";
                string accountName = MyLibraryConfiguration.Configuration["BlobStorageAccount:AccountName"].ToString();
                string accountKey = MyLibraryConfiguration.Configuration["BlobStorageAccount:AccountKey"].ToString();
                string containerName = MyLibraryConfiguration.Configuration["BlobStorageAccount:ContainerName"].ToString();
                int ExpiresOnYear = Convert.ToInt16(MyLibraryConfiguration.Configuration["BlobStorageAccount:ExpiresOnYear"]);
               
              
                string folderVideoName = "FolderVideoName"; // Default value

                if (MyLibraryConfiguration.Configuration != null)
                {
                    var announcementConfig = MyLibraryConfiguration.Configuration["BlobStorageAccount:FolderVideoName"];
                    if (announcementConfig != null)
                    {
                        folderVideoName = announcementConfig.ToString();
                    }
                }

                string folderFileName = "FolderFileName"; // Default value

                if (MyLibraryConfiguration.Configuration != null)
                {
                    var announcementConfig = MyLibraryConfiguration.Configuration["BlobStorageAccount:FolderFileName"];
                    if (announcementConfig != null)
                    {
                        folderFileName = announcementConfig.ToString();
                    }
                }

                string folderImageName = "FolderImageName"; // Default value

                if (MyLibraryConfiguration.Configuration != null)
                {
                    var announcementConfig = MyLibraryConfiguration.Configuration["BlobStorageAccount:FolderImageName"];
                    if (announcementConfig != null)
                    {
                        folderImageName = announcementConfig.ToString();
                    }
                }

                string blobName = file.FileName;
                Random random = new Random();

                // Generate a random number (you can adjust the range as needed)
                int randomNumber = random.Next(1000, 9999); // Generates a random number between 1000 and 9999

                if(type == "video")
                {
                    blobNameWithRandomNumber = $"{folderVideoName}/{randomNumber}_{blobName}";
                }
                else if(type == "image")
                {
                    blobNameWithRandomNumber = $"{folderFileName}/{randomNumber}_{blobName}";
                }else
                {
                    if (type == "file")
                    {
                        blobNameWithRandomNumber = $"{folderImageName}/{randomNumber}_{blobName}";
                    }
                }
                

                var storageSharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
                var blobServiceClient = new BlobServiceClient(new Uri($"https://{accountName}.blob.core.windows.net"), storageSharedKeyCredential);
                var blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);

                var blobClient = blobContainerClient.GetBlobClient(blobNameWithRandomNumber);

                var sasBuilder = new BlobSasBuilder
                {
                    BlobContainerName = blobContainerClient.Name,
                    BlobName = blobClient.Name,
                    Resource = "b",
                    StartsOn = DateTimeOffset.UtcNow,
                    ExpiresOn = DateTimeOffset.UtcNow.AddYears(ExpiresOnYear), // Adjust the expiry time as needed
                    Protocol = SasProtocol.Https,
                };
                sasBuilder.SetPermissions(BlobContainerSasPermissions.Read | BlobContainerSasPermissions.Write);
                //| BlobContainerSasPermissions.Write

                var sasToken = sasBuilder.ToSasQueryParameters(storageSharedKeyCredential).ToString();
                var blobUriWithSas = $"{blobClient.Uri}?{sasToken}";

                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    memoryStream.Position = 0;
                    await blobClient.UploadAsync(memoryStream, true);
                }

                return blobUriWithSas;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<int> Add(InsertFeedbackHelperBinder userOb, string phrase)
        {
            if (userOb == null)
            {
                throw new ArgumentNullException(nameof(userOb));
            }

            try
            {
                var screenShotUrl = string.Empty;
                var videoURL = string.Empty;
                var fileURL = string.Empty;
                if (userOb.ImageFile != null)
                {
                    screenShotUrl = await SASTokenGeneratorAndFileUpload(userOb.ImageFile,"image");
                }
                if (userOb.VideoFile != null)
                {
                    videoURL = await SASTokenGeneratorAndFileUpload(userOb.VideoFile,"video");
                }
                if (userOb.File != null)
                {
                    fileURL = await SASTokenGeneratorAndFileUpload(userOb.File,"file");
                }
                var upnParam = new SqlParameter("@UserID", userOb.userID);
                var userSatisParam = new SqlParameter("@SatisfactionLevel", (object)userOb.satisfactionLevel ?? DBNull.Value);
                var userTellUsParam = new SqlParameter("@PleaseTellUs", (object)userOb.pleaseTellUs ?? DBNull.Value);
                var userScreenShotParam = new SqlParameter("@ScreenshotURL", (object)screenShotUrl ?? DBNull.Value);
                var userVideoURLParam = new SqlParameter("@VideoURL", (object)videoURL ?? DBNull.Value);
                var userFileParam = new SqlParameter("@FileURL", (object)fileURL ?? DBNull.Value);
                var userEmailParam = new SqlParameter("@Email", (object)userOb.email ?? DBNull.Value);
                var userPhraseParam = new SqlParameter("@ENCRYPTBYPASSPHRASE", (object)phrase ?? DBNull.Value);
                var userTypeOfFeedback = new SqlParameter("@TypeOfFeedback", (object)userOb.typeOfFeedback ?? DBNull.Value);
                var idParam = new SqlParameter("@Id", SqlDbType.Int) { Direction = ParameterDirection.Output };
                _dbContext.Database.ExecuteSqlRaw(
                    "EXEC BSO.InsertFeedback @UserID, @SatisfactionLevel, @PleaseTellUs, @ScreenshotURL, @VideoURL,@FileURL, @Email, @ENCRYPTBYPASSPHRASE, @TypeOfFeedback, @Id OUTPUT",
                    upnParam, userSatisParam, userTellUsParam, userScreenShotParam, userVideoURLParam, userFileParam, userEmailParam, userPhraseParam, userTypeOfFeedback, idParam);

                // Check if the generatedId is DBNull before casting to int
                var generatedId = idParam.Value == DBNull.Value ? 0 : (int)idParam.Value;

                var result = await _dbContext.SaveChangesAsync();

                return generatedId;
            }
            catch (Exception)
            {          
                throw;
            }
        }


        

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dbContext.Dispose();
                // Add disposal logic for other disposable objects if any
            }
        }
    }
}
