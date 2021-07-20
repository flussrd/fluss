import Role, { mockRoles } from "models/Role";
import DataTable, { DataTableColumn } from "shared/components/DataTable";
import formatDate from "shared/helpers/formatDate";

import CreateRol from "./CreateRole";
import EditRol from "./EditRole";

export default function Roles() {
  return (
    <>
      <DataTable showGlobalFilter data={mockRoles()} columns={columns} />
      {/*TODO:
      <CreateRol />
      */}
    </>
  );
}

const columns: DataTableColumn<Role>[] = [
  { Header: "Nombre", accessor: "name" },
  { Header: "Descripción", accessor: "description" },
  { Header: "Fecha de creación", accessor: (rol) => formatDate(rol.creationDate) },
  { Header: "Última actualización", accessor: (rol) => formatDate(rol.lastUpdate) },
  //{ Header: " ", columnWidth: "100px", id: "info", accessor: (rol) => <EditRol role={rol} /> },
];

