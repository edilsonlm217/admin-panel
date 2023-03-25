import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { TenantService } from 'src/app/services/tenant.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  tenantId!: string;

  constructor(
    private route: ActivatedRoute,
    public tenantService: TenantService,
    public api: ApiService,
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(
      (params: any) => {
        const id = params['tenantId'];
        if (!id) return;
        this.setTenantId(id);
      }
    );
  }

  setTenantId(id: string) {
    this.tenantId = id;
  }

  getTenantIdFromQueryParams(): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      this.route.queryParams.subscribe(
        (params: any) => { resolve(params['tenantId']) },
        (error) => { reject(error) }
      );
    })
  }
}
