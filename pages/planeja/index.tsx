/* eslint-disable react/no-unescaped-entities */
import Base from "@components/base-layout/index";
import Appbar from "@components/app-bar/index";
import HomeToolbar from "@components/toolbar/home";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { CourseAll } from "src/core/typePlaneja";

import { ApiPaneja } from "src/core/apiPlaneja";
import PlanejaQuestion from "@components/planeja/index";
import SendData from "@components/planeja/sendData";
import { QuestionResponse } from "@components/planeja/type";

export default function Index() {
  const [courses, setCourses] = useState<CourseAll>();
  const [page, setPage] = useState(0);
  const [data, setData] = useState<QuestionResponse[]>([]);
  const [sendData, setSendData] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = new ApiPaneja();
        const response = await api.tempGetAllofCourse(1);
        console.log(response);
        setCourses(response);
        setLoad(false);
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (courses) {
      if (page == courses.questions.length) {
        setSendData(true);
      }
    }
  }, [page]);

  function nextPage(newData: QuestionResponse[]): void {
    if (newData !== null) setData((lastData) => [...lastData, ...newData]);
    setPage(page + 1);
  }

  function previusPage() {
    setPage(page - 1);
  }

  return (
    <Base
      appBarChild={<Appbar toolbarChild={<HomeToolbar />} />}
      mainContainerChild={
        <Box
          sx={{
            width: "85%",
            marginY: "6rem",
            display: "flex",
            marginX: "auto",
            flexDirection: "column",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            paddingY: "20px",
          }}
        >
          {!load ? (
            !sendData ? (
              courses.questions.map((question, index) => (
                <PlanejaQuestion
                  question={question}
                  nextPage={nextPage}
                  last={index === courses.questions.length - 1}
                  hidden={index !== page}
                  previusPage={previusPage}
                  key={question.question.id}
                />
              ))
            ) : (
              <SendData key={1} data={data} />
            )
          ) : (
            <>
              <div className="loader"></div>
              <Typography
                sx={{
                  textAlign: "justify",
                }}
              >
                Lendo questões por favor aguarde
              </Typography>
            </>
          )}
        </Box>
      }
    />
  );
}
