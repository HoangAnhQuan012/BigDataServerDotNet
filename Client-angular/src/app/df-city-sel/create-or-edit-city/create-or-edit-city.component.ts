import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { CityModel } from '@shared/models/city.model';
import { DfCitySelService } from '@shared/services/df-city-sel.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmationService, Message } from 'primeng/api';
import { CityUpdate } from '@shared/models/CityUpdate.model';

@Component({
  selector: 'app-create-or-edit-city',
  templateUrl: './create-or-edit-city.component.html',
  styleUrls: ['./create-or-edit-city.component.scss']
})
export class CreateOrEditCityComponent extends AppComponentBase implements OnInit {
  @Output() onSave = new EventEmitter<any>();
  city: string;
  state_id: string;
  isView: boolean;
  isEdit: boolean;
  getValue: CityModel = new CityModel();
  getForEdit: CityUpdate = new CityUpdate();

  formData: FormGroup;
  saveHidden = false;
  msgs: Message[] = [];

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private cityService: DfCitySelService,
    private confirmationService: ConfirmationService
  ) {
    super(injector);
   }

  ngOnInit() {
    this._initForm();
    if (this.city && this.state_id) {
      this.cityService.getInfos(this.city, this.state_id).subscribe((data: any) => {
        this.getValue = data.result;
        this._setValueForEdit();
      });
      if (this.isView) {
        this.formData.disable();
        this.saveHidden = true;
      } else if (this.isEdit) {
        this.formData.controls.City.disable();
        this.formData.controls.State_Id.disable();
      }
    }
  }

  _initForm() {
    this.formData = this.formBuilder.group({
      City: ['', [Validators.required]],
      State_Id: ['', [Validators.required]],
      State_Name : ['', [Validators.required]],
      country_name : ['', [Validators.required]],
      Population : ['', [Validators.required]],
      Zips : ['', [Validators.required]],
    });
  }

  save() {
    if (this.isEdit) {
      this.getValueForEdit();
      this.isProgressed(this.city, this.state_id, this.getForEdit);
    } else {
      this.getValueForSave();
      console.log(JSON.stringify(this.getValue));
      this.cityService.createCity(this.getValue).subscribe(() => {
        this.showCreateMessage();
        this.bsModalRef.hide();
        this.onSave.emit();
      });
    }
  }

  isProgressed(city: string, state_id: string, otherValues: CityUpdate) {
    this.confirmationService.confirm({
      message: 'Do you want to update this project?',
      header: 'Update Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'Record deleted'}];
          this.cityService.updateCity(city, state_id, otherValues)
          .subscribe((data) => {
            this.showUpdateMessage();
            this.bsModalRef.hide();
            this.onSave.emit();
          });
      },
      reject: () => {
          this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
      }
    });
  }

  private _setValueForEdit() {
    this.formData.controls.City.setValue(this.getValue.city);
    this.formData.controls.State_Id.setValue(this.getValue.state_id);
    this.formData.controls.State_Name.setValue(this.getValue.state_name);
    this.formData.controls.country_name.setValue(this.getValue.country_name);
    this.formData.controls.Population.setValue(this.getValue.population);
    this.formData.controls.Zips.setValue(this.getValue.zips);
  }

  private getValueForSave() {
    this.getValue.city = this.formData.controls.City.value;
    this.getValue.state_id = this.formData.controls.State_Id.value;
    this.getValue.state_name = this.formData.controls.State_Name.value;
    this.getValue.country_name = this.formData.controls.country_name.value;
    this.getValue.population = this.formData.controls.Population.value;
    this.getValue.zips = this.formData.controls.Zips.value;
  }

  private getValueForEdit() {
    this.getForEdit.state_name = this.formData.controls.State_Name.value;
    this.getForEdit.country_name = this.formData.controls.country_name.value;
    this.getForEdit.population = this.formData.controls.Population.value;
    this.getForEdit.zips = this.formData.controls.Zips.value;
  }


}
