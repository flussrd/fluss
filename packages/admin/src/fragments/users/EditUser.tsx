import { Button, Dialog, DialogActions, DialogTitle, Grid } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { mockUsers } from "models/User";
import React, { FC } from "react";
import { useGetUserById } from "services/users/hooks";
import FormField from "shared/components/FormField";
import ModalContent from "shared/components/ModalContent";
import formatDate from "shared/helpers/formatDate";
import { useMergeState } from "shared/hooks";
import useRefCallback from "shared/hooks/useRefCallback";

import UserForm, { UserFormModel, UserFormRef, useUserForm } from "./UserForm";

interface EditUserProps {
  isOpen: boolean;
  close: () => void;
  id: string;
}

const EditUser: FC<EditUserProps> = (props) => {
  const classes = useStyles();
  const user = useGetUserById(props.id);
  const form = useUserForm(user.data?.data, [user?.data?.data]);

  console.log({ user });

  function onSubmit(data: UserFormModel) {
    console.log({ data });
  }

  return (
    <Dialog fullWidth onClose={props.close} open={props.isOpen} maxWidth="md">
      <DialogTitle>Editar información de usuario</DialogTitle>
      <ModalContent spacing={2} dividers>
        <UserForm form={form} />
        <br />
        <br />

        {/*
          <Button startIcon={<DeleteForeverIcon />} variant="outlined" className={classes.deleteUser}>
            Eliminar Usuario
            </Button>
            */}
      </ModalContent>
      <DialogActions>
        <Button onClick={props.close} color="primary">
          Cancelar
        </Button>
        <Button color="primary" onClick={form.handleSubmit(onSubmit)}>
          Guardar cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles({
  deleteUser: {
    color: red[600],
    borderColor: red[600],
    "&:hover": {
      backgroundColor: red[50],
    },
  },
});

export default EditUser;

