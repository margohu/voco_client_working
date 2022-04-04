import React, { useEffect } from 'react';
import './App.css';
import Chat from './Components/Chat';
import { disconnectSocket, connectToServer } from './socket-service';

function App() {
    useEffect(() => {

        connectToServer();
        return () => {
            disconnectSocket();
        }
    }, []);

    return (
        <>
            <Chat />
        </>
    );
}

export default App;
