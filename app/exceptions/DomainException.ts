export class DomainException extends Error {
    constructor(
        message: string,
        public readonly code: string,
        public readonly status: number = 500,
        public readonly details?: any
    ){
        super(message);
        this.name = this.constructor.name;
    }
}