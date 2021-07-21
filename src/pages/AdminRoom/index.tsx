import { FC } from "react";
import { useHistory, useParams } from 'react-router-dom';

import logoSVG from '../../assets/logo.svg';
import deleteSVG from '../../assets/delete.svg';

import { Button } from '../../components/Button';
import { Question } from "../../components/Question";
import { RoomCode } from '../../components/RoomCode';

import { useRoom } from "../../hooks/useRoom";
import { database } from '../../services/firebase';

import './styles.scss';

type AdminRoomParams = {
  room_id: string;
}

export const AdminRoom: FC = () => {
  const { replace } = useHistory()
  const { room_id } = useParams<AdminRoomParams>();
  const { questions, title } = useRoom(room_id);

  const handleDeleteQuestion = async (question_id: string) => {
    const isConfirm = window.confirm('Tem certeza que você deseja remover essa pergunta?');
  
    if (isConfirm) {
      await database.ref(`/rooms/${room_id}/questions/${question_id}`).remove()
    }
  }

  const handleEndRoom = async () => {
    await database.ref(`/rooms/${room_id}`).update({
      endedAt: new Date()
    });
    replace('/')
  }

  return (
    <div id="page-admin-room">
      <header>
        <div className="content">
          <img src={logoSVG} alt="Letmeask" />
          <div className="">
            <RoomCode code={room_id} />
            <Button 
              title="Encerrar sala" 
              isOutlined 
              onClick={handleEndRoom}
            />
          </div>

        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && (
            <span>{questions.length} pergunta(s)</span>
          )}
        </div>

        <div className="questions-list">
          {questions.map(question => (
            <Question 
              key={question.id}
              content={question.content} 
              author={question.author} 
            >
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteSVG} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );

}