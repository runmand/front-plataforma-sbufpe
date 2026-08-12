import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { theme } from "src/core/theme";
import { localStorageKeyEnum, routerEnum } from "src/core/enums";
import { useRouter } from "next/navigation";

export default function Index() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem(localStorageKeyEnum.TOKEN);
        localStorage.removeItem(localStorageKeyEnum.TYPE_ID);
        router.push(routerEnum.INITIAL);
    };

    return (
        <>
            <Button
                style={{
                    fontWeight: "bold",
                    color: theme.white,
                    // fontSize: largeQuery ? '0.875rem' : '0.7rem'
                }}
                onClick={() => handleLogout()}
            >
                <LogoutIcon /> Sair
            </Button>
        </>
    );
}
