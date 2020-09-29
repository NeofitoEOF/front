import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText, List } from "@material-ui/core";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import BusinessIcon from "@material-ui/icons/Business";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

import styled from "styled-components";
import { Header } from "../Header";

const NewListItem = styled(ListItem)`
  margin: 0.5rem;
`;

export const Navigator = () => {
  const [isVisible, setVisibility] = useState();
  const [currentRoute, setCurretRoute] = useState();

  const history = useHistory();

  const routes = [
    {
      route: "/ativo/cadastrar",
      label: "Cadastrar ativo",
      icon: <MonetizationOnIcon />,
    },
    {
      route: "/cliente/cadastrar",
      label: "Cadastrar cliente",
      icon: <AssignmentIndIcon />,
    },
    {
      route: "/deposito/cadastrar",
      label: "Cadastrar depósito",
      icon: <LocalAtmIcon />,
    },
    {
      route: "/corretora/cadastrar",
      label: "Cadastrar corretora ou banco",
      icon: <BusinessIcon />,
    },
    {
      route: "/transacao/cadastrar",
      label: "Cadastrar transação",
      icon: <SyncAltIcon />,
    },
  ];

  const headers = {
    "/ativo/cadastrar": "Cadastrar Ativo",
    "/cliente/cadastrar": "Cadastrar Cliente",
    "/deposito/cadastrar": "Cadastrar Depósitos e Resgates",
    "/corretora/cadastrar": "Cadastrar Banco / Corretor",
    "/transacao/cadastrar": "Cadastrar Transações",
  };

  return (
    <>
      <Header
        callback={() => setVisibility(!isVisible)}
        title={headers[currentRoute]}
      />
      {isVisible && (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "rgb(0 0 0 / 40%)",
            zIndex: 45,
          }}
          onClick={() => setVisibility(false)}
        >
          <div
            style={{
              height: "100vh",
              width: "22%",
              top: 0,
              left: 0,
              backgroundColor: "#FFFFFF",
              boxShadow: "-5px 0px 23px 0px rgba(0,0,0,0.75)",
              zIndex: 50,
              transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
            }}
          >
            <List style={{ paddingTop: "96px" }}>
              {routes.map((item, index) => {
                return (
                  <NewListItem
                    key={index}
                    button
                    onClick={() => {
                      setCurretRoute(item.route);
                      history.push(item.route);
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </NewListItem>
                );
              })}
            </List>
          </div>
        </div>
      )}
    </>
  );
};
