import { Injectable} from '@angular/core';
import { EntityManager, NamingConvention, DataService } from 'breeze-client';

@Injectable()
export class EntityManagerProvider {

    private static _masterManager: EntityManager;

    private _manager: EntityManager;

    constructor() { }

    prepare(): void {
        if (!EntityManagerProvider._masterManager) {
            NamingConvention.camelCase.setAsDefault();
            let dataService = new DataService({
                serviceName: 'breeze/default',
            });

            EntityManagerProvider._masterManager = new EntityManager({
                dataService: dataService
            }); 
            let metadataStore = EntityManagerProvider._masterManager.metadataStore;
        }
    }

    manager(): EntityManager {
        return this._manager || this.newManager();
    }

    private newManager(): EntityManager {
        this._manager = EntityManagerProvider._masterManager.createEmptyCopy();
        this._manager.importEntities(EntityManagerProvider._masterManager.exportEntities(null, { asString: false, includeMetadata: false }));
        //this._manager.hasChangesChanged.subscribe((...args: any[]) => { });
        return this._manager;
    }
}

