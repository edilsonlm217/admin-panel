import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { EditarComponent } from './pages/editar/editar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReceberComponent } from './pages/receber/receber.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { EditarFormComponent } from './pages/editar/editar-form/editar-form.component';
import { CadastrarFormComponent } from './pages/cadastrar/cadastrar-form/cadastrar-form.component';
import { RecebimentoFormComponent } from './pages/receber/recebimento-form/recebimento-form.component';
import { SubscriptionCardComponent } from './components/subscription-card/subscription-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SubscriptionCardComponent,
    ReceberComponent,
    EditarComponent,
    CadastrarComponent,
    HomeComponent,
    RecebimentoFormComponent,
    HeaderComponent,
    FooterComponent,
    CadastrarFormComponent,
    EditarFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
