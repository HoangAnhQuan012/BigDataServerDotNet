import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrescModel } from '@shared/models/presc.model';
import { DfPrescSelService } from '@shared/services/df-presc.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PrescUpdate } from '@shared/models/presc-update.model';
import { AppComponentBase } from '@shared/app-component-base';
import { Table } from 'primeng/table';
import { PrescComponent } from '../presc.component';

@Component({
  selector: 'app-create-or-edit-presc',
  templateUrl: './create-or-edit-presc.component.html',
  styleUrls: ['./create-or-edit-presc.component.scss']
})
export class CreateOrEditPrescComponent extends AppComponentBase implements OnInit {
  @Output() onSave = new EventEmitter<any>();
  @ViewChild('dt') table: Table;
  @ViewChild('#presc') presc: PrescComponent;
  presc_id: string;
  isView: boolean;
  isEdit: boolean;

  formData: FormGroup;
  getValue: PrescModel = new PrescModel();
  saveHidden = false;
  getForEdit: PrescUpdate = new PrescUpdate();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private prescService: DfPrescSelService,
  ) {
    super(injector);
   }

  ngOnInit() {
    this._initForm();
    if (this.presc_id) {
      this.prescService.getInfos(this.presc_id).subscribe((data: any) => {
        this.getValue = data.result;
        this._setValueForEdit();
      });
      if (this.isView) {
        this.formData.disable();
        this.saveHidden = true;
      } else if (this.isEdit) {
        this.formData.controls.Presc_Id.disable();
      }
    }
  }

  _initForm() {
    this.formData = this.formBuilder.group({
      Presc_Id: ['', [Validators.required]],
      presc_city: ['', [Validators.required]],
      presc_state : ['', [Validators.required]],
      presc_spclt : ['', [Validators.required]],
      drug_name : ['', [Validators.required]],
      tx_cnt : ['', [Validators.required]],
      total_day_supply : ['', [Validators.required]],
      total_drug_cost : ['', [Validators.required]],
      years_of_exp : ['', [Validators.required]],
      Country_name : ['', [Validators.required]],
      presc_fullname : ['', [Validators.required]],
    });
  }

  save() {
    if (this.isEdit) {
      this.getValueForEdit();
      this.prescService.updatePresc(this.presc_id, this.getForEdit).subscribe((data: any) => {
        this.showUpdateMessage();
        this.bsModalRef.hide();
        this.onSave.emit();
        this.presc.getDataPage();
      });
    } else {
      this.getValueForSave();
      this.prescService.createPresc(this.getValue).subscribe((data: any) => {
        this.showCreateMessage();
        this.bsModalRef.hide();
        this.onSave.emit();
        this.presc.getDataPage();
      });
    }
  }

  private _setValueForEdit() {
    this.formData.controls.Presc_Id.setValue(this.getValue.presc_id);
    this.formData.controls.presc_city.setValue(this.getValue.presc_city);
    this.formData.controls.presc_state.setValue(this.getValue.presc_state);
    this.formData.controls.presc_spclt.setValue(this.getValue.presc_spclt);
    this.formData.controls.drug_name.setValue(this.getValue.drug_name);
    this.formData.controls.tx_cnt.setValue(this.getValue.tx_cnt);
    this.formData.controls.total_day_supply.setValue(this.getValue.total_day_supply);
    this.formData.controls.total_drug_cost.setValue(this.getValue.total_drug_cost);
    this.formData.controls.years_of_exp.setValue(this.getValue.years_of_exp);
    this.formData.controls.Country_name.setValue(this.getValue.Country_name);
    this.formData.controls.presc_fullname.setValue(this.getValue.presc_fullname);
  }

  private getValueForEdit() {
    this.getForEdit.presc_city = this.formData.controls.presc_city.value;
    this.getForEdit.presc_state = this.formData.controls.presc_state.value;
    this.getForEdit.presc_spclty = this.formData.controls.presc_spclt.value;
    this.getForEdit.drug_name = this.formData.controls.drug_name.value;
    this.getForEdit.tx_cnt = this.formData.controls.tx_cnt.value;
    this.getForEdit.total_day_supply = this.formData.controls.total_day_supply.value;
    this.getForEdit.total_drug_cost = this.formData.controls.total_drug_cost.value;
    this.getForEdit.years_of_exp = this.formData.controls.years_of_exp.value;
    this.getForEdit.Country_name = this.formData.controls.Country_name.value;
    this.getForEdit.presc_fullname = this.formData.controls.presc_fullname.value;
  }

  private getValueForSave() {
    this.getValue.presc_id = this.formData.controls.Presc_Id.value;
    this.getValue.presc_city = this.formData.controls.presc_city.value;
    this.getValue.presc_state = this.formData.controls.presc_state.value;
    this.getValue.presc_spclt = this.formData.controls.presc_spclt.value;
    this.getValue.drug_name = this.formData.controls.drug_name.value;
    this.getValue.tx_cnt = this.formData.controls.tx_cnt.value;
    this.getValue.total_day_supply = this.formData.controls.total_day_supply.value;
    this.getValue.total_drug_cost = this.formData.controls.total_drug_cost.value;
    this.getValue.years_of_exp = this.formData.controls.years_of_exp.value;
    this.getValue.Country_name = this.formData.controls.Country_name.value;
    this.getValue.presc_fullname = this.formData.controls.presc_fullname.value;
  }

}
