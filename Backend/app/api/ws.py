from fastapi import APIRouter
from fastapi import WebSocket
from fastapi import WebSocketDisconnect

from app.websocket.manager import manager

router = APIRouter()


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    print("=" * 50)
    print("WEBSOCKET CONNECTION ATTEMPT")
    print("=" * 50)

    await manager.connect(websocket)

    print("CONNECTED")

    try:

        while True:

            data = await websocket.receive_text()

            print(f"Received: {data}")

            await manager.send_message(
                websocket,
                f"Echo: {data}"
            )

    except WebSocketDisconnect:

        print("DISCONNECTED")

        manager.disconnect(websocket)
        

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    print("WEBSOCKET CONNECTION ATTEMPT")

    await manager.connect(websocket)

    print("CONNECTED")

    try:

        while True:

            data = await websocket.receive_text()

            print(f"Received: {data}")

            await manager.send_message(
                websocket,
                f"Echo: {data}"
            )

    except WebSocketDisconnect:

        print("DISCONNECTED")

        manager.disconnect(websocket)