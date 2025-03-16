export class InvalidCredentialsError extends Error {
    constructor(
        message = 'Invalid username or password',
        public metadata?: Record<string, any> 
    ) {
        super(message);
        this.name = 'InvalidCredentialsError';
    }
}