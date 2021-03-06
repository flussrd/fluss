import { Card, CardContent, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import ModuleLast24HoursChart from "shared/components/ModuleLast24HoursChart";

interface Last24HoursProps {
  moduleId?: string;
}

const Last24Hours: FC<Last24HoursProps> = (props) => {
  const classes = useStyles();
  const moduleId = props.moduleId;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
          Últimas 48 horas
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <ModuleLast24HoursChart barHeight={40} moduleId={moduleId}/>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles({});

export default Last24Hours;
