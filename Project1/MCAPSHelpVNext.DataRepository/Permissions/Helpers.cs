// <copyright file="Helpers.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Net;
using System.Web.Http;
using System.Net.Http;

namespace MCAPSHelp.Services.Managers
{
    public class Helpers
    {
        protected Helpers()
        { }

        public static string CallExceptions(HttpStatusCode statusCode, string message)
        {
            switch (statusCode)
            {
                case HttpStatusCode.BadRequest:
                    {
                        HttpResponseMessage resp1 = new HttpResponseMessage(HttpStatusCode.BadRequest)
                        {
                            Content = new StringContent(message),
                            ReasonPhrase = "Bad Request"
                        };
                        throw new HttpResponseException(resp1);
                    }
                case HttpStatusCode.NotFound:
                    {
                        HttpResponseMessage resp1 = new HttpResponseMessage(HttpStatusCode.NotFound)
                        {
                            Content = new StringContent(message, System.Text.Encoding.UTF8, "application/json"),
                            ReasonPhrase = "No data found"
                        };
                        throw new HttpResponseException(resp1);
                    }
                case HttpStatusCode.Forbidden:
                    {
                        HttpResponseMessage resp1 = new HttpResponseMessage(HttpStatusCode.Forbidden)
                        {
                            Content = new StringContent(message),
                            ReasonPhrase = "UnAuthorized"
                        };
                        throw new HttpResponseException(resp1);
                    }
                /*Modified NoContent to PartialContent as Data 
               is found but no corresponding Values for that data found*/
                case HttpStatusCode.PartialContent:
                    {
                        HttpResponseMessage resp1 = new HttpResponseMessage(HttpStatusCode.PartialContent)
                        {
                            Content = new StringContent(message),
                            ReasonPhrase = "No Content Found"
                        };
                        throw new HttpResponseException(resp1);
                    }
                default:
                    {
                        throw new HttpResponseException(statusCode);
                    }
            }

        }
    }
}
