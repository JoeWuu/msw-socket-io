import './App.css'
import { worker } from './mocks/browser';

await worker.start();

// Does not work
import { io } from 'socket.io-client';

// Does work
// const { io } = await import('socket.io-client');

io('ws://localhost:3000', { transports: ['websocket'] });

function App() {
  return null;
}

export default App
