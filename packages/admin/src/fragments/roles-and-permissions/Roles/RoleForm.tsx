import { yupResolver } from "@hookform/resolvers";
import { Button, DialogActions, Divider, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AssignmentIndOutlined, InfoOutlined } from "@material-ui/icons";
import PermissionAction from "models/PermissionAction";
import React, { FC, Fragment, useEffect } from "react";
import { Control, useForm, UseFormMethods, useWatch } from "react-hook-form";
import { Permission, Role } from "services/auth/models";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import ModalContent from "shared/components/ModalContent";
import * as yup from "yup";

import AssignPermissions from "./AssignPermissions";
import PermissionActions from "./PermissionActions";

export interface RolModalFormProps {
  form: UseFormMethods<Role>;
}

const RolModalForm: FC<RolModalFormProps> = ({ form }) => {
  const assignedPermissions = form.getValues().permissions || [];

  const setPermissions = (permissions: Permission[]) => {
    form.setValue("permissions", permissions);
  };

  const assignPermissions = (permissions: string[]): void => {
    const actions: PermissionAction[] = ["read", "write", "update", "delete"];
    const mapped: Permission[] = permissions.map((p) => ({ resource: p, actions }));

    setPermissions(mapped);
  };

  const onAction = (permission: Permission, index: number): void => {
    const modified: Permission[] = [...form.getValues().permissions];
    modified[index] = permission;

    setPermissions(modified);
  };

  const onRemove = (_: Permission, index: number): void => {
    const modified: Permission[] = [...form.getValues().permissions];
    modified.splice(index, 1);

    setPermissions(modified);
  };

  // Register permissions field because the automatic registration is only for input elements.
  useEffect(() => {
    form.register("permissions");
  }, [form.register]);

  return (
    <>
      <FormIconTitle title="Datos del nuevo rol" Icon={InfoOutlined} />
      <FormField
        name="name"
        label="Nombre"
        placeholder="Nombre del rol"
        error={!!form.errors.name}
        helperText={form.errors.name?.message}
        inputRef={form.register}
      />
      <FormField
        multiline
        rows={5}
        name="description"
        label="Descripción"
        placeholder="Breve descripción del rol"
        error={!!form.errors.description}
        helperText={form.errors.description?.message}
        inputRef={form.register}
      />

      <FormIconTitle title="Asignar permisos al rol" Icon={AssignmentIndOutlined} />

      <AssignPermissions
        onSave={assignPermissions}
        defaultSelected={parseToStringArray(assignedPermissions)}
      />

      <List>
        <AssignedPermissions control={form.control} onAction={onAction} onRemove={onRemove} />
      </List>
    </>
  );
};

export function useRoleForm(
  onSubmit: (data: Role) => void,
  values: Role = { name: "", description: "", permissions: [] }
): [UseFormMethods<Role>, () => void] {
  const form = useForm<Role>({
    resolver: yupResolver(formSchema),
    defaultValues: { ...values },
  });

  const onSave = () => {
    form.handleSubmit(onSubmit)();
  };

  return [form, onSave];
}

interface AssignedPermissionsProps {
  control: Control<Role>;
  onAction: (permission: Permission, index: number) => void;
  onRemove: (permission: Permission, index: number) => void;
}

const AssignedPermissions: FC<AssignedPermissionsProps> = (props) => {
  const { control, onAction, onRemove } = props;
  const permissions: Permission[] = useWatch({ control, name: "permissions", defaultValue: [] });

  return (
    <Fragment>
      {permissions.map((permission, index) => (
        <Fragment key={permission.resource}>
          <PermissionActions
            index={index}
            onAction={onAction}
            onRemove={onRemove}
            permission={permission}
          />
          <Divider />
        </Fragment>
      ))}
    </Fragment>
  );
};

function parseToStringArray(permissions: Permission[]): string[] {
  const parsed = permissions.map((p) => p.resource);
  return parsed;
}

// Rol -> Permission[] -> PermissionAction[].
const formSchema: yup.SchemaOf<Role> = yup.object().shape({
  name: yup.string().required("Por favor, introduzca el nombre del rol"),
  description: yup.string().optional(),
  permissions: yup.array(),
});

export default RolModalForm;
