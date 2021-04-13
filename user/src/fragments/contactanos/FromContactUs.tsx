import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormField from "shared/components/FormField";

const FromContactUs: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.structure}>
      <FormField className={classes.textBox} name="name" label="Nombre" />
      <FormField className={classes.textBox} name="emailAddress" label="Correo electronico" />
      <FormField className={classes.textBox} name="issue" label="Asunto" />
      <FormField className={classes.textBox} name="message" label="Mensaje" multiline rows={6} />
      <Button className={classes.textBox} variant="outlined" color="primary">
        Enviar
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  structure: {
    paddingTop: "20px",
  },
  textBox: {
    margin: "1em",
  },
}));

export default FromContactUs;
