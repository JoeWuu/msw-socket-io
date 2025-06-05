## Issue
`MSW` fails to intercept the requests from socket intstance of `socket.io`.

After taking a deep dive into `socket.io` and `msw`, I found that `socket.io` save a reference to `globalThis.WebSocket` [here](https://github.com/socketio/socket.io/blob/main/packages/engine.io-client/lib/transports/websocket.ts#L155) and `msw` overwrite `globalThis.WebSocket` with custom `WebSocketProxy` [here](https://github.com/mswjs/interceptors/blob/main/src/interceptors/WebSocket/index.ts#L157).
So, the problem might be the execution order of the above two scripts.

Then, I tried "**lazy loading**" `socket.io` to make `socket.io` execute after `msw`.
```ts
import { worker } from './mocks/browser';
await worker.start();

const { io } = await import('socket.io-client');
io('ws://localhost:3000', { transports: ['websocket'] });
```
And it finally works.

## Start the dev server

```bash
npm rum dev
```
