import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

export const accessControlEvents = eventGroup({
  source: 'Access Control',
  events: {
    openFilterUsersDialog: type<void>(),
    openCreateUserDialog: type<void>(),
  },
});
