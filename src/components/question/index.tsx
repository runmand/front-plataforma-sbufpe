import { useEffect, useState } from "react";
import { emitterEnum } from "../../core/enums";
import { emitter } from "../../core/events";
import ChoiceAnswer from "../answer/choice";
import OpenAnswer from "../answer/open";
import { TPROPS, QUESTION_ANSWER } from "./type";
import { ID } from "src/core/types";
import { droplist } from "src/shared/dataBase";
import Image from "next/image";

const ff = { body: "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif" };
const C = {
  primary: '#6D141A',
  bg: '#FAF7F2',
  white: '#fff',
  text: '#1c1917',
  border: '#e7e5e4',
  borderLight: '#f5f5f4',
};

export default function Index(props: TPROPS) {
    const selectOptions: ID[] = droplist;
    const [canShow, setCanShow] = useState(false);
    const [isMedicalExam, setIsMedicalExam] = useState(false);
    const [viewportHeight, setViewportHeight] = useState<number>(0);
    const [viewportWidth, setViewportWidth] = useState<number>(0);

    /** Criando evento de emissão em todas as questões. */
    const handleAnswerQuestion = (answer: QUESTION_ANSWER) => {
        if (canShow || !props.parent) props.onAnswerQuestion(answer);

        const emitterKey = `${props.question.formQuestionFormRegisterId}-${emitterEnum.CAN_SHOW_QUESTION}`;
        emitter.emit(emitterKey, answer);
    };

    if (props.parent) {
        const listenerKey = `${props.parent.formQuestionFormRegisterId}-${emitterEnum.CAN_SHOW_QUESTION}`;

        /** Criando evento de escuta no filho. */
        emitter.addListener(listenerKey, (parentAnswer: QUESTION_ANSWER) => {
            const arrayAnswer = JSON.parse(parentAnswer.answer.replace(/[1-9]\d*/g, "1"));
            const index = arrayAnswer.indexOf(1);
            const isSameAnswer = props.question.condition?.userAnswer?.[index] == arrayAnswer[index];
            setCanShow(isSameAnswer);

            /** Caso a questão fique oculta novamente, deleta a resposta dela do vetor de respostas do formulário. */
            if (!canShow) props.onHideQuestion(props.question.formQuestionFormRegisterId);
        });
    }

    useEffect(() => {
        setViewportHeight(window.innerHeight);
        setViewportWidth(window.innerWidth);
    }, []);

    if (!props.parent || canShow) {
        const hasError = !!(props.isError || props.errorIds?.has(props.question.formQuestionFormRegisterId));
        return (
            <div
                id={`question-${props.question.formQuestionFormRegisterId}`}
                style={{
                    margin: !props.parent ? '0 0 20px 0' : '12px 0 0 0',
                    backgroundColor: !props.parent ? C.white : C.borderLight,
                    borderRadius: '16px',
                    border: `1.5px solid ${hasError ? '#dc2626' : C.border}`,
                    overflow: 'hidden',
                    transition: 'border-color 0.2s ease',
                    boxShadow: hasError ? '0 0 0 3px rgba(220,38,38,0.08)' : 'none',
                }}>
                <div style={{ padding: '24px 28px 20px' }}>
                    <p style={{
                        fontSize: '17px',
                        fontWeight: 600,
                        fontFamily: ff.body,
                        color: C.primary,
                        lineHeight: 1.55,
                        margin: props.question.completionMessage?.trim() ? '0 0 4px' : '0 0 16px',
                    }}>
                        {props.parent?.formQuestionFormRegisterId === 234 ? (
                            <>{props.question.title}</>
                        ) : (
                            <>{props.index + 1} - {props.question.title}</>
                        )}
                    </p>
                    {props.question.completionMessage?.trim() && (
                        <p style={{
                            fontSize: '14px',
                            fontWeight: 400,
                            fontFamily: ff.body,
                            color: '#6b7280',
                            lineHeight: 1.5,
                            margin: '0 0 16px',
                        }}>
                            {props.question.completionMessage}
                        </p>
                    )}
                    {props.question.choices.length === 0 ? (
                        <OpenAnswer
                            formQuestionFormRegisterId={props.question.formQuestionFormRegisterId}
                            placeholder={props.question.completionMessage || undefined}
                            inputType={/idade|quanto tempo|ano[s]?|número|numeração/i.test(props.question.title) ? 'number' : 'text'}
                            onAnswerQuestion={(data) => {
                                handleAnswerQuestion(data);
                            }}
                        />
                    ) : (
                        <ChoiceAnswer
                            formQuestionFormRegisterId={props.question.formQuestionFormRegisterId}
                            choices={props.question.choices.sort(
                                (a, b) => +b.formsQuestionFormsQuestionChoicesId - +a.formsQuestionFormsQuestionChoicesId
                            )}
                            onSelectChoice={(data) => {
                                const selectedAnswer = JSON.parse(data.answer).filter((item: number) => Boolean(item))[0];

                                const answerToSave = props.question.choices.find(
                                    (item) => item.formsQuestionFormsQuestionChoicesId === selectedAnswer
                                );

                                if (props.question.title.includes("Nome do CEO") || props.question.title.includes("Nome do Estabelecimento")) {
                                    localStorage.setItem("selectedAnswer", JSON.stringify(answerToSave));
                                }

                                console.log(data);

                                // Caso a questão respondida seja "Será feito exame médico?", e caso seja "Sim", exibiremos a imagem
                                if (
                                    (props.question.formQuestionFormRegisterId === 234 && data.answer === "[1336,0]") ||
                                    (props.question.formQuestionFormRegisterId === 499 && data.answer === "[1737,0]")
                                ) {
                                    setIsMedicalExam(true);
                                }
                                // Caso seja não, vamos colocar a variável como false
                                if (
                                    (props.question.formQuestionFormRegisterId === 234 && data.answer === "[0,1337]") ||
                                    (props.question.formQuestionFormRegisterId === 499 && data.answer === "[0, 1738]")
                                ) {
                                    setIsMedicalExam(false);
                                }

                                handleAnswerQuestion(data);
                            }}
                            choiceType={selectOptions.includes(props.question.formQuestionFormRegisterId) ? "autoComplete" : props.question.type.cod === 'MC' ? "checkbox" : "radio"}
                        />
                    )}
                    {hasError && (
                        <div style={{
                            marginTop: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: '#dc2626',
                            fontFamily: ff.body,
                            fontSize: '13px',
                            fontWeight: 500,
                        }}>
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            Esta questão é obrigatória
                        </div>
                    )}
                </div>
                <div>
                    {(props.question.formQuestionFormRegisterId === 234 || props.question.formQuestionFormRegisterId === 499) && isMedicalExam && (
                        <Image
                            src="/tabela.jpg"
                            alt=""
                            width={Math.round(viewportWidth * 0.6) || 600}
                            height={Math.round(viewportHeight * 0.8) || 480}
                            style={{ display: 'block', margin: '0 auto', maxWidth: '100%', height: 'auto' }}
                        />
                    )}
                    {(props.question.childrenQuestion ?? []).slice().reverse().map((child, index) => (
                        <Index
                            key={index}
                            index={index}
                            parent={props.question}
                            question={child}
                            errorIds={props.errorIds}
                            onAnswerQuestion={(data) => {
                                props.onAnswerQuestion(data);
                            }}
                            onHideQuestion={(data) => {
                                props.onHideQuestion(data);
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }
    return null;
}
