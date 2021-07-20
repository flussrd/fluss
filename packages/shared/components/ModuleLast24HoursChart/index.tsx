import { Typography, CircularProgress } from "@material-ui/core";
import { ResponsiveBar } from "@nivo/bar";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import { useGetModuleReport } from "../../services/monitor/hooks";
import { useGetModuleInfoById } from "../../services/modules/hooks";
interface ModuleLast24HoursChartProps {
  barHeight?: number;
  moduleId?: string;
}

const ModuleLast24HoursChart: FC<ModuleLast24HoursChartProps> = (props) => {
  const classes = useStyles();
  const { isLoading, data } = useGetModuleReport(props.moduleId);
  const { days, parameterMeasure: measures } = data ? data : { days: [], parameterMeasure: [] };

  console.log({ isLoading });

  if (isLoading) {
    return (
      <div className={classes.loader}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <td></td>
            {(days || []).map((day) => (
              <td key={day} style={{ textAlign: "center" }}>
                {day}
              </td>
            ))}
            <td style={{ textAlign: "center" }}>Max</td>
            <td style={{ textAlign: "center" }}>Min</td>
          </tr>
        </thead>
        <tbody>
          {(measures || []).map((measure) => (
            <tr key={measure.parameterName}>
              <td>
                <Typography variant="caption">{measure.parameterName}</Typography>
              </td>
              {measure.measures.map((m) => (
                <td key={m.day}>
                  <div style={{ height: props.barHeight, minWidth: 100, color: "#383B35" }}>
                    <ResponsiveBar
                      colors={measure?.color}
                      data={m.measures || []}
                      keys={["value"]}
                      indexBy="hour"
                      innerPadding={0.4}
                      enableLabel={false}
                      enableGridY={false}
                    />
                  </div>
                </td>
              ))}
              <td style={{ textAlign: "center" }}>
                <Typography variant="caption" color="primary">
                  {measure?.max}
                </Typography>
              </td>
              <td style={{ textAlign: "center" }}>
                <Typography variant="caption" color="secondary">
                  {measure?.min}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
}));

ModuleLast24HoursChart.defaultProps = {
  barHeight: 100,
};
export default ModuleLast24HoursChart;

