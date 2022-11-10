import { StyledRegisterVideo } from "./styles";
import React from "react";


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