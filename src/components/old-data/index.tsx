import {
    ButtonContainer,
    GridContainer,
    MainContainer,
    UpdateContainer,
    UpdateInfo,
    Title,
    DivLoad,
    ReloadContainer,
    ReloadButton,
    ReloadTitle,
    Reload,
} from "./styled";
import { Button, Box, Grid, Skeleton, CircularProgress, Drawer, Select, MenuItem } from "@mui/material";
import { filter, filterApply, LocalData, planAnswer, praticalAnswer, requestResponse, typeData } from "./type";
import { useEffect, useState } from "react";
import { http } from "src/core/axios";
import { useSnackbar } from "notistack";
import DownloadCSV from "../csv/index";
import CustomSelect from "../select";
import CustomSwitch from "../switch";
import { Refresh } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { routerEnum } from "src/core/enums";
import TableComponentTeoric from "@components/newTable/teoric";
import TableComponentPratical from "@components/newTable/pratical";

export default function Index() {
    const router = useRouter();
    const [typeData, setTypeData] = useState<typeData>("teorico");
    const [tempDataTeoric, setTempDataTeoric] = useState<planAnswer[][]>();
    const [tempDataPratical, setTempDataPratical] = useState<praticalAnswer[]>();
    const [lastUpdateTeoric, setLastUpdateTeoric] = useState<Date>(null);
    const [lastUpdatePratical, setLastUpdatePratical] = useState<Date>(null);
    const { enqueueSnackbar } = useSnackbar();
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [haveError, setHaveError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [filterTeoric, setFilterTeoric] = useState<filter>(null);
    const [filterPratical, setFilterPratical] = useState<filter>(null);
    const [filterApply, setFilterAplly] = useState<filterApply>({ establishment: "*", city: "*", type: "teorico", participant: "*", myData: false });
    const [filterApplyPratical, setFilterApplyPratical] = useState<filterApply>({
        establishment: "*",
        city: "*",
        type: "pratico",
        participant: "*",
        myData: false,
    });

    function formatDate(date: Date) {
        const twoDigits = (num: any) => String(num).padStart(2, "0");

        const day = twoDigits(date.getDate());
        const month = twoDigits(date.getMonth() + 1); // Meses começam em 0
        const year = twoDigits(date.getFullYear() % 100); // Últimos dois dígitos do ano
        const hours = twoDigits(date.getHours());
        const minutes = twoDigits(date.getMinutes());
        const seconds = twoDigits(date.getSeconds());

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    function setFilter(type: "city" | "establishment" | "*" | "participant", data: string, typeForm?: "pratico" | "teorico") {
        const oldFilter: filterApply = { ...filterApply };
        if (type == "city" || type == "*") oldFilter.city = data;
        if (type == "participant" || type == "*") oldFilter.participant = data;
        if (type == "establishment" || type == "*") oldFilter.establishment = data;
        if (typeForm) oldFilter.type = typeForm;
        setFilterAplly(oldFilter);
    }

    function setPraticalFilter(type: "establishment" | "city" | "*" | "participant", data: string, typeForm?: "pratico" | "teorico") {
        const oldFilter: filterApply = { ...filterApplyPratical };

        if (type == "city" || type == "*") oldFilter.city = data;
        if (type == "participant" || type == "*") oldFilter.participant = data;
        if (type == "establishment" || type == "*") oldFilter.establishment = data;

        if (typeForm) oldFilter.type = typeForm;
        setFilterApplyPratical(oldFilter);
    }

    function setMyDataFilter(myFilter: boolean) {
        const oldFilter: filterApply = { ...filterApply };
        oldFilter.myData = myFilter;
        setFilterAplly(oldFilter);
    }

    function setMydataFilterPratical(myFilter: boolean) {
        const oldFilter: filterApply = { ...filterApplyPratical };
        oldFilter.myData = myFilter;
        setFilterApplyPratical(oldFilter);
    }

    async function setTeoric() {
        if (typeData !== "teorico") {
            setFilter("*", "*", "teorico");
            setMyDataFilter(false);
            setTypeData("teorico");
            if (tempDataTeoric == undefined) await getDataTeoric();
        }
    }

    async function setPratical() {
        setPraticalFilter("*", "*", "pratico");
        setMydataFilterPratical(false);
        setTypeData("pratico");
        if (tempDataPratical == undefined) await getDataPratical();
    }

    async function getLocalStorage() {
        try {
            const data: LocalData = JSON.parse(localStorage.getItem("data"));

            if (data.pratical != undefined && data.praticalDate != undefined) {
                setTempDataPratical(data.pratical);
                setLastUpdatePratical(data.praticalDate);
                setLoadingData(false);
            }

            if (data.teoric != undefined && data.teoricDate != undefined) {
                setTempDataTeoric(data.teoric);
                setLastUpdateTeoric(data.teoricDate);
                setLoadingData(false);
            } else {
                getDataTeoric();
            }
        } catch (error) {
            if (typeData == "pratico") {
                setPratical();
            } else {
                setTeoric();
            }
        }
    }
    /* eslint-disable react-hooks/exhaustive-deps */
    async function setLocalStorage() {
        const data: LocalData = {
            pratical: tempDataPratical,
            teoric: tempDataTeoric,
            praticalDate: lastUpdatePratical,
            teoricDate: lastUpdateTeoric,
        };

        localStorage.setItem("data", JSON.stringify(data));
    }

    async function getDataTeoric() {
        if (haveError) return;
        setLoadingData(true);
        const res: requestResponse = await http.get("/data/teoric");

        if (res.errors) {
            enqueueSnackbar(res.errors, { variant: "error" });
            setHaveError(true);
            setErrorMessage(res.errors[0]);
        } else {
            setLastUpdateTeoric(new Date());
            setTempDataTeoric(res.data);
            setLoadingData(false);
        }
    }

    async function getDataPratical() {
        if (haveError) return;
        setLoadingData(true);
        const res: requestResponse = await http.get("/data/pratic");
        if (res.errors) {
            enqueueSnackbar(res.errors, { variant: "error" });
            setHaveError(true);
            setErrorMessage(res.errors[0]);
        } else {
            setLastUpdatePratical(new Date());
            setTempDataPratical(res.data);
            setLoadingData(false);
        }
    }

    async function reloadData() {
        if (typeData == "teorico" && loadingData == false) getDataTeoric();
        else if (typeData == "pratico" && loadingData == false) getDataPratical();
    }

    function goInitial() {
        router.push(routerEnum.INITIAL);
        localStorage.removeItem("data");
    }

    useEffect(() => {
        const id = Number(localStorage.getItem("typeId"));
        id > 2 || id == 5 ? goInitial() : getLocalStorage();
    }, []);

    useEffect(() => {
        const updateLocalStorage = async () => {
            await setLocalStorage();
        };

        updateLocalStorage();
    }, [tempDataPratical, tempDataTeoric, setLocalStorage]);

    try {
        document.body.style.overflow = "hidden";
    } catch (error) {}
    return (
        <MainContainer>
            <GridContainer>
                <ButtonContainer>
                    <Button variant="contained" style={{ marginLeft: "auto", backgroundColor: "#921c22" }} onClick={setTeoric}>
                        Planeja Teorico
                    </Button>
                    <Button variant="contained" style={{ marginLeft: "auto", backgroundColor: "#921c22" }} onClick={setPratical}>
                        Planeja Pratico
                    </Button>
                </ButtonContainer>
                {typeData == "teorico" ? <Title>Dados Do planeja Teorico</Title> : <Title>Dados Do planeja Pratico</Title>}
                <ReloadContainer>
                    <Reload>
                        <>
                            {typeData == "pratico" ? (
                                <ReloadTitle>Ultima atualização: {formatDate(new Date(lastUpdatePratical))}</ReloadTitle>
                            ) : (
                                <ReloadTitle>Ultima atualização: {formatDate(new Date(lastUpdateTeoric))}</ReloadTitle>
                            )}
                        </>
                        <ReloadButton onClick={reloadData}>
                            <Refresh />
                        </ReloadButton>
                    </Reload>
                </ReloadContainer>
            </GridContainer>
            {filterTeoric != null && typeData == "teorico" ? (
                <>
                    <UpdateContainer>
                        <UpdateInfo>
                            <CustomSelect
                                className="grid-establishment"
                                list={filterTeoric.establishment}
                                type="establishment"
                                title="Estabelecimento"
                                setFilter={setFilter}
                                filter={filterApply}
                            ></CustomSelect>
                            <CustomSelect
                                className="grid-city"
                                list={filterTeoric.city}
                                type="city"
                                title="Cidade"
                                setFilter={setFilter}
                                filter={filterApply}
                            ></CustomSelect>
                            <CustomSelect
                                className="grid-profission"
                                list={filterTeoric.participant}
                                type="participant"
                                title="Participante"
                                setFilter={setFilter}
                                filter={filterApply}
                            ></CustomSelect>
                            <CustomSwitch setMyDataFilter={setMyDataFilter}></CustomSwitch>
                        </UpdateInfo>
                    </UpdateContainer>
                </>
            ) : (
                <></>
            )}

            {filterPratical != null && typeData == "pratico" ? (
                <>
                    <UpdateContainer>
                        <UpdateInfo>
                            <CustomSelect
                                className="grid-establishment"
                                list={filterPratical.establishment}
                                type="establishment"
                                title="Estabelecimento"
                                setFilter={setPraticalFilter}
                                filter={filterApplyPratical}
                            ></CustomSelect>
                            <CustomSelect
                                className="grid-city"
                                list={filterPratical.city}
                                type="city"
                                title="Cidade"
                                setFilter={setPraticalFilter}
                                filter={filterApplyPratical}
                            ></CustomSelect>
                            <CustomSelect
                                className="grid-profission"
                                list={filterPratical.participant}
                                type="participant"
                                title="Participante"
                                setFilter={setPraticalFilter}
                                filter={filterApplyPratical}
                            ></CustomSelect>
                            <CustomSwitch setMyDataFilter={setMydataFilterPratical}></CustomSwitch>
                        </UpdateInfo>
                    </UpdateContainer>
                </>
            ) : (
                <></>
            )}

            {!loadingData ? (
                <>
                    {typeData == "teorico" ? (
                        <TableComponentTeoric
                            planAnswer={tempDataTeoric}
                            filterTeoric={filterTeoric}
                            setFilterTeoric={setFilterTeoric}
                            filterApply={filterApply}
                        />
                    ) : (
                        <TableComponentPratical
                            praticalAnswer={tempDataPratical}
                            filterApply={filterApplyPratical}
                            filterPratical={filterPratical}
                            setFilterPratical={setFilterPratical}
                        />
                    )}
                    <DownloadCSV
                        key={1}
                        pratical={tempDataPratical}
                        teoric={tempDataTeoric}
                        typeUsed={typeData}
                        filterApply={filterApply}
                        filterApplyPratical={filterApplyPratical}
                    ></DownloadCSV>
                </>
            ) : (
                <>
                    {!haveError ? (
                        <DivLoad>
                            <CircularProgress sx={{ color: "#6D141A" }} size={64} style={{ margin: "auto" }} />
                            <span style={{ margin: "auto", color: "#6D141A" }}>Carregando dados...</span>
                        </DivLoad>
                    ) : (
                        <DivLoad>
                            <span style={{ margin: "auto", color: "#6D141A" }}>{errorMessage}</span>
                        </DivLoad>
                    )}
                </>
            )}
        </MainContainer>
    );
}
