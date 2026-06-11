export interface SignResponse {
 hands_detected: number;
  prediction: string | null;
  stable_prediction: string | null;
  confidence: number;
  current_word: string;
  sentence: string;
  
  
}

export class SignSocket {
  private socket: WebSocket | null =
    null;

  connect(
    onMessage: (
      data: SignResponse
    ) => void
  ) {

    console.log(
      "CONNECTING TO WEBSOCKET"
    );

    this.socket = new WebSocket(
      "ws://127.0.0.1:8000/ws/sign"
    );

    this.socket.onopen = () => {
      console.log(
        "WEBSOCKET OPEN"
      );
    };

    this.socket.onmessage = (
      event
    ) => {

      console.log(
        "MESSAGE RECEIVED",
        event.data
      );

      onMessage(
        JSON.parse(
          event.data
        )
      );
    };

    this.socket.onerror = (
      error
    ) => {

      console.error(
        "WEBSOCKET ERROR",
        error
      );
    };

    this.socket.onclose = () => {

      console.log(
        "WEBSOCKET CLOSED"
      );
    };
  }

  sendFrame(
    frame: string
  ) {

    console.log(
      "sendFrame called"
    );

    console.log(
      "Socket State:",
      this.socket?.readyState
    );

    if (
      this.socket &&
      this.socket.readyState ===
        WebSocket.OPEN
    ) {

      console.log(
        "FRAME SENT"
      );

      this.socket.send(
        frame
      );

    } else {

      console.log(
        "SOCKET NOT OPEN"
      );
    }
  }

  disconnect() {

    console.log(
      "DISCONNECTING SOCKET"
    );

    this.socket?.close();
  }
}
