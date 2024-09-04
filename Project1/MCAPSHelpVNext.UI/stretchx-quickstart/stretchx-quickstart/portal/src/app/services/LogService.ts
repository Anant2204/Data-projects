import { ITelemetryClient } from '@msx/platform-services';
import { ILogService } from '../interfaces/ILogService';

export class LogService implements ILogService {
    public correlationId: string;
    private telemetryClient: ITelemetryClient;

    public constructor(telemetryClient: ITelemetryClient) {
        this.telemetryClient = telemetryClient;
        this.correlationId = telemetryClient ? telemetryClient.getCorrelationId() : 'no-assignement';
    }

    public get CorrelationId(): string {
        return this.telemetryClient.getCorrelationId();
    }

    public LogTrace(info: string, customDimensions?: {}): void {
        if (process.env.NODE_ENV === 'development') 
      

        if (this.telemetryClient) this.telemetryClient.trackTrace({ message: info }, customDimensions);
    }

    public LogEvent(event: string, customDimensions?: {}): void {
        if (process.env.NODE_ENV === 'development') 
       
        if (this.telemetryClient) this.telemetryClient.trackEvent({ name: event }, customDimensions);
    }
    public LogError(errorMessage: string, ...errorObject: string[]): void {
        if (process.env.NODE_ENV === 'development') console.error([errorMessage, ...errorObject].join('; '));

        if (this.telemetryClient)
            this.telemetryClient.trackException({
                error: new Error(this.getErrorObjectString(errorMessage, errorObject))
            });
    }

    private getErrorObjectString(errorMessage: string, errorObject: string[]): string {
        return errorObject && errorObject.length > 0 ? errorMessage + ': ' + errorObject.join('; ') : errorMessage;
    }
}

