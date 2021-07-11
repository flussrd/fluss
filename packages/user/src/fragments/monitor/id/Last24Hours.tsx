import { Card, CardContent, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ModuleLast24HoursChart from "shared/components/ModuleLast24HoursChart";
import React, { FC } from "react";

interface Last24HoursProps {}

const Last24Hours: FC<Last24HoursProps> = (props) => {
  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
          Últimas 48 horas
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <ModuleLast24HoursChart barHeight={40} />
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles({});

export default Last24Hours;

