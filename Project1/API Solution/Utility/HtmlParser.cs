// <copyright file="HtmlParser.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using HtmlAgilityPack;

namespace MCAPSHelpVNext.Controllers.Utility
{
    public static class HtmlParser
    {
        public static string ExtractTextFromHtml(string html)
        {
            if (html != null)
            {
                HtmlDocument doc = new HtmlDocument();
                doc.LoadHtml(html);

                // Extract text from the document
                return doc.DocumentNode.InnerText.Trim();
            }
            return html;
        }
    }
}
