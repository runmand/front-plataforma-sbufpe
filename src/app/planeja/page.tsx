/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState } from "react";
import PlanForm from "@components/planeja/planeja-form";
import { FinishedForm } from "@components/planeja/finished-form";
import React from 'react';

export default function Page() {
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        document.title = 'Planeja | GestBucal';
    }, []);

    return (
        <>
            {isCompleted ? (
                <FinishedForm />
            ) : (
                <PlanForm onFinish={() => setIsCompleted(true)} />
            )}
        </>
    );
}
