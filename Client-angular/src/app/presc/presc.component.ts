import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { Table } from 'primeng/table';
import { PrescModel } from '@shared/models/presc.model';
import { DfPrescSelService } from '@shared/services/df-presc.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateOrEditPrescComponent } from './create-or-edit-presc/create-or-edit-presc.component';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-presc',
  templateUrl: './presc.component.html',
  styleUrls: ['./presc.component.scss']
})
export class PrescComponent extends AppComponentBase implements OnInit {
  @ViewChild('dt') table: Table;
  records: PrescModel[] = [];
  paginator = true;
  loading = false;
  showCurrentPageReport = true;
  totalCount = 0;
  paginatorRows = 20;
  rowsPerPageOptions = [10, 20, 50, 100, 200, 500, 1000];
  scrollable = true;
  scrollHeight = '700px';
  first = 0;

  // tslint:disable-next-line:no-inferrable-types
  keyword: string = '';

  msgs: Message[] = [];

  constructor(
    injector: Injector,
    private prescService: DfPrescSelService,
    private modalService: BsModalService,
    private confirmationService: ConfirmationService,
  ) {
    super(injector);
  }

  ngOnInit() {
  }

  getDataPage(lazyload?: LazyLoadEvent) {
    this.loading = true;
    this.keyword = this.keyword || '';
    const skipCount = lazyload ? lazyload?.first : this.table?.first;
    const maxResultCount = 20;
    this.prescService.getPresc(this.keyword, skipCount, maxResultCount)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe((data: any) => {
        this.records = data.result.Items;
        this.totalCount = data.result.Total_count;

        if (!lazyload) {
          this.first = 0;
        }
      });
  }

  createOrEditPresc(presc_id?: string, isEdit?: boolean) {
    isEdit = isEdit || false;
    this._showDialog(presc_id, false, isEdit);
  }

  viewDetails(presc_id: string) {
    this._showDialog(presc_id, true);
  }

  deleteCity(presc_id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this presc?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
        this.prescService.deletePresc(presc_id).subscribe(() => {
          this.showDeleteMessage();
          this.getDataPage();
        });
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  private _showDialog(presc_id: string, isView = false, isEdit?: boolean): void {
    let createDialog: BsModalRef;
    createDialog = this.modalService.show(
      CreateOrEditPrescComponent,
      {
        class: 'modal-xl',
        ignoreBackdropClick: true,
        initialState: {
          presc_id,
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
