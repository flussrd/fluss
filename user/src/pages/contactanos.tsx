import { Button, Typography } from "@material-ui/core";
import FromContactUs from "fragments/contactanos/FromContactUs";

const contactanos: FC = () => {
  return (
    <div>
      <Typography variant="h3">Contactanos</Typography>
      <FromContactUs />
    </div>
  );
};

export default contactanos;
