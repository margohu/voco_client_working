import React, { useEffect, useState } from 'react';
import '../App.css';
import data from '../data.json';
import ChatCard, { ChatCardProps, WebSocketProps } from './ChatCard';
import { socket } from "../socket-service";

function Chat() {
  const [messages, setMessages] = useState<Array<ChatCardProps>>([]);
  const [author, setAuthor] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    setMessages(data);
  }, []);
  const submitMessage = () => {
    setMessages([...messages, {
      message,
      username: author,
      date: new Date().toISOString(),
    }]);
    const chat = {
      message,
      username: author,
    }
    socket.send(JSON.stringify(chat));
    setMessage('');

    socket.onmessage = (websocketData: WebSocketProps) => {
      const chatObject = JSON.parse(websocketData.data) as ChatCardProps;
      setMessages([...messages, {
        message: chatObject.message,
        username: chatObject.username,
        date: chatObject.date,
      }]);
    }

  };

  return (
    <div>
      <h3>VOCO</h3>

      <div>
        {messages.map((cardItem: ChatCardProps, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <ChatCard
            /* eslint-disable-next-line react/no-array-index-key */
            key={index}
            username={cardItem.username}
            message={cardItem.message}
            date={cardItem.date}
          />
        ))}
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Author"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
          value={author}
        />
        <input
          type="text"
          placeholder="Message"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          value={message}
        />

        <button
          type="submit"
          onClick={() => {
            submitMessage();
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
}

export default Chat;
