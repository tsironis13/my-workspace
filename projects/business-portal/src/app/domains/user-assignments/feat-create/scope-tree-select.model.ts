export const RoleScopesMetaData = <const>{
  BusinessGroup: 'BG',
  BusinessEntity: 'BE',
  Location: 'L0',
};

export type ScopeTreeSelectModel = {
  key: string;
  label: string;
  data: number;
  selectable: boolean;
  metaData:
    | (typeof RoleScopesMetaData)[keyof typeof RoleScopesMetaData]
    | undefined;
  children: {
    key: string;
    label: string;
    data: number;
    selectable: boolean;
  }[];
};
