import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

interface PieChartLegendsProps<T> {
  data: T[];
  label: keyof T | ((item: T) => string);
  color: keyof T | ((item: T) => string);
}

function PieChartLegends<T>(props: PieChartLegendsProps<T>) {
  const classes = useStyles();
  const { data, label, color } = props;

  return (
    <div className={classes.content}>
      {(data || []).map((item) => {
        const itemColor: any = typeof color !== "function" ? item[color] : color(item);
        const itemLabel: any = typeof label !== "function" ? item[label] : label(item);

        return (
          <div className={classes.container} key={itemColor}>
            <div className={classes.avatar} style={{ background: itemColor }} />
            <Typography className={classes.text} variant="caption">
              {itemLabel}
            </Typography>
          </div>
        );
      })}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
  avatar: {
    borderRadius: "50%",
    height: 15,
    width: 15,
  },
  text: {},
}));

export default PieChartLegends;
