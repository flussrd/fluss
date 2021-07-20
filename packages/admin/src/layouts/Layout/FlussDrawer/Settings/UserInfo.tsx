import { yupResolver } from "@hookform/resolvers";
import { Button, LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import clsx from "clsx";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { useGetUserData } from "services/auth/hooks";
import { UserInfo as UserInfoModel } from "services/auth/models";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import * as yup from "yup";

interface UserInfoProps {}

const UserInfo: FC<UserInfoProps> = () => {
  const classes = useStyles();
  const { isLoading, data: response } = useGetUserData();
  const {
    register,
    handleSubmit,
    errors: formErrors,
    control,
  } = useForm<UserInfoModel>({
    resolver: yupResolver(userInfoSchema),
    defaultValues: {
      name: response?.data?.name || "",
      email: response?.data?.email || "",
      phoneNumber: response?.data?.phoneNumber || "",
    },
  });

  const onSubmit = (data: UserInfoModel) => {
    // TODO: submit data.
  };

  return (
    <div className={classes.root}>
      {isLoading && <LinearProgress color="secondary" />}
      <div className={clsx(classes.content, classes.separate)}>
        <Typography variant="h5">Información de cuenta</Typography>

        <FormIconTitle Icon={PermIdentityOutlinedIcon} title="Datos personales" />

        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className={classes.separate}
        >
          <FormField
            name="name"
            label="Nombre"
            placeholder="Nombre del usuario"
            error={!!formErrors.name}
            helperText={formErrors.name ? formErrors.name.message : undefined}
            inputRef={register}
          />

          <Controller
            name="phoneNumber"
            control={control}
            as={
              <ReactInputMask mask="(999) 999-9999" maskChar=" ">
                {() => (
                  <FormField
                    label="Numéro celular"
                    placeholder="Número celular"
                    error={!!formErrors.phoneNumber}
                    helperText={formErrors.phoneNumber ? formErrors.phoneNumber.message : undefined}
                  />
                )}
              </ReactInputMask>
            }
          />

          <FormField
            name="email"
            label="Correo"
            placeholder="Correo"
            error={!!formErrors.email}
            helperText={formErrors.email ? formErrors.email.message : undefined}
            inputRef={register}
          />

          <FormField name="roleName" label="Rol" value={response?.data?.roleName || ""} />

          <br />
          <div className={classes.actions}>
            <Button variant="outlined" color="primary">
              Guardar cambios
            </Button>
          </div>
        </form>

        <br />

        {/* <FormIconTitle Icon={LockOutlinedIcon} title="Contraseña" marginBottom={1} />

        <Button variant="outlined">Cambiar contraseña</Button> */}
      </div>
    </div>
  );
};

const userInfoSchema: yup.SchemaOf<UserInfoModel> = yup.object().shape({
  email: yup
    .string()
    .required("Por favor, introduzca su correo")
    .email("Debe ingresar un correo válido. Ej: usuario@email.com"),
  name: yup.string().required("Por favor, introduzca su nombre"),
  surname: yup.string().required("Por favor, introduzca su/s apellido/s"),
  phoneNumber: yup.string().required("Por favor, introduzca número celular"),
});

const useStyles = makeStyles((theme) => ({
  separate: {
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  root: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    width: "100%",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  actions: {
    marginTop: theme.spacing(2),
  },
}));

export default UserInfo;
