import {ConfirmButtonConfig, ConfirmConfig, ToasterConfig} from 'ngx-mat-alert-confirm';

export class NotificationConfig {

  private static buttonOK: ConfirmButtonConfig = {
    id: 'btnOk', text: 'OK', color: 'primary'// , type: 'icon', icon: 'check_outline'
  };

  public static toasterMessage: ConfirmConfig = {
    title: '',
    titleSize: 28,
    message: '',
    messageSize: 16,
    matIcon: '',
    iconColor: '',
    buttons: [ NotificationConfig.buttonOK ],
    disableClose: true,
    autoFocus: true,
    restoreFocus: true
  };
}
