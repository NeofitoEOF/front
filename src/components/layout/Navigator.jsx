import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText, List } from "@material-ui/core";
import { MailOutline } from "@material-ui/icons";
import styled from "styled-components";
import { Header } from "../Header";

const NewListItem = styled(ListItem)`
  margin: 0.5rem;
`;

export const Navigator = () => {
  const [isVisible, setVisibility] = useState();

  const history = useHistory();

  return (
    <>
      <Header callback={() => setVisibility(!isVisible)} />
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
              width: "30%",
              top: 0,
              left: 0,
              backgroundColor: "#FFFFFF",
              boxShadow: "-5px 0px 23px 0px rgba(0,0,0,0.75)",
              zIndex: 50,
              transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
            }}
          >
            <List style={{ paddingTop: "96px" }}>
              <NewListItem
                button
                onClick={() => history.push("/ativo/cadastrar")}
              >
                <ListItemIcon>
                  <MailOutline />
                </ListItemIcon>
                <ListItemText primary="Cadastrar ativo" />
              </NewListItem>
              <NewListItem
                button
                onClick={() => history.push("/cliente/cadastrar")}
              >
                <ListItemIcon>
                  <MailOutline />
                </ListItemIcon>
                <ListItemText primary="Cadastrar cliente" />
              </NewListItem>
              <NewListItem
                button
                onClick={() => history.push("/deposito/cadastrar")}
              >
                <ListItemIcon>
                  <MailOutline />
                </ListItemIcon>
                <ListItemText primary="Cadastrar depósito" />
              </NewListItem>
              <NewListItem
                button
                onClick={() => history.push("/corretora/cadastrar")}
              >
                <ListItemIcon>
                  <MailOutline />
                </ListItemIcon>
                <ListItemText primary="Cadastrar corretora ou banco" />
              </NewListItem>
              <NewListItem
                button
                onClick={() => history.push("/transacao/cadastrar")}
              >
                <ListItemIcon>
                  <MailOutline />
                </ListItemIcon>
                <ListItemText primary="Cadastrar transação" />
              </NewListItem>
            </List>
          </div>
        </div>
      )}
    </>
  );
};
