import { Divider, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import General from "fragments/modules/module/General";
import Logs from "fragments/modules/module/Logs";
import Metrics from "fragments/modules/module/Metrics";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Back from "shared/components/Back";
import TabPanel, { AntTab, AntTabs } from "shared/components/TabPanel";
import { mockModules } from "shared/models/Module";
import { useGetModuleInfoById } from "shared/services/modules/hooks";
import { fromModuleResponse } from "shared/models/Module";

const Module: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const [value, setValue] = useState(0);
  const moduleId = router.query.id as string;
  const moduleInfoQuery = useGetModuleInfoById(moduleId);
  const module = fromModuleResponse(moduleInfoQuery?.data?.data);

  const goBack = () => {
    router.back();
  };

  const handleChange = (_: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Back onClick={goBack}>Volver a módulos</Back>

      <br />
      <br />

      <Typography variant="h4">{module?.alias}</Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Dentro de {module?.watershedName}
      </Typography>

      <br />

      <AntTabs value={value} onChange={handleChange} aria-label="ant example">
        <AntTab label="General" />
        <AntTab label="Métricas" />
        <AntTab label="Logs" />
      </AntTabs>

      <TabPanel value={value} index={0}>
        <General />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Metrics moduleId={moduleId} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Logs />
      </TabPanel>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({}));
export default Module;

