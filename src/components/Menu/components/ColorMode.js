import React from "react";

export const ColorModeContext = React.createContext({
    // Cria o modulo para definir o tema
    mode: "",
    setMode: () => { alert("Você precisa me configurar primeiro!")  },
    toggleMode: () => { alert("Você precisa me configurar primeiro!")  },
});

export default function ColorModeProvider(props) {
    // Define a cor do tema
    const [mode, setMode] = React.useState(props.initialMode);

    function toggleMode() {
        // Função para dar "set" o tema
        if(mode === "dark") setMode("light");
        if(mode === "light") setMode("dark");
    }

    return (
        <ColorModeContext.Provider value={{ mode: mode, setMode: setMode, toggleMode: toggleMode }}>
            {props.children}
        </ColorModeContext.Provider>
    );
}