import { Dispatch, useEffect, useRef, useState } from "react";
import { Modal, Box, Checkbox, useMediaQuery } from "@mui/material";
import { Block, Check } from "@mui/icons-material";
import {
  CardContainer,
  CardTitle,
  DocumentContainer,
  DocumentTitle,
  TermsButton,
  TermsButtonContainer,
  TermsContainer,
  TermsText,
} from "./styled";
import TCLE from "./tcle-document/TCLE";
import TALEU18 from "./tcle-document/TALEU18";
import TALEU13 from "./tcle-document/TALEU13";
import TCLE2 from "./tcle-document/TCLE2";
import TCLEPROF from "./tcle-document/TCLEPROF";
import { ID } from "src/core/types";
import { http } from "src/core/axios";
import { useSnackbar } from "notistack";

type Props = {
  open: boolean;
  setOpenTCLE: Dispatch<React.SetStateAction<boolean>>;
  idForm: ID;
  goForm: () => Promise<void>;
};

export type PropsTerm = {
  validateData: (fn: () => boolean) => void;
};

export type DataTerm = {
  valid: boolean;
  type: string;
  email: string;
  account: number;
  pdf: string;
  created_at: Date;
  form?: number;
};

export default function TcleModal(props: Props) {
  const TCLERef = useRef(null);
  const TCLE2Ref = useRef(null);
  const TALERef = useRef(null);
  const TALEURef = useRef(null);
  const TCLEPROFRef = useRef(null);
  const [open, setOpen] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [checkedTCLE, setCheckedTCLE] = useState(false);
  const [dataTCLE, setDataTCLE] = useState<DataTerm>(null);
  const [checkedTALE18, setCheckedTALE18] = useState(false);
  const [dataTALE, setDataTALE] = useState<DataTerm>(null);
  const [checkedTALEUNDER13, setCheckedTALEUNDER13] = useState(false);
  const [dataTALEU, setDataTALEU] = useState<DataTerm>(null);
  const largeQuery = useMediaQuery("(min-width:720px)");
  const snackBar = useSnackbar();

  const [termSelected, setTermSelected] = useState<
    "TCLE" | "TCLE2" | "TALE18" | "TALEU13" | "TCLEPROF"
  >("TCLEPROF");

  const confirmTerm = async () => {
    if (termSelected == "TCLE") {
      const states = await TCLERef.current.getStates();
      if (states) {
        setCheckedTCLE(true);
        setOpenForm(false);
        states.form = Number(props.idForm);
        setDataTCLE(states);
      }
    } else if (termSelected == "TCLE2") {
      const states = await TCLE2Ref.current.getStates();
      if (states) {
        setCheckedTCLE(true);
        setOpenForm(false);
        states.form = Number(props.idForm);
        setDataTCLE(states);
      }
    } else if (termSelected == "TCLEPROF") {
      const states = await TCLEPROFRef.current.getStates();
      if (states) {
        setCheckedTCLE(true);
        setOpenForm(false);
        states.form = Number(props.idForm);
        setDataTCLE(states);
      }
    } else if (termSelected == "TALE18") {
      const states = await TALERef.current.getStates();
      if (states) {
        setCheckedTALE18(true);
        setOpenForm(false);
        states.form = Number(props.idForm);
        setDataTALE(states);
      }
    } else if (termSelected == "TALEU13") {
      const states = await TALEURef.current.getStatesNew();
      if (states) {
        setCheckedTALEUNDER13(true);
        setOpenForm(false);
        states.form = Number(props.idForm);
        setDataTALEU(states);
      }
    }
  };

  async function iCanGo() {
    if (dataTCLE) {
      const response = await http.post("/term/send", {
        tcle: dataTCLE,
        tale: dataTALE,
        taleu: dataTALEU,
        formId: props.idForm,
      });

      if (response.data) {
        snackBar.enqueueSnackbar(response.data, { variant: "success" });
        props.goForm();
        props.setOpenTCLE(false);
      } else {
        snackBar.enqueueSnackbar(
          "Houve um erro ao tentar enviar seu termo, tente refazer e mande novamente",
          {
            variant: "error",
          }
        );
      }
    } else {
      snackBar.enqueueSnackbar(
        "Você precisa asssinar os termos obrigatorios (*)!",
        {
          variant: "warning",
        }
      );
    }
  }

  return (
    <Modal
      sx={{
        width: largeQuery ? "60vw" : "100vw",
        margin: largeQuery ? "auto" : "0",
      }}
      open={open}
      onClose={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key == "Escape") {
          props.setOpenTCLE(false);
        }
      }}
    >
      {!openForm ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 3,
            p: 4,
          }}
        >
          <CardContainer>
            <CardTitle>Termo de Consentimento Livre e Esclarecido</CardTitle>
            <TermsContainer>
              <TermsText
                style={{
                  display:
                    props.idForm == "5" ||
                    props.idForm == "6" ||
                    props.idForm == "2"
                      ? ""
                      : "none",
                }}
                onClick={() => {
                  setOpenForm(true);
                  setTermSelected("TCLE");
                }}
              >
                <Checkbox checked={checkedTCLE} />* TERMO DE CONSENTIMENTO LIVRE
                E ESCLARECIDO (PARA RESPONSÁVEL LEGAL PELO MENOR)
              </TermsText>
              <TermsText
                style={{
                  display:
                    props.idForm == "1" ||
                    props.idForm == "3" ||
                    props.idForm == "4"
                      ? ""
                      : "none",
                }}
                onClick={() => {
                  setOpenForm(true);
                  setTermSelected("TCLEPROF");
                }}
              >
                <Checkbox checked={checkedTCLE} />* TERMO DE CONSENTIMENTO LIVRE
                E ESCLARECIDO – Módulos 1, 2 e 3 - PROFISSIONAIS
              </TermsText>
              <TermsText
                style={{
                  display:
                    props.idForm == "3" ||
                    props.idForm == "5" ||
                    props.idForm == "6"
                      ? ""
                      : "none",
                }}
                onClick={() => {
                  setOpenForm(true);
                  setTermSelected("TCLE2");
                }}
              >
                <Checkbox checked={checkedTCLE} />* TERMO DE CONSENTIMENTO LIVRE
                E ESCLARECIDO (PARA MAIORES DE 18 ANOS)
              </TermsText>
              <TermsText
                style={{
                  display:
                    props.idForm == "6" || props.idForm == "2" ? "" : "none",
                }}
                onClick={() => {
                  setOpenForm(true);
                  setTermSelected("TALE18");
                }}
              >
                <Checkbox checked={checkedTALE18} /> TERMO DE ASSENTIMENTO LIVRE
                E ESCLARECIDO (PARA MENORES DE 13 a 18 ANOS)
              </TermsText>
              <TermsText
                style={{
                  display:
                    props.idForm == "5" || props.idForm == "2" ? "" : "none",
                }}
                onClick={() => {
                  setOpenForm(true);
                  setTermSelected("TALEU13");
                }}
              >
                <Checkbox checked={checkedTALEUNDER13} /> Termo de Assentimento
                Livre e Esclarecido | TALE Lúdico (5 a 12 anos)
              </TermsText>
            </TermsContainer>
          </CardContainer>
          <TermsButtonContainer>
            <TermsButton onClick={() => props.setOpenTCLE(false)}>
              <Block />
              Voltar
            </TermsButton>
            <TermsButton onClick={iCanGo}>
              Proximo
              <Check />
            </TermsButton>
          </TermsButtonContainer>
        </Box>
      ) : (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 3,
            p: 4,
          }}
        >
          <DocumentContainer>
            {termSelected == "TCLE" ? (
              <>
                <DocumentTitle>
                  TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO (PARA RESPONSÁVEL
                  LEGAL PELO MENOR DE 18 ANOS)
                </DocumentTitle>
                <TCLE ref={TCLERef}></TCLE>
              </>
            ) : (
              <></>
            )}
            {termSelected == "TALEU13" ? (
              <>
                <DocumentTitle>
                  Termo de Assentimento Livre e Esclarecido | TALE Lúdico (5 a
                  12 anos)
                </DocumentTitle>
                <TALEU13 ref={TALEURef}></TALEU13>
              </>
            ) : (
              <></>
            )}
            {termSelected == "TALE18" ? (
              <>
                <DocumentTitle>
                  TERMO DE ASSENTIMENTO LIVRE E ESCLARECIDO (PARA MENORES DE 13
                  a 18 ANOS)
                </DocumentTitle>
                <TALEU18 ref={TALERef}></TALEU18>
              </>
            ) : (
              <></>
            )}
            {termSelected == "TCLE2" ? (
              <>
                <DocumentTitle>
                  TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO (PARA MAIORES DE 18
                  ANOS)
                </DocumentTitle>
                <TCLE2 ref={TCLE2Ref}></TCLE2>
              </>
            ) : (
              <></>
            )}
            {termSelected == "TCLEPROF" ? (
              <>
                <DocumentTitle>
                  TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO – Módulos 1, 2 e 3
                  - PROFISSIONAIS
                </DocumentTitle>
                <TCLEPROF ref={TCLEPROFRef}></TCLEPROF>
              </>
            ) : (
              <></>
            )}
            {/* <DocumentSignatureContainer>
              <TextField
                required
                label="Digite seu nome"
                type="text"
                sx={{
                  backgroundColor: theme.white,
                }}
              />
              <TextField
                required
                label="Digite seu email"
                type="email"
                sx={{
                  backgroundColor: theme.white,
                }}
              />
            </DocumentSignatureContainer> */}
          </DocumentContainer>
          <TermsButtonContainer>
            <TermsButton onClick={(e) => setOpenForm(false)}>
              <Block />
              Voltar
            </TermsButton>
            <TermsButton onClick={confirmTerm}>
              Proximo
              <Check />
            </TermsButton>
          </TermsButtonContainer>
        </Box>
      )}
    </Modal>
  );
}
