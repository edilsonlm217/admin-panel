import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { RecebimentoForm } from '../recebimento-model';

@Component({
  selector: 'app-recebimento-form',
  templateUrl: './recebimento-form.component.html',
  styleUrls: ['./recebimento-form.component.scss']
})
export class RecebimentoFormComponent implements OnInit {
  @Input() cnpj!: string;
  @Input() valorPago!: number;
  @Input() dataPagamento!: string;
  @Input() proximoPagamento!: string;

  recebimentoForm!: RecebimentoForm;

  constructor(
    public api: ApiService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.inicializarRecebimentoForm();
  }

  inicializarRecebimentoForm(): void {
    this.recebimentoForm = new RecebimentoForm(
      this.valorPago,
      this.dataPagamento,
      this.proximoPagamento
    );
  }

  async handleSubmit(): Promise<void> {
    try {
      await this.api.receberPagamento({
        cnpj: this.cnpj,
        valorPago: this.recebimentoForm.valorPago,
        dataPagamento: this.recebimentoForm.dataPagamento,
        proximoPagamento: this.recebimentoForm.proximoPagamento
      });
      this.router.navigateByUrl('/');
    } catch (error) {
      console.error(error);
    }
  }
}
