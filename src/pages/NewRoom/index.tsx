import { FC } from "react";
import { Link } from 'react-router-dom';

import illustrationSVG from '../../assets/illustration.svg';
import logoSVG from '../../assets/logo.svg';

import { Button } from "../../components/Button";

import './styles.scss';

export const NewRoom: FC = () => {

  return (
    <div id="page-new-room">
      <aside>
        <img src={illustrationSVG} alt="Illustration" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoSVG} alt="Letmeask" />

          <h2>Criar uma nova sala</h2>

          <form>
            <input 
              type="text" 
              placeholder="Nome da sala..."
            />
            <Button title="Criar sala" type="submit" />
          </form>

          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );

}