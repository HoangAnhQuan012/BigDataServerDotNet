import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CityModel } from '@shared/models/city.model';
import { DfCitySelService } from '@shared/services/df-city-sel.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { Table } from 'primeng/table';
import { CreateOrEditCityComponent } from './create-or-edit-city/create-or-edit-city.component';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-df-city-sel',
  templateUrl: './df-city-sel.component.html',
  styleUrls: ['./df-city-sel.component.scss']
})
export class DfCitySelComponent extends AppComponentBase implements OnInit {
  @ViewChild('dt') table: Table;
  records: CityModel[] = [];
  paginator = true;
  loading = false;
  showCurrentPageReport = true;
  totalCount = 0;
  paginatorRows = 20;
  rowsPerPageOptions = [10, 20, 50, 100, 200, 500, 1000];
  scrollable = true;
  scrollHeight = '700px';
  skip = 0;

  // tslint:disable-next-line:no-inferrable-types
  keyword: string = '';

  msgs: Message[] = [];

  constructor(
    injector: Injector,
    private cỉtyService: DfCitySelService,
    private modalService: BsModalService,
    private confirmationService: ConfirmationService,
  ) {
    super(injector);
}

  ngOnInit() {
  }

  getDataPage(lazyload?: LazyLoadEvent) {
    let maxResultCount = this.table?.rows;

    if (lazyload) {
      this.skip = lazyload.first ?? this.skip;
      maxResultCount = lazyload.rows ?? maxResultCount;
    }
    this.keyword = this.keyword || '';
    this.cỉtyService.getCities(this.keyword, this.skip, maxResultCount).subscribe((data: any) => {
      this.records = data.result;
      this.totalCount = data.result.length;
    });
  }

  viewDetails(city: string, state_id: string) {
    this._showDialog(city, state_id, true);
  }

  createOrEditCity(city?: string, state_id?: string, isEdit?: boolean) {
    isEdit = isEdit || false;
    this._showDialog(city, state_id, false, isEdit);
  }

  deleteCity(city: string, state_id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this city?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'Record deleted'}];
          this.cỉtyService.deleteCity(city, state_id).subscribe(() => {
            this.showDeleteMessage();
            this.getDataPage();
          });
      },
      reject: () => {
          this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
      }
    });
  }

  private _showDialog(city: string, state_id: string, isView = false, isEdit?: boolean): void {
    let createDialog: BsModalRef;
    createDialog = this.modalService.show(
      CreateOrEditCityComponent,
      {
        class: 'modal-xl',
        ignoreBackdropClick: true,
        initialState: {
          city,
          state_id,
          isView,
          isEdit,
        },
      }
    );

    createDialog.content.onSave.subscribe(() => {
      this.getDataPage();
    });
  }


}
