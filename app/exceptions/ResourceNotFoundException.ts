import { DomainException } from "./DomainException.js";

export default class ResourceNotFoundException extends DomainException {
    constructor(resource: string, id?: number){
        super(
            `${resource} não encontrado ${id ? ` (ID: ${id})` : '' }`, 
            'E_RESOURCE_NOT_FOUND', 
            404
        )
    }   
}