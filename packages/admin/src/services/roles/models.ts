export interface Permission {
  resource: string;
  actions: string[];
}

export interface Role {
  roleName: string;
  permissions: Permission[];
}
