import { FC } from "react";

import copySVG from '../../assets/copy.svg';

import './styles.scss';

interface RoomCodeProps {
  code: string;
}

export const RoomCode: FC<RoomCodeProps> = ({ code }) => {

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <button className="room-code">
      <div>
        <img src={copySVG} alt="Copy content" />
      </div>
      <span>Sala #{code}</span>
    </button>
  )

}