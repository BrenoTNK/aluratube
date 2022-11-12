import { StyledRegisterVideo } from "./styles";
import React from "react";
import { createClient } from "@supabase/supabase-js";

function getVideoThumb(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}hqdefault.jpg`;
}

function useForm(props) {
// Custom Hook para o formulário
    const [values, setValues] = React.useState(props.initialValues); 

    return {
        values, // Chama o valor que será modificado
        handleChange: (e) => {
        // Função do onChange()
            const value = e.target.value;   // Pega o valor atual
            const name = e.target.name;     // Chama o nome do campo
            setValues({
            // Atualiza os valores
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            // Função para limpar o formulário
            setValues({});
        }
    };
}

// Vincula com o Banco de Dados do supabase
const PROJECT_URL = "https://vltojvklnxrblqndhkoy.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsdG9qdmtsbnhyYmxxbmRoa295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNzQ3NjksImV4cCI6MTk4Mzg1MDc2OX0.IZ-YGq7LIFJ1xPNjInSnfBjlP1TwiNoCOyp-eA2Jj8E";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);


export default function RegisterVideo() {
    const formCadastro = useForm({
    // Chama o custom hook
        initialValues: { titulo: "", url: "" }  // Valores do formulário
    });
    const [formVisivel, setFormVisivel] = React.useState(false);    // Fazer o formulário aparecer ou não

    return (
    // -> Formulario
        <StyledRegisterVideo>
        {/* Chama o CSS */}
            <button className="add-video"  onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel ? (
            // Caso o valor boleano (formVisivel) for true, mostra o formulário
                <form onSubmit={(e) => {
                // Ao submitar o Form
                    e.preventDefault();         // Previne que a página recarregue
                    
                    // Contrato entre o Front e o Back
                    supabase.from("video").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getVideoThumb(formCadastro.values.url),
                        playlist: "jogos",
                    })
                    .then((res) => {
                        // Caso dê certo!
                        console.log(res);
                    })
                    .catch((err) => {
                        // Caso dê erro!
                        console.log(err);
                    });

                    setFormVisivel(false);      // Fecha o formulário ao submitar
                    formCadastro.clearForm();   // Limpa o formulário
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>
                        <input
                            placeholder="Titulo do vídeo"
                            value={formCadastro.values.titulo}  // Pega o valor do titulo pelo hook
                            name="titulo"
                            onChange={formCadastro.handleChange}// Chama a função para alterar os valores
                        />
                        <input
                            placeholder="URL"
                            value={formCadastro.values.url}     // Pega o valor da url pelo hook
                            name="url"
                            onChange={formCadastro.handleChange}// Chama a função para alterar os valores
                        />
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            // Caso contrário, mostra nada
            ) : null}

            {/*
                // Pode ser feito dessa maneira também
                formVisivel && (
                    <form>
                        ...
                    </form>
                )
            */}
            
        </StyledRegisterVideo>
    );
}