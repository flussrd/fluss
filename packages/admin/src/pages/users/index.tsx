import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import CreateUser from "fragments/users/CreateUser";
import EditUser from "fragments/users/EditUser";
import User, { mockUsers, fromUserResponse } from "models/User";
import { userStatusToString } from "models/UserStatus";
import { NextPage } from "next";
import { useState } from "react";
import { useGetUsers } from "services/users/hooks";
import DataTable, { DataTableColumn, SelectColumnFilter } from "shared/components/DataTable";

const Users: NextPage = () => {
  const [userId, setUserId] = useState<string>("");
  const usersQuery = useGetUsers();
  const usersData = usersQuery.data?.data;
  const users = usersData ? usersData.map((user) => fromUserResponse(user)) : [];
  const columns = generateColumns(onEdit);

  function close() {
    setUserId("");
  }

  function onEdit(id: string) {
    return () => setUserId(id);
  }

  return (
    <div>
      <Typography variant="h4">Usuarios</Typography>

      <br />

      <DataTable showGlobalFilter showFilters data={users} columns={columns} />
      <CreateUser />
      <EditUser isOpen={!!userId} close={close} id={userId} />
    </div>
  );
};

function generateColumns(onEdit: (userId: string) => () => void) {
  const columns: DataTableColumn<User>[] = [
    { Header: "Nombre", accessor: "name" },
    { Header: "Apellido", accessor: "surname" },
    { Header: "Email", accessor: "email" },
    { Header: "Estado", id: "status", accessor: (u) => userStatusToString(u.status) },
    {
      Header: "Rol",
      id: "roleName",
      accessor: (u) => u.roleName,
      filter: "includes",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Editar",
      id: "edit",
      accessor: (u) => (
        <Tooltip title="Editar">
          <IconButton onClick={onEdit(u.id)}>
            <Edit />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return columns;
}

export default Users;

