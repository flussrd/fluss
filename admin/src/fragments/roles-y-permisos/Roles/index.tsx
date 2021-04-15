import Rol from "models/Rol";
import { DataTableColumn, EnhancedDataTable } from "shared/components/Tables";
import formatDate from "shared/helpers/formatDate";

import CreateRol from "./CreateRol";

export default function Roles() {
  return (
    <>
      <EnhancedDataTable data={Rol.mockData()} columns={columns} />
      <CreateRol />
    </>
  );
}

const columns: DataTableColumn<Rol>[] = [
  { Header: "Nombre", accessor: "name" },
  { Header: "Descripción", accessor: "description" },
  { Header: "Fecha de creación", accessor: (rol) => formatDate(rol.creationDate) },
  { Header: "Última actualización", accessor: (rol) => formatDate(rol.lastUpdate) },
];
