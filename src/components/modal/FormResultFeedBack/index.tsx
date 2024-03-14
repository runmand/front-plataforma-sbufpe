import { Card, CardContent, Modal, Typography } from "@mui/material";
import React, {  useEffect } from "react";
import { TPROPS } from "./type";
import Header from "../header/index";
import ActionArea from "@components/modal/action-area";
import { theme } from "src/core/theme";



export default function FormResultFeedBack(props: TPROPS) {


  useEffect(() => {
    localStorage.setItem("lastFormSubmited", props.formId + "");
  }, [props.formId]);

  return (
    <Modal
      open={props.isOpen} 
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.blur,
        transition: "0.6s",
      }}
      onClose={() => {
        if (props.canSkip) props.onClose();
      }}
    >
      <Card
        sx={{
          backgroundColor: theme.white,
          borderRadius: theme.borderRadiusEdge,
          padding: theme.modal.card.padding,
          minWidth: theme.modal.card.minWidth,
          margin: "10%",
          overflow: "auto",
          maxHeight: "90%",
        }}
      >
        <Header
          title={`Formulário finalizado`}
          onClose={() => props.onClose()}
        />
        <CardContent>
          

          <Typography
            sx={{
              display: "flex",
              fontSize: "1.5rem",
              alignItems: "center",
              justifyContent:"center",
              marginTop: "3rem",
            }}
          >
            AGRADECEMOS A SUA RESPOSTA
      
          </Typography>
    
          
        </CardContent>
      
        <ActionArea
          isLoading={false}
          onConfirm={() => props.onClose()}
        />
      </Card>
    </Modal>
  );
}


