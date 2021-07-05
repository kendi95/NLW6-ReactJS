import { FC } from "react";
import { useHistory } from "react-router-dom";

import illustrationSVG from '../../assets/illustration.svg';
import logoSVG from '../../assets/logo.svg';
import googleIconSVG from '../../assets/google-icon.svg';

import { Button } from "../../components/Button";

import { useApp } from "../../hooks";

import './styles.scss';

export const Home: FC = () => {
  const { push } = useHistory();
  const { signInWithGoogle, user } = useApp();

  const handleCreateRoom = async () => {
    try {
      if (!user) {
        await signInWithGoogle();
      }
      push('/rooms/new')
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationSVG} alt="Illustration" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoSVG} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconSVG} alt="Google" />
            Crie sua sala com Google
          </button>
          <div className="separator">ou entre em uma sala</div>

          <form>
            <input 
              type="text" 
              placeholder="Digite o código da sala..."
            />
            <Button title="Entrar na sala" type="submit" />
          </form>
        </div>
      </main>
    </div>
  );

}