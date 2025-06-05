import { ws } from 'msw';

export const wsl = ws.link('ws://localhost:3000');

const handlers = [
  wsl.addEventListener('connection', () => {
    console.log('Connected');
  }),
];

export default handlers;
