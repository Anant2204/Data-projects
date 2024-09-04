// <copyright file="Constants.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging
{
    /// <summary>
    /// Define logging constants.
    /// </summary>
    public static class Constants
    {
        /// <summary>
        /// The API version header.
        /// </summary>
        public const string ApiVersion = "api-version";

        /// <summary>
        /// The activity identifier header.
        /// </summary>
        public const string ActivityIdHeader = "x-ose-activity-id";

        /// <summary>
        /// The activity identifier header.
        /// </summary>
        public const string UserId = "x-ose-user-id";

        /// <summary>
        /// The content type header.
        /// </summary>
        public const string ContentTypeHeader = "Content-Type";

        /// <summary>
        /// The SAS key header for EventGrid topic.
        /// </summary>
        public const string EventAuthKey = "aeg-sas-key";

        /// <summary>
        /// The route template name.
        /// </summary>
        public const string RouteTemplateName = "RouteTemplate";

        /// <summary>
        /// The source file name.
        /// </summary>
        public const string SourceFileName = "sourceFile";

        /// <summary>
        /// The source line name.
        /// </summary>
        public const string SourceLineName = "sourceLine";

        /// <summary>
        /// The calling member name.
        /// </summary>
        public const string CallingMemberName = "callingMember";

        /// <summary>
        /// The request size name.
        /// </summary>
        public const string RequestSizeName = "RequestSize";

        /// <summary>
        /// The response size name.
        /// </summary>
        public const string ResponseSizeName = "ResponseSize";

        /// <summary>
        /// The tag unique identifier name.
        /// </summary>
        public const string TagGuidName = "tagGuid";

        /// <summary>
        /// The method name.
        /// </summary>
        public const string MethodName = "Method";
    }
}