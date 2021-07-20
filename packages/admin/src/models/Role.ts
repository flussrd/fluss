import { Permission as PermissionForm, Role as RoleForm } from "services/auth/models";

import Permission from "./Permission";

type Role = {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  creationDate: Date;
  lastUpdate: Date;
};

export function mockRoles(): Role[] {
  const roles: Array<Role> = [
    {
      id: "r1",
      name: "superAdmin",
      description: "Tiene acceso a todos los módulos del sistema",
      permissions: [],
      creationDate: new Date(2021, 6, 10),
      lastUpdate: new Date(2021, 6, 10),
    },
  ];

  return roles;
}

export function roleToRoleForm(role: Role): RoleForm {
  return {
    permissions: role.permissions.map(
      (p) => ({ actions: [...p.actions], resource: p.name } as PermissionForm)
    ),
    name: role.name,
    description: role.description,
  };
}

export default Role;
