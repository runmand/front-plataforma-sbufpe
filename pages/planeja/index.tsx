/* eslint-disable react/no-unescaped-entities */

import Head from 'next/head';
import { useEffect, useState } from "react";

import PlanForm from "@components/planeja/planeja-form";
import { FinishedForm } from "@components/planeja/finished-form";
import React from 'react';

export default function Index() {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <>
      <Head>
        <title>Planeja | GestBucal</title>
      </Head>
      {isCompleted ? (
        <FinishedForm />
      ) : (
        <PlanForm onFinish={() => setIsCompleted(true)} />
      )}
    </>
  );
}
