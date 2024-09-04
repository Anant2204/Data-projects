namespace Copilot.Backend.Core.DTO
{
    public class Enum
    {
        /// <summary>
        /// The Response Type
        /// </summary>
        public enum ResponseType
        {
            graph,
            htmltable,
            //table,
            text,
            markdown,
            //html,
            image,
            error

        }
        public enum ErrorCodes
        {
            /// <summary>
            /// Question and ParentId null error code
            /// </summary>
            Question_ParentId_Null = 1000,

            /// <summary>
            /// Parameters or Question to CloudGpt is null
            /// </summary>
            Parameters_Question_Null = 1001,

            /// <summary>
            /// Input is valid SQL query
            /// </summary>
            Valid_Sql_Query = 1002,

            /// <summary>
            /// Request Timeout DBCopilot
            /// </summary>
            DbCopilot_Request_Timeout = 1003,
        }
    }
}
