export class InsufficientBalanceError extends Error {
    constructor(
        message = 'Insufficient balance',
        public metadata?: Record<string, any> 
    ) {
        super(message);
        this.name = 'InsufficientBalanceError';
    }
}