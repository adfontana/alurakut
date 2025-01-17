import React from 'react';
// Hook do NextJS
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { getToken } from '../src/services/alurakut.service';

export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = React.useState('');

  async function handleSubmit(infosDoEvento) {
    infosDoEvento.preventDefault();
    // Get token from server
    const token = await getToken(githubUser);
    // Save token in cookies
    nookies.set(null, 'USER_TOKEN', token, {
      path: '/',
      maxAge: 86400 * 7
    })
    // Redirect to home
    router.push('/')    
  }

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="/logo.png" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={handleSubmit}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input
              placeholder="Usuário"
              value={githubUser}
              onChange={(evento) => {
                setGithubUser(evento.target.value)
              }}
            />
            {githubUser.length === 0 ? 'Preencha o campo' : ''}
            <button type="submit">
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
                </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Futekut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
}