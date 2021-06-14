import { Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Module, { mockModules } from "models/module";
import { moduleStateToString } from "models/module-state";
import React, { FC, useState } from "react";
import { DataTableColumn, EnhancedDataTable } from "shared/components/Tables";
import formatPhoneNumber from "helpers/format-phone-nomber";
import formatDate from "shared/helpers/formatDate";
import { ratingToString } from "models/wqi-rating";
import Actions from "./Actions";
import AddModule from "./AddModule";
import EditModule from "./EditModule";
import useBoolean from "hooks/useBoolean";

interface ModulesProps {}

const Modules: FC<ModulesProps> = (props) => {
  const [moduleId, setModuleId] = useState<string>("");
  const classes = useStyles();
  const modules = mockModules();
  const columns = generateColumns(onEdit);

  function closeEdit() {
    setModuleId("");
  }

  function onEdit(moduleId: string) {
    setModuleId(moduleId);
  }

  return (
    <div>
      <Typography variant="h4">Módulos</Typography>
      <Typography variant="subtitle1">{modules.length} en total</Typography>

      <br />

      <EnhancedDataTable withFilters labeledButtons data={modules} columns={columns} />
      <AddModule />
      <EditModule moduleId={moduleId} isOpen={!!moduleId} onClose={closeEdit} />
    </div>
  );
};

function generateColumns(onEdit: (string) => void): DataTableColumn<Module>[] {
  const columns: DataTableColumn<Module>[] = [
    { Header: "ID", accessor: "id" },
    { Header: "Alias", accessor: "alias" },
    {
      Header: "Teléfono",
      id: "phoneNumber",
      accessor: (m) => formatPhoneNumber(m.phoneNumber),
    },
    { Header: "Estado", id: "state", accessor: (m) => moduleStateToString(m.state) },
    { Header: "WQI", accessor: ({ wqi }) => `${ratingToString(wqi.rating)} (${wqi.value} )` },
    { Header: "Calificación", accessor: (m) => ratingToString(m.wqi.rating) },
    { Header: "Última actualización", id: "updateDate", accessor: (m) => formatDate(m.updateDate) },
    {
      Header: "Fecha de registro",
      id: "creationDate",
      accessor: (m) => formatDate(m.creationDate),
    },
    {
      Header: "Acciones",
      accessor: (m) => <Actions moduleId={m.id} onEdit={onEdit} />,
    },
  ];

  return columns;
}

const useStyles = makeStyles({});

export default Modules;

