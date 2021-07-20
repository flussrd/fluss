import {
  ModuleReportModel,
  ModuleReportData,
  Parameter,
  ParameterType,
} from "../services/monitor/models";
import DayMeasures, { getDayOfTheMonthName, Day } from "./DayMeasures";
import HourMeasure from "./HourMeasure";

type ParameterMeasure = {
  parameterName: string;
  max: number;
  min: number;
  color: string;
  measures: DayMeasures[];
};

type ParameterMeasures = {
  days?: Day[];
  parameterMeasure: ParameterMeasure[];
};

const getColor = function (parameterType: string) {
  switch (parameterType) {
    case "ph":
      return "mediumpurple";
    case "do":
      return "green";
    case "tds":
      return "dodgerblue";
    case "tmp":
      return "goldenrod";
    case "ty":
      return "indianred";
    case "wqi":
      return "lightblue";
    default:
      return "";
  }
};

const getDays = function (measuresByDateDay: Record<number, HourMeasure[]>): Day[] {
  const days: Day[] = [];
  const lastDate = Math.max(...(Object.keys(measuresByDateDay) as any));

  for (let dateDay in measuresByDateDay) {
    // Only return the last 48 hours data
    if (+dateDay < lastDate - 1) {
      return;
    }
    const day = getDayOfTheMonthName(dateDay);
    days.push(day);
  }

  return days;
};

const getMeasuresPerDay = function (
  measuresByDateDay: Record<number, HourMeasure[]>
): DayMeasures[] {
  const measures: DayMeasures[] = [];

  const lastDate = Math.max(...(Object.keys(measuresByDateDay) as any));

  for (let dateDay in measuresByDateDay) {
    // Only return the last 48 hours data
    if (+dateDay < lastDate - 1) {
      return;
    }

    measures.push({
      day: getDayOfTheMonthName(dateDay),
      measures: measuresByDateDay[dateDay],
    });
  }

  return measures;
};

// TODO: handle the aggrupation by day in the backend service
export function fromModuleReportFilterHourResponse(
  moduleReportResponse: ModuleReportModel
): ParameterMeasures {
  const today = new Date();

  const data: Record<ParameterType, Record<number, HourMeasure[]>> = {
    do: {},
    ph: {},
    tds: {},
    ty: {},
    tmp: {},
    wqi: {},
  };

  const maxPerParam: Record<ParameterType, number> = {
    do: 0,
    ph: 0,
    tds: 0,
    ty: 0,
    tmp: 0,
    wqi: 0,
  };

  const inf = 8000;

  const minPerParam: Record<ParameterType, number> = {
    do: inf,
    ph: inf,
    tds: inf,
    ty: inf,
    tmp: inf,
    wqi: inf,
  };

  (moduleReportResponse.data || []).forEach((moduleReportDetailData: ModuleReportData) => {
    const date = new Date(moduleReportDetailData.lastDate);

    if (date.getMonth() !== today.getMonth() || date.getFullYear() !== today.getFullYear()) {
      return;
    }

    const dateDay = date.getDate();
    const hour = date.getHours();

    (moduleReportDetailData.parameters || []).forEach((parameter: Parameter) => {
      if (!data[parameter.name][dateDay]) {
        data[parameter.name][dateDay] = [];
      }

      data[parameter.name][dateDay].push({ hour, value: Math.round(parameter.value * 100) / 100 });
      minPerParam[parameter.name] = Math.min(minPerParam[parameter.name], parameter.value);
      maxPerParam[parameter.name] = Math.max(maxPerParam[parameter.name], parameter.value);
    });
  });

  const parameters: ParameterMeasure[] = [];
  const days = getDays(data["ph"]);

  for (let parameterType in data) {
    let measuresByDateDay: Record<number, HourMeasure[]> = data[parameterType];
    const measures = getMeasuresPerDay(measuresByDateDay);
    parameters.push({
      parameterName: parameterType,
      max: maxPerParam[parameterType].toFixed(2),
      min: minPerParam[parameterType].toFixed(2),
      color: getColor(parameterType),
      measures,
    });
  }

  return { days, parameterMeasure: parameters };
}

/*
export function mockParameterMeasures(): ParameterMeasures[] {
  return [
    {
      parameterName: "ph",
      max: 12,
      min: 2,
      color: "green",
      measures: [
        {
          day: "1",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
        {
          day: "Martes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
      ],
    },
    {
      parameterName: "O",
      color: "dodgerblue",
      max: 12,
      min: 2,
      measures: [
        {
          day: "Lunes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
        {
          day: "Martes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
      ],
    },
    {
      parameterName: "Temp",
      color: "goldenrod",
      max: 12,
      min: 2,
      measures: [
        {
          day: "Lunes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
        {
          day: "Martes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
      ],
    },
    {
      parameterName: "Sol",
      color: "indianred",
      max: 12,
      min: 2,
      measures: [
        {
          day: "Lunes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
        {
          day: "Martes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
      ],
    },
    {
      parameterName: "Tur",
      color: "mediumpurple",
      max: 12,
      min: 2,
      measures: [
        {
          day: "Lunes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
        {
          day: "Martes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
      ],
    },
  ];
}
*/
export default ParameterMeasures;

