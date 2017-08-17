import {Component} from '@angular/core';

@Component ({
    selector: 'app-context-search',
    templateUrl: './contextSearch.component.html',
    styleUrls: ['../search.component.scss', './contextSearch.component.scss']
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
        {name: 'Weekend'},
        {name: 'Dzień roboczy'}
    ];
    selectedDay = 'Weekend';

    places = [
        {name: 'Dom'},
        {name: 'Miejsce publiczne'},
        {name: 'Dom znajomego'}
    ];
    selectedPlace = 'Dom';


}
