import React from "react";
import { OrkutNostalgicIconSet } from "../../lib/AlurakutCommons";
import { checkUrl } from "../../lib/utils";
import { addCommunity } from "../../services/community.service";
import Box from "../Box";
import { ButtonLoader } from "../ButtonLoader";

export function MainArea({ communities, setCommunities, creatorSlug }) {

    let [loading, setLoading] = React.useState(false);

    function getFormData(event) {
        const dadosDoForm = new FormData(event.target);
        const data = {
            title: dadosDoForm.get('title'),
            imageUrl: dadosDoForm.get('image'),
            creatorSlug
        }
        validadeData(data);
        return data;
    }

    async function handleCriaComunidade(event) {
        event.preventDefault();
        try {
            setLoading(true);
            // Add the new community on the serve
            const newCommunity = await addCommunity(getFormData(event));
            // Get the updated list of communities
            const comunidadesAtualizadas = [newCommunity, ...communities];
            // Update the communities state
            setCommunities(comunidadesAtualizadas);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    function validadeData(data) {
        if (!data.title) {
            throw new Error('O título é obrigatório');
        }
        if (!data.imageUrl) {
            throw new Error('A imagem é obrigatória');
        }
        if (!checkUrl(data.imageUrl)) {
            throw new Error('A imagem é inválida');
        }
    }

    return (
        <>
            <Box>
                <h1 className="title">
                    Bem vindo(a)
                </h1>
                <OrkutNostalgicIconSet />
            </Box>

            <Box>
                <h2 className="subTitle">O que você deseja fazer?</h2>
                <form onSubmit={handleCriaComunidade}>
                    <div>
                        <input
                            placeholder="Qual vai ser o nome da sua comunidade?"
                            name="title"
                            aria-label="Qual vai ser o nome da sua comunidade?"
                            type="text"
                        />
                    </div>
                    <div>
                        <input
                            placeholder="Coloque uma URL para usarmos de capa"
                            name="image"
                            aria-label="Coloque uma URL para usarmos de capa"
                        />
                    </div>

                    <ButtonLoader loading={loading} title="Criar comunidade" />

                </form>
            </Box>
        </>
    );
};
