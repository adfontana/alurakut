import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '50%' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function MainArea() {
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
        <form onSubmit={function handleCriaComunidade(e) {
          e.preventDefault();
          const dadosDoForm = new FormData(e.target);
          const comunidade = {
            title: dadosDoForm.get('title'),
            imageUrl: dadosDoForm.get('image'),
            creatorSlug: usuarioAleatorio,
          }

          fetch('/api/comunidades', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(comunidade)
          })
            .then(async (response) => {
              const dados = await response.json();
              const comunidade = dados.registroCriado;
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            })
        }}>
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

          <button>
            Criar comunidade
          </button>
        </form>
      </Box>
    </>
  );
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {propriedades.items.slice(0, 6).map((itemAtual) => {
          return (
            <li key={itemAtual.login}>
              <a href={`https://github.com/${itemAtual.login}.png`}>
                <img src={itemAtual.avatar_url} />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const usuarioAleatorio = 'adfontana';
  const [comunidades, setComunidades] = React.useState([]);
  const pessoasFavoritas = [
    'vanessakoch',
    'danielbraghini',
    'henriquesandri',
    'andrebraghini',
    'igsrc',
    'felipefialho',
  ]
  const [seguidores, setSeguidores] = React.useState([]);

  function RelationsArea() {
    return (
      <>
        <ProfileRelationsBox title="Seguidores" items={seguidores} />
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades ({comunidades.length})
          </h2>
          <ul>
            {comunidades.slice(0, 6).map((itemAtual) => {
              return (
                <li key={itemAtual.id}>
                  <a href={`/communities/${itemAtual.id}`}>
                    <img src={itemAtual.imageUrl} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da comunidade ({pessoasFavoritas.length})
          </h2>

          <ul>
            {pessoasFavoritas.slice(0, 6).map((itemAtual) => {
              return (
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </>
    );
  }

  // 0 - Pegar o array de dados do github 
  React.useEffect(function () {
    // GET
    fetch('https://api.github.com/users/adfontana/followers')
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
      })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'fdbe9eb3f2fd7ef6fb734a4f4b660f',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
      .then((response) => response.json())
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        setComunidades(comunidadesVindasDoDato)
      })
  }, [])

  return (
    <>
      {/* Topbar menu */}
      <AlurakutMenu githubUser="adfontana" />

      <MainGrid>

        {/* Sidebar */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>

        {/* Main area */}
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <MainArea />
        </div>

        {/* Relations area */}
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <RelationsArea />
        </div>

      </MainGrid>
    </>
  )
}
