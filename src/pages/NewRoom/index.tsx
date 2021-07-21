import { FC, FormEvent, useState } from "react";
import { Link, useHistory } from 'react-router-dom';

import illustrationSVG from '../../assets/illustration.svg';
import logoSVG from '../../assets/logo.svg';

import { Button } from "../../components/Button";

import { useApp } from "../../hooks/useAuth";
import { database } from '../../services/firebase';

import './styles.scss';

export const NewRoom: FC = () => {
  const { user } = useApp();
  const [newRoom, setNewRoom] = useState('');
  const { push } = useHistory();

  const handleCreateNewRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    try {
      const roomsRef = database.ref('rooms');
  
      const firebaseRoom = await roomsRef.push({
        title: newRoom,
        authorId: user.id,
      });

      push(`/rooms/${firebaseRoom.key}`);
    } catch (error) {
      console.log(error)
    }

  }

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

          <form onSubmit={handleCreateNewRoom}>
            <input 
              type="text" 
              placeholder="Nome da sala..."
              value={newRoom}
              onChange={({ target }) => setNewRoom(target.value)}
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