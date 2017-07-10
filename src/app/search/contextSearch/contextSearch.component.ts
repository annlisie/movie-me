import {Component} from '@angular/core';

@Component ({
    selector: 'app-context-search',
    templateUrl: './contextSearch.component.html',
    styleUrls: ['./contextSearch.component.css']
})

export class ContextSearchComponent {

    company = [
        {name: 'Sam/sama'},
        {name: 'Znajomi'},
        {name: 'Rodzina'},
        {name: 'Partner/partnerka'},
        {name: 'Dzieci'}
    ];
    selectedCompanion = 'Znajomi';

    days = [
        {name: 'Dzień wolny', checked: false},
        {name: 'Dzień roboczy', checked: false}
    ];
    selectedDay = 'Dzień wolny';

}
