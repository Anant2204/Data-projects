// <copyright file="TokenHelper.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.Configurations;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;

namespace MCAPSHelp.Services.Managers.Permissions
{
    internal class TokenHelper
    {
        protected TokenHelper()
        { }

        private static string AADInstance = MyLibraryConfiguration.Configuration["IrisSupportAPI:AADInstance"].ToString();
        private static string Tenant = MyLibraryConfiguration.Configuration["IrisSupportAPI:Tenant"].ToString();
        private static string AADTokenPath = MyLibraryConfiguration.Configuration["IrisSupportAPI:AADTokenPath"].ToString();
        private static string IRISClientID = MyLibraryConfiguration.Configuration["IrisSupportAPI:IRISAPIClientID"].ToString();
        private static string IRISClientSecret = MyLibraryConfiguration.Configuration["IrisSupportAPI:IRISAPIClientSecret"].ToString();        
        private static string IRISAPIScope = MyLibraryConfiguration.Configuration["IrisSupportAPI:IRISAPIScope"].ToString();
        


        public static async Task<Token> GetIRISToken(HttpClient client)
        {
            string baseAddress = $"{AADInstance}/{Tenant}/{AADTokenPath}"; 

            const string grant_type = "client_credentials";
            string client_id =IRISClientID;
            string client_secret = IRISClientSecret;

            var form = new Dictionary<string, string>
                {
                    {"grant_type", grant_type},
                    {"client_id", client_id},
                    {"client_secret", client_secret},
                    {"scope",IRISAPIScope }
                };
            
            HttpResponseMessage tokenResponse = await client.PostAsync(baseAddress, new FormUrlEncodedContent(form));
            var jsonContent = await tokenResponse.Content.ReadAsStringAsync().ConfigureAwait(false);
            Token tok = JsonConvert.DeserializeObject<Token>(jsonContent);
            return tok;
        }

    }

    internal class Token
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }

        [JsonProperty("token_type")]
        public string TokenType { get; set; }

        [JsonProperty("expires_in")]
        public int ExpiresIn { get; set; }

        [JsonProperty("refresh_token")]
        public string RefreshToken { get; set; }
    }
}


    
    
   

