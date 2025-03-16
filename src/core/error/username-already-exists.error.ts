export class UsernameAlreadyExistsError extends Error {
    constructor(
        message = 'Username already exists',
        public metadata?: Record<string, any> 
    ) {
        super(message);
        this.name = 'UsernameAlreadyExistsError';
    }
}