import {
  signalStore,
  withMethods,
  withProps,
  patchState,
  withState,
  withHooks,
  withComputed,
} from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import {
  TreeSelectNodeCollapseEvent,
  TreeSelectNodeExpandEvent,
} from 'primeng/treeselect';
import { TreeNode } from 'primeng/api';
import { tapResponse } from '@ngrx/operators';
import { FormControl } from '@angular/forms';

import {
  setFulfilled,
  setPending,
  withRequestStatus,
} from '@business-portal/core/store';
import { BusinessGroupsCoreStore } from '@business-portal/core/business-groups';
import { BusinessGroupCore } from '@business-portal/core/business-groups';
import {
  UserAssignmentsAssignableUserRole,
  UserAssignmentsBusinessEntitiesDataService,
  UserAssignmentsBusinessEntitySummarized,
} from '@business-portal/administration/user-assignments/domain';
import { DynamicDialogStore } from '@business-portal/pattern';
import { UserAssignmentCreateDynamicDialogConfig } from './assignment-create-dialog.data.model';
import {
  EXPANDABLE_ITEM_CLASS,
  GLOBAL,
  NON_EXPANDABLE_ITEM_CLASS,
  rolesToScopeTreeSelectConfig,
  ScopeTreeSelectConfig,
} from './scope-tree-select.config';
import {
  RoleScopesMetaData,
  ScopeTreeSelectModel,
} from './scope-tree-select.model';

export const UserAssignmentCreateDialogScopeTreeSelectInteractionStore =
  signalStore(
    withDevtools('user-assignment-create-dialog-scope-tree-select-interaction'),
    withState<{
      scopeTreeSelect: ScopeTreeSelectModel[];
      scopeTreeSelectConfig: ScopeTreeSelectConfig;
    }>({
      scopeTreeSelect: [],
      scopeTreeSelectConfig: {
        showGlobal: true,
        expandableBusinessGroups: true,
        selectableBusinessGroups: true,
        expandableBusinessEntities: false,
        selectableBusinessEntities: true,
      },
    }),
    withRequestStatus(),
    withProps(() => ({
      _dynamicDialogStore: inject(DynamicDialogStore),
      _businessGroupsCoreStore: inject(BusinessGroupsCoreStore),
      _userAssignmentsBusinessEntitiesDataService: inject(
        UserAssignmentsBusinessEntitiesDataService
      ),
    })),
    withComputed((store) => ({
      scopeTreeSelectOptions: computed(() => store.scopeTreeSelect()),
      loading: computed(() => store.isPending()),
      businessGroupsLoading: computed(() =>
        store._businessGroupsCoreStore.isPending()
      ),
      dialogForm: computed(
        () =>
          store._dynamicDialogStore.getActiveDialog<UserAssignmentCreateDynamicDialogConfig>()
            .form
      ),
    })),
    withComputed((store) => ({
      userRoleValueChanges: computed(
        () => store.dialogForm().controls.userRole.valueChanges
      ),
      scopeControl: computed(() => store.dialogForm().controls.scope),
    })),
    withMethods((store) => {
      return {
        businessGroupsUpdated: rxMethod<BusinessGroupCore[]>(
          pipe(
            tap((bGroups) => {
              patchState(store, {
                scopeTreeSelect: bGroups.map((bGroup) => {
                  return mapItemToTreeNode(
                    `BG${bGroup.id}`,
                    bGroup.name,
                    bGroup.id,
                    store.scopeTreeSelectConfig().selectableBusinessGroups,
                    store.scopeTreeSelectConfig().expandableBusinessGroups,
                    RoleScopesMetaData.BusinessGroup
                  );
                }),
              });

              updateGlobalNodeInScopeTreeSelect(
                store.scopeTreeSelect(),
                store.scopeTreeSelectConfig()
              );
            })
          )
        ),
        getBusinessEntitiesSummarizedByBusinessGroup:
          rxMethod<TreeSelectNodeExpandEvent>(
            pipe(
              switchMap((param) => {
                patchState(store, setPending());
                const bGroupId = Number(param.node.data);
                return store._userAssignmentsBusinessEntitiesDataService
                  .getBusinessEntitiesSummarizedByBusinessGroup(bGroupId)
                  .pipe(
                    tapResponse({
                      next: (response) => {
                        const bGroupNode = store
                          .scopeTreeSelect()
                          .find((node) => node.data === bGroupId);
                        if (bGroupNode) {
                          bGroupNode.children = response.map((bEntity) => {
                            return mapItemToTreeNode(
                              `BE${bEntity.id}`,
                              bEntity.displayName,
                              bEntity.id,
                              store.scopeTreeSelectConfig()
                                .selectableBusinessEntities,
                              isBusinessEntityExpandable(
                                bEntity,
                                store.scopeTreeSelectConfig()
                                  .expandableBusinessGroups
                              ),
                              RoleScopesMetaData.BusinessEntity
                            );
                          });

                          patchState(store, {
                            scopeTreeSelect: structuredClone(
                              store.scopeTreeSelect()
                            ),
                          });
                        }
                      },
                      error: () => {
                        // console.error(error);
                      },
                      finalize: () => patchState(store, setFulfilled()),
                    })
                  );
              })
            )
          ),
        onSelectRoleChange: rxMethod<UserAssignmentsAssignableUserRole | null>(
          pipe(
            tap((userRole) => {
              if (!userRole) {
                return;
              }

              store.scopeControl().enable();

              patchState(store, {
                scopeTreeSelectConfig: mapTreeSelectConfigToRole(userRole),
              });

              patchState(store, {
                scopeTreeSelect:
                  updateScopeTreeSelectNodesBasedOnSelectedUserRole(
                    store.scopeTreeSelect(),
                    store.scopeTreeSelectConfig()
                  ),
              });

              applyScopeTreeSelectValueBasedOnSelectedUserRole(
                store.scopeTreeSelect(),
                store.scopeControl(),
                userRole
              );
            })
          )
        ),
      };
    }),
    withMethods((store) => {
      return {
        onNodeExpand(event: TreeSelectNodeExpandEvent): void {
          store.getBusinessEntitiesSummarizedByBusinessGroup(event);
        },
        onNodeCollapse(event: TreeSelectNodeCollapseEvent): void {
          patchState(store, {
            scopeTreeSelect: resetScopeTreeSelectNodeChildren(
              store.scopeTreeSelect(),
              event.node
            ),
          });
        },
      };
    }),
    withHooks((store) => {
      return {
        onInit: () => {
          store.businessGroupsUpdated(store._businessGroupsCoreStore.entities);

          store.onSelectRoleChange(store.userRoleValueChanges());
        },
      };
    })
  );

const isGlobal = (key: string): boolean => {
  return key === GLOBAL;
};

const updateGlobalNodeInScopeTreeSelect = (
  scopeTreeSelect: ScopeTreeSelectModel[],
  scopeTreeSelectConfig: ScopeTreeSelectConfig
): void => {
  const hasGlobalNode = scopeTreeSelect.some((node) => isGlobal(node.key));

  if (!hasGlobalNode && scopeTreeSelectConfig.showGlobal) {
    // Add 'Global' node to the beginning of the scope tree select
    scopeTreeSelect.unshift(mapItemToTreeNode(GLOBAL, GLOBAL, -1, true, false));
  }

  if (isGlobal(scopeTreeSelect[0].key) && !scopeTreeSelectConfig.showGlobal) {
    // Remove 'Global' node from the beginning of the scope tree select
    scopeTreeSelect.shift();
  }
};

const resetScopeTreeSelectNodeChildren = (
  scopeTreeSelect: ScopeTreeSelectModel[],
  treeNode: TreeNode<unknown>
): ScopeTreeSelectModel[] => {
  return scopeTreeSelect.map((node) => {
    return node.key === treeNode.key
      ? {
          ...node,
          children: [],
        }
      : node;
  });
};

const mapTreeSelectConfigToRole = (
  userRole: UserAssignmentsAssignableUserRole
): ScopeTreeSelectConfig => rolesToScopeTreeSelectConfig[userRole.name];

const getLeafState = (isExpandableItem: boolean): boolean => {
  return !isExpandableItem;
};

const setItemExpandableState = (
  isExpandableItem: boolean
): { leaf: boolean; styleClass: string } => {
  return {
    leaf: getLeafState(isExpandableItem),
    styleClass: getItemClass(isExpandableItem),
  };
};

const getItemClass = (
  isExpandableItem: boolean
): typeof EXPANDABLE_ITEM_CLASS | typeof NON_EXPANDABLE_ITEM_CLASS => {
  return isExpandableItem ? EXPANDABLE_ITEM_CLASS : NON_EXPANDABLE_ITEM_CLASS;
};

const isBusinessEntityExpandable = (
  bEntity: UserAssignmentsBusinessEntitySummarized,
  expandableBusinessEntities: boolean
): boolean => {
  return expandableBusinessEntities && bEntity.type === 'CashDistribution';
};

const mapItemToTreeNode = (
  key: string,
  label: string,
  data: number,
  selectable: boolean,
  isExpandable: boolean,
  metaData?: (typeof RoleScopesMetaData)[keyof typeof RoleScopesMetaData]
): ScopeTreeSelectModel => {
  return {
    key,
    label,
    data,
    selectable,
    children: [],
    metaData: metaData ?? undefined,
    ...setItemExpandableState(isExpandable),
  };
};

const applyScopeTreeSelectValueBasedOnSelectedUserRole = (
  scopeTreeSelect: ScopeTreeSelectModel[],
  scope: FormControl<unknown>,
  userRole: UserAssignmentsAssignableUserRole
): void => {
  if (userRole.isInternal) {
    scope.disable();
    scope.patchValue(scopeTreeSelect.find((node) => isGlobal(node.key)));
  } else {
    resetScopeTreeSelectFormControl(scope);
  }
};

const resetScopeTreeSelectFormControl = (
  control: FormControl<unknown>
): void => {
  control.patchValue(null);
};

const updateScopeTreeSelectNodesBasedOnSelectedUserRole = (
  scopeTreeSelect: ScopeTreeSelectModel[],
  scopeTreeSelectConfig: ScopeTreeSelectConfig
): ScopeTreeSelectModel[] => {
  return scopeTreeSelect.map((node) => {
    if (!isGlobal(node.key)) {
      const { leaf, styleClass } = setItemExpandableState(
        scopeTreeSelectConfig.expandableBusinessGroups
      );
      return {
        ...node,
        leaf,
        styleClass,
        selectable: scopeTreeSelectConfig.selectableBusinessGroups,
        expandable: false,
        children: [],
      };
    }

    return node;
  });
};
