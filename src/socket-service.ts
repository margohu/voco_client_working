export const socket: any = new WebSocket('ws://localhost:4000/');
export async function connectToServer() {
    return new Promise((resolve, reject) => {
        const timer = setInterval(() => {
            if (socket.readyState === 1) {
                clearInterval(timer)
                resolve(socket);
            }
        }, 10);
    });
}

export const disconnectSocket = () => {
    if (socket) {
        socket.onClose = () => {
            console.log('disconnected');
        };
    }
};
