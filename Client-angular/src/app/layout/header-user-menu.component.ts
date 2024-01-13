import { Component, ChangeDetectionStrategy, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { AbpSessionService } from 'abp-ng2-module';

@Component({
  selector: 'header-user-menu',
  templateUrl: './header-user-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
      .text-middle {
        display: flex;
        align-items: center;
      }

      p {
        margin-bottom: 0;
      }
  `]
})
export class HeaderUserMenuComponent extends AppComponentBase implements OnInit {

  username = '';

  constructor(
    injector: Injector,
    private _authService: AppAuthService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.username = this.appSession.getShownLoginName();
  }

  logout(): void {
    this._authService.logout();
  }
}
