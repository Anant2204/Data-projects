/*
 * MCT, Manager Conversation tool.
 * Copyright (C) 2024 Microsoft
*/

namespace MCT.API
{
    /// <summary>
    /// constants class for maintain guids 
    /// </summary>
    public static class GuidConstants
    {

        /// <summary>
        /// The action guids
        /// </summary>
        public static readonly Dictionary<string, string> ActionGuids = new Dictionary<string, string>
     {
        {"Manager#Get", "fa5da930-4e16-48ed-8201-f618b57341ad"},

        {"ReceiveConversation#Get", "3826521a-557a-42fa-b805-a40ef6518e6d"},
        {"ReceiveConversation#GetStatistics", "e2a5a9c9-7371-4eee-949a-6a7ace9a4672" },
        {"ReceiveConversation#GetEmpConversationScript", "98261216-1694-4a25-a66a-962826ef0895"},
        {"ReceiveConversation#CompleteReceiveConversation", "1b872ffe-6a97-448b-b255-ee65e9558186"} ,

        {"SendStayConversation#Get", "0c55840c-828b-4013-a834-74134dd95735" },
        {"SendStayConversation#CompleteSendConversation", "72918224-9f3e-40e9-ac7a-ca0bef535767"},
        {"SendStayConversation#GetStatistics", "e2a5a9c9-7371-4eee-949a-6a7ace9a467"} ,
        {"SendStayConversation#GetEmpConversationScript", "eb652d2e-774e-4247-b2aa-382326ed3283"} ,

        {"FYSummary#GetStatistics", "3027d971-719a-45e1-ad2b-2d3897fcaac4" },
        {"FYSummary#GetCurrentYearEmployees", "4e8e72f9-a2d6-48e5-ae3a-97ac2d969927"},
        {"FYSummary#GetFutureYearEmployees", "d12644db-5eff-4a95-aabf-a6dfe9bb821e"},

        {"ConversationScript#UpdateConversationScript", "214dc57e-55a0-45d0-ab28-3b114197b604" },
        {"ConversationScript#GetSpecificChanges", "6351e317-5470-4155-b0ab-d149d9a1f400"},

        {"Common#GetLoggedInUserPrivilege", "bed4948d-c29b-4ea2-a1bf-3bab60987226" },
        {"Common#GetOrgDetailsAsync", "db95912d-6545-47c6-a37f-96204f0c873c" },
        {"Common#GetGridSettingsAsync", "652b2ce4-7330-4af8-bdc8-045ffc44fb2e" },

        {"FutureManagerCorrection#FutureManagerCorrectionRequest", "1DDD2E4D-EDED-4AAC-9E12-A04A66314E1B" },
        {"FutureManagerCorrection#UpdateFYManagerCorrectionStatusAsync", "3322d1d7-b264-4da4-bcc6-b05aed4c73b6" },
        {"FutureManagerCorrection#GetFutureManager", "bed4948d-c29b-4ea2-ajjf-3bab60987226" },
        {"FutureManagerCorrection#UpdateFutureManager", "409ea077-abc5-4611-bbbb-2e93e90f7641" },

        {"TaxonomyCorrection#getTaxonomyDetails", "da0497f8-73c6-41a1-a68f-231245dcf0df" },
        {"TaxonomyCorrection#UpdateTaxonomy", "6d2df25b-54fd-40f6-820e-55b3f0c1b5e1" },
        {"TaxonomyCorrectio#GetTaxonomyChangeRequestAsync","abdbd329-8d5a-44a1-bb87-7f56d93bd9c2"},

        {"Common#GetTaxonomyDetailsInHierarchy", "ea0e8fb7-d9c0-42b3-be2a-8a9a5cc9ee67" },

        {"Default", "06e4fa35-2f43-42bb-8686-8f3d1f4cc44"},

        {"TaxonomyScriptContent#Get", "a3efb457-abdf-4733-9418-906951b53a3e" },
        {"TaxonomyScriptContent#GetFYManagersForScriptExclusion", "8111e6c5-e06c-48d4-9ec3-c39442248787" },
        {"TaxonomyScriptContent#GetStatistics", "2a780cae-1ee7-4889-9746-51ac234963e5" },
        {"TaxonomyScriptContent#UpdateTaxonomyScriptContentStatusAsync", "3c3fe474-e291-452c-a013-786dd33292fc" },
        {"TaxonomyScriptContent#GetAuditDetailsAsync", "b2334b5b-ded2-46c1-8168-afd61fac0302" },
        {"TaxonomyScriptContent#CreateOrUpdateTaxonomyScriptContent", "a9d8f849-4a24-4de4-8de2-730fde7000e1" },
        {"TaxonomyScriptContent#ImportTaxonomyScriptContent", "59b39d39-72cf-4bd0-92d2-9ee1b6660a97" },

     };
    }
}
