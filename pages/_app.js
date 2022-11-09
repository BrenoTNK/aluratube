import React from "react";
import { ThemeProvider } from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import ColorModeProvider, { ColorModeContext } from "../src/components/Menu/components/ColorMode";

const theme = {
    // Objeto para definir os temas
    light: {
        backgroundBase: "#f9f9f9",
        backgroundLevel1: "#fff",
        backgroundLevel2: "#f0f0f0",
        borderBase: "#e5e5e5",
        textColorBase: "#222",
    },
    dark: {
        backgroundBase: "#181818",
        backgroundLevel1: "#202020",
        backgroundLevel2: "#313131",
        borderBase: "#383838",
        textColorBase: "#fff",
    }
};

// _app.js -> Definições globais do NextJS
// ThemeProvider -> Prover o tema para a app toda
// ColorModeProvider -> Prove o state de light ou dark mode para todo mundo


function ProviderWrapper(props) {
    // Hook para iniciar o tema
    return (
        <ColorModeProvider initialMode={"dark"}>
            {props.children}
        </ColorModeProvider>
    );
}


function MyApp({ Component, pageProps }) {
    // Inicia o projeto
    const contexto = React.useContext(ColorModeContext);

    return (
        <ThemeProvider theme={theme[contexto.mode]}>
            <CSSReset />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}


export default function _App(props) {
    // Serve para juntar tudo e dar set do tema ande de iniciar
    return (
        <ProviderWrapper>
            <MyApp {...props}/>
        </ProviderWrapper>
    );
};
