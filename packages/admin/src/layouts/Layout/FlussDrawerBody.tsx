import { Divider, List } from "@material-ui/core";
import { Grain, Home, Lock, Notifications, People, Settings } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { FC } from "react";

import DrawerItem from "./DrawerItem";

interface FlussDrawerBodyProps {}

const FlussDrawerBody: FC<FlussDrawerBodyProps> = () => {
  const router = useRouter();
  return (
    <div>
      <List>
        <DrawerItem title="Inicio" icon={Home} to="/" />
        <DrawerItem title="Cuerpos hídricos" icon={Grain} to="/rivers" />
        <DrawerItem title="Usuarios" icon={People} to="/users" />
        <DrawerItem title="Roles y permisos" icon={Lock} to="/roles-and-permissions" />
      </List>
      <Divider />
      <List>
        <DrawerItem title="Notificaiones" icon={Notifications} to="/notifications" />
        <DrawerItem title="Ajustes" icon={Settings} to={router.pathname} as="/settings" />
      </List>
    </div>
  );
};

export default FlussDrawerBody;