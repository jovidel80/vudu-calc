import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {WebComponent} from './web/web.component';
import {GananciaWebComponent, LinioComponent} from './linio/linio.component';
import {RipleyComponent} from './ripley/ripley.component';
import {FalabellaComponent} from './falabella/falabella.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSnackBar} from "@angular/material/snack-bar";

@NgModule({
    declarations: [
        AppComponent,
        WebComponent,
        LinioComponent,
        RipleyComponent,
        FalabellaComponent,
        GananciaWebComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatCardModule,
        AppRoutingModule,
        HttpClientModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTableModule,
        MatTooltipModule,
        MatIconModule,
        ClipboardModule,
        MatTabsModule
    ],
    providers: [
        MatSnackBar
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
