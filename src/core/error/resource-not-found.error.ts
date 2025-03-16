export class ResourceNotFoundError extends Error {
    constructor(
        message = 'Resource not found',
        public metadata?: Record<string, any> 
    ) {
        super(message);
        this.name = 'ResourceNotFoundError';
    }
}