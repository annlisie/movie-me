/**
 * Created by Ania on 12.06.2017.
 */
import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

@NgModule({
    providers: [Http, RequestOptions]
})

export class AuthenticationModule {}
