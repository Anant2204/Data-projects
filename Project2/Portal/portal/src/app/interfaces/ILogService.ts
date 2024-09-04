export interface ILogService {
    CorrelationId: string;
    LogError: (errorMessage: string, ...errorObject: string[]) => void;
    LogEvent: (event: string, customDimensions?: {}) => void;
    LogTrace: (info: string, customDimensions?: {}) => void;
}
