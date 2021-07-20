import { Button, Dialog, DialogActions, DialogTitle, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import useBoolean from "hooks/useBoolean";
import React, { FC } from "react";
import { useRegisterUser } from "services/users/hooks";
import ModalContent from "shared/components/ModalContent";

import UserForm, { UserFormModel, UserFormRef, useUserForm } from "./UserForm";

const CreateUser: FC = () => {
  const [isOpen, openDialog, closeDialog] = useBoolean();
  const userMutation = useRegisterUser();
  const form = useUserForm();
  const classes = useStyles();

  const onSubmit = (data: UserFormModel) => {
    console.log({ data });
    userMutation.mutate({
      name: data.name,
      email: data.email,
      password: "fluss-rd",
      roleName: data.rolName,
      phoneNumber: "+18098045201",
    });
    closeDialog();
  };

  return (
    <>
      <Fab variant="extended" color="primary" className={classes.fab} onClick={openDialog}>
        <Add />
        Registrar usuario
      </Fab>
      <Dialog
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
        open={isOpen}
        maxWidth="md"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Registrar usuario</DialogTitle>
        <ModalContent spacing={2} dividers>
          <UserForm form={form} />
        </ModalContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancelar
          </Button>
          <Button color="primary" onClick={form.handleSubmit(onSubmit)}>
            Registrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

export default CreateUser;

