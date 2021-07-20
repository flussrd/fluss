import PermissionAction from "./PermissionAction";

type Permission = {
  id: string;
  name: string;
  description: string;
  actions: PermissionAction[];
  creationDate: Date;
  updatedAt: Date;
};

export default Permission;

export function mockPermissions(): Permission[] {
  const permissions: Array<Permission> = [
    {
      id: "p1",
      name: "*",
      description: "Permite total acceso a los módulos en el sistema",
      actions: ["*"],
      creationDate: new Date(2021, 6, 11),
      updatedAt: new Date(2021, 6, 11),
    },
  ];
  return permissions;
}

