namespace Copilot.Backend.Core.DTO
{
    public class AutoSuggestionParams
    {
        /// <summary>
        /// input string to search
        /// </summary>
        public string? SearchString { get; set; }
        /// <summary>
        /// Number of records to search
        /// </summary>
        public string? NumberOfRecords { get; set; }
        
        /// <summary>
        /// Additional params to filter data
        /// </summary>
        public string? AdditionalParams { get; set; }
    }
}
