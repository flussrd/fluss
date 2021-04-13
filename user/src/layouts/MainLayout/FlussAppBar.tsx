import { AppBar as Navbar, Button, Divider, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Image from "next/image";
import router from "next/router";
import React, { FC } from "react";

const FlussAppBar: FC = () => {
  const classes = useStyles();
  const push = (path: string) => () => router.push(path);

  return (
    <Navbar position="fixed" color="transparent" elevation={0}>
      <Toolbar>
        <Button className={classes.brand} onClick={push("/")}>
          <div className={classes.logo}>
            <Image src="/images/logo.png" alt="Logo" width={35} height={35} />
          </div>
          <Typography className={classes.title} variant="h6" noWrap>
            fluss
          </Typography>
        </Button>
        <div className={classes.startButtons}>
          <Button
            color="primary"
            variant="outlined"
            className={classes.reportsButton}
            onClick={push("/datos-y-reportes")}
          >
            Datos y reportes
          </Button>
        </div>
        <div className={classes.endButtons}>
          <Button color="inherit" onClick={push("/")}>
            Inicio
          </Button>
          <Button color="inherit" onClick={push("/another")}>
            Reportes recientes
          </Button>
          <Button color="inherit">¿Quiénes somos?</Button>
          <Button color="inherit" onClick={push("/contactanos")}>
            Contactanos
          </Button>
        </div>
      </Toolbar>
      <Divider />
    </Navbar>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  brand: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginRight: theme.spacing(3),
    padding: 0,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    fontSize: theme.typography.h5.fontSize,
    color: theme.palette.primary.main,
    cursor: "pointer",
    textTransform: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  startButtons: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  reportsButton: {
    borderRadius: 10,
  },
  endButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(3),
    },
  },
}));

export default FlussAppBar;
