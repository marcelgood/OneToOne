import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { BreezeBridgeAngular2 } from 'breeze-bridge-angular2';
import { EntityManagerProvider } from './entity-manager-provider';
import { EntityQuery } from 'breeze-client';
import { RequestHeader, EaRequest } from './model';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    providers: [HTTP_PROVIDERS, BreezeBridgeAngular2, EntityManagerProvider]
})
export class AppComponent implements OnInit {
    model: RequestHeader[];
    ready: boolean;

    constructor(bridge: BreezeBridgeAngular2, private emProvider: EntityManagerProvider) { }

    ngOnInit() {
        this.emProvider.prepare();
        this.load();
    }

    newHeader() {
        let manager = this.emProvider.manager();

        let requestHeader = <RequestHeader>manager.createEntity('RequestHeader', {
            name: `Header - ${new Date().toTimeString()}`
        });
        let eaRequest = <EaRequest>manager.createEntity('EaRequest', {
            name: `EaRequest - ${new Date().toTimeString()}`,
            id: requestHeader.id
        });

        manager.saveChanges().then(data => {
            alert(`${data.entities.length} entities saved! EaRequest.Id = ${eaRequest.id}`);
            this.load();
        })
            .catch(reason => {
                alert(reason);
        });
    }

    load() {
        let query = EntityQuery.from('requestheaders');
        this.emProvider.manager().executeQuery(query).then(data => {
            this.model = <RequestHeader[]>data.results;
            alert(`Queried ${data.results.length} header.`);
            this.ready = true;
        });
    }
}
