import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { myOrgPreset } from './config.preset';

export const primeng = () => {
  return {
    theme: {
      preset: myOrgPreset,
    },
  };
};

export const providePrimengCoreServices = () => [MessageService, DialogService];
