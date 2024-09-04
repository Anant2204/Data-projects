export enum ConversationStatus {
  Pending = "Pending",
  Required = "Required",
  Completed = "Completed",
}

export enum Conversation {
  Required = "Required",
  Optional = "Optional",
}


export enum FeatureNames {
  SendStayConversation = "SendStayConversation",
  ReceiveConversation = "ReceiveConversation",
  Summary = "Summary", 
  Reports = "Reports", 
  ConversationScript = "ConversationScript", 
  FutureManagerCorrection = "FutureManagerCorrection", 
  AssignScriptContributor = "AssignScriptContributor", 
  AssignProxy = "AssignProxy", 
  AssignEDMLead = "AssignEDMLead", 
  Notifications = "Notifications",
  TaxonomyCorrection = "TaxonomyCorrection",
}

export enum PermissionType {
  Read = "read",
  Write = "write",
  Approve = "approve", 
} 

export enum SectionNames {
  KeyMessageToLand = "KeyMessageToLand",
  UsefulResource = "UsefulResource",
  OpeningContext = "OpeningContext",
  OpeningHeaderContext = "OpeningHeaderContext", 
  SegmentContext = "SegmentContext", 
  TaxonomyContext = "TaxonomyContext", 
  TaxonomyContextExtended = "TaxonomyContextExtended", 
  ClosingContext = "ClosingContext", 
  SpecificChangeContext = "SpecificChangeContext", 
  SpecificChangeContextDate = "SpecificChangeContextDate", 
  SpecificChangeContextExtended = "SpecificChangeContextExtended", 
  Title = "Title", 
}

export enum RequestActionType {
  ApproveRequest = "Approve Request",
  RejectRequest = "Reject Request",
} 

export enum ManageScriptStatus {
  Approved = "approved",
  ReadyForReview = "ready for review",
} 
