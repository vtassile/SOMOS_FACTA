
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { TransfieroRoutingModule } from './transfiero-routing.module';
import { TransfieroComponent } from './transfiero.component';

import { UserService } from "@app/service/user.service";
import { MoneyService } from '@app/service/money.service';
import { TMovService } from '@app/service/tmov.service';

@NgModule({
    imports: [CommonModule, TransfieroRoutingModule, FormsModule, ReactiveFormsModule,
        NotifierModule, ZXingScannerModule, AutocompleteLibModule,
        NgbModule],
    exports: [TransfieroComponent],
    providers: [UserService, MoneyService, TMovService],
    declarations: [TransfieroComponent]
})
export class TransfieroModule { }
