import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component ({
    selector: 'app-classic-search',
    templateUrl: './classicSearch.component.html',
    styleUrls: ['../search.component.scss', './classicSearch.component.scss']
})

export class ClassicSearchComponent implements OnInit{

    genres = [
        {name: 'GatunekA', checked: false},
        {name: 'GatunekB', checked: false},
        {name: 'GatunekC', checked: false},
        {name: 'GatunekD', checked: false},
        {name: 'GatunekE', checked: false},
        {name: 'GatunekF', checked: false},
        {name: 'GatunekG', checked: false}
    ];

    years: any[];
    yearsEnd: any[];
    selectedYear = 2016;
    selectedYearEnd = 2017;

    @Input() value:number;
    @Output() public valueChange:EventEmitter<string> = new EventEmitter<String>();

    updateRating(value) {
        this.valueChange.emit(value);
    }

    constructor(){
        this.years = [];
        for(let i = 2022; i >= 1950; i--){
            this.years[2022 - i] = i;
        }

        this.yearsEnd = [];
        for(let i = 2022; i >= 1950; i--){
            this.yearsEnd[2022 - i] = i;
        }
    }

    ngOnInit(){
        this.value = 0;
    }

    get selectedGenres() {
        return this.genres
            .filter(opt => opt.checked);
    }
}
