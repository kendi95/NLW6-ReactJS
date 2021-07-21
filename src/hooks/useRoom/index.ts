import { useEffect, useState } from "react";

import { database } from '../../services/firebase';
import { useApp } from "../useAuth";

type Author = {
  name: string;
  avatar: string;
}

type QuestionType = {
  id: string;
  content: string;
  author: Author;
  isHighlighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likeId: string | undefined;
}

type FirebaseQuestions = {
  [key: string]: {
    content: string;
    author: Author;
    isHighlighted: boolean;
    isAnswered: boolean;
    likes: Record<string, {
      author_id: string;
    }>
  }
}

export const useRoom = (room_id: string) => {
  const { user } = useApp();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${room_id}`)
    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions = databaseRoom.questions as FirebaseQuestions;
      const parsedQuestions = Object
        .entries(firebaseQuestions)
        .map(([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {})
              .find(([key, like]) => like.author_id === user?.id)?.[0]
          }
        });
        setTitle(databaseRoom.tilte);
        setQuestions(parsedQuestions);
    });

    return () => {
      roomRef.off('value');
    }
  }, [room_id, user?.id]);


  return { questions, title };
}