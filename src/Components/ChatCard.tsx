import React from 'react';

export interface ChatCardProps {
    username: string;
    date: string;
    message: string;
}

export interface WebSocketProps {
    data: string;
}

function ChatCard({ username, message, date }: ChatCardProps) {
  return (
    <div className="card">

      <div className="card__message">{message}</div>
      <div className="card__group">
        <div className="card__username">{username}</div>
        <div className="card__date">{date}</div>
      </div>

    </div>
  );
}

export default ChatCard;
