import { Entity } from 'breeze-client';

export interface RequestHeader extends Entity{
    id: number;
    eaRequest: EaRequest;
    name: string;
}

export interface EaRequest extends Entity {
    id: number;
    requestHeader: RequestHeader;
    name: string;
}