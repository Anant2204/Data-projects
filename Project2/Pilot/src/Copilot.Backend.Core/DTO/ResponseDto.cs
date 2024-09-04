namespace Copilot.Backend.Core.DTO
{
    /// <summary>
    /// DTO for generic API response
    /// </summary>
    public class ResponseDto
    {
        /// <summary>
        /// Gets or sets a value ConversationId.
        /// </summary>
        public string? ConversationId { get; set; }

        /// <summary>
        /// Gets or sets the question
        /// </summary>
        public string? Question { get; set; }

        /// <summary>
        /// Gets or sets the response type
        /// </summary>
        public string? ResponseType { get; set; }

        /// <summary>
        /// Gets or sets the intent Source
        /// </summary>
        public string? Source { get; set; }

        /// <summary>
        /// Gets or sets the response data.
        /// </summary>
        public object? Data { get; set; }
    }
    public class IntentResponse
    {
        public string? intent { get; set; }
        public string? responseFormat { get; set; }
    }
}
