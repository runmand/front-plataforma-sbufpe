import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { white } from "src/core/colors";
import { Box, Button, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { theme } from "src/core/theme";
import { routerEnum } from "src/core/enums";

const LoginModal = dynamic(() => import("@components/modal/log-in/index"), { ssr: false });
const SignupModal = dynamic(() => import("@components/modal/sign-up/index"), { ssr: false });

export default function Index() {
    const router = useRouter();
    const [isOpenLogin, setIsOpenLogin] = React.useState<boolean>(false);
    const [isOpenSignup, setIsOpenSignup] = React.useState<boolean>(false);
    const [hasOpenedLogin, setHasOpenedLogin] = React.useState(false);
    const [hasOpenedSignup, setHasOpenedSignup] = React.useState(false);
    const largeQuery = useMediaQuery("(min-width:720px)");

    const handleShowPageContact = () => {
        router.push("");
    };

    const handleShowTclePage = () => {
        router.push(routerEnum.TCLE);
    };

    useEffect(() => {
        const handleLoginEvent = () => {
            setHasOpenedLogin(true);
            setIsOpenLogin(true);
        };

        // Adiciona o listener para o evento personalizado
        window.addEventListener("clickLoginEvent", handleLoginEvent);

        // Remove o listener quando o componente é desmontado
        return () => {
            window.removeEventListener("clickLoginEvent", handleLoginEvent);
        };
    }, []);

    return (
        <>
            <Button
                style={{
                    fontWeight: "bold",
                    color: theme.white,
                    // fontSize: largeQuery ? '0.875rem' : '0.7rem'
                }}
                onClick={() => {
                    setHasOpenedLogin(true);
                    setIsOpenLogin(true);
                }}
            >
                Entrar
            </Button>
            <Box sx={{ position: "absolute" }}>
                {hasOpenedLogin && <LoginModal
                    isOpen={isOpenLogin}
                    canSkip={true}
                    onClose={() => {
                        setIsOpenLogin(false);
                    }}
                    openSignupModal={() => {
                        setIsOpenSignup(true);
                        setHasOpenedSignup(true);
                    }}
                    openContact={() => handleShowPageContact()}
                />}
                {hasOpenedSignup && <SignupModal
                    isOpen={isOpenSignup}
                    canSkip={true}
                    onClose={() => {
                        setIsOpenSignup(false);
                    }}
                    openTclePage={() => handleShowTclePage()}
                />}
            </Box>
        </>
    );
}
