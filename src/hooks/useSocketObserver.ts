import { getDomain } from "@/apis";
import { ChatType } from "@/constants/chat";
import { SocketMessage } from "@/types/chat";
import { makeMessage } from "@/utils";
import { useCallback, useEffect } from "react";

interface UseSocketObserverProps {
  groupId?: number;
  userId?: number;
}

export type SubscribeCb = (data: SocketMessage) => void;

// Singleton Pattern
class SockManager {
  static instance: SockManager;
  private _ws: WebSocket | null = null;
  private _callbacks: SubscribeCb[] = [];

  public isConnecting = false;

  get ws() {
    if (this._ws && this._ws.readyState !== this._ws.OPEN) {
      return null;
    }
    return this._ws;
  }

  get callbacks() {
    return this._callbacks;
  }

  public connect(ws: WebSocket) {
    if (this._ws) {
      this._ws.close();
    }
    this._ws = ws;
  }

  public isConnected() {
    return this._ws && this._ws?.readyState === this._ws?.OPEN;
  }

  public subscribe(cb: SubscribeCb) {
    this._callbacks.push(cb);
  }

  public unsubscribe(cb: SubscribeCb) {
    this._callbacks = this._callbacks.filter((callback) => callback !== cb);
  }

  static getInstance() {
    if (!SockManager.instance) {
      SockManager.instance = new SockManager();
    }
    return SockManager.instance;
  }
}

const useSocketObserver = ({ groupId, userId }: UseSocketObserverProps) => {
  const handleSubmit = useCallback(
    (value: string) => {
      const ws = SockManager.getInstance().ws;

      console.log(ws);

      if (!groupId || !userId) return;
      if (!ws) return;
      if (ws.readyState !== ws.OPEN) {
        console.log("submit error : not connected");
        return;
      }

      ws.send(makeMessage(ChatType.Chat, value, groupId, userId));
    },
    [groupId, userId]
  );

  useEffect(() => {
    if (!groupId || !userId) return;

    const domain = getDomain("", "ws");
    const socket = new WebSocket(domain);

    socket.onopen = () => {
      socket.send(makeMessage(ChatType.Join, "join test", groupId, userId));
    };

    socket.onmessage = (event) => {
      const data: SocketMessage = JSON.parse(event.data);
      const callbacks = SockManager.getInstance().callbacks;
      callbacks.forEach((cb) => cb(data));
    };

    socket.onclose = (e: CloseEvent) => {
      console.log("code", e.code);
    };

    SockManager.getInstance().connect(socket);

    return () => {
      socket.close();
    };
  }, [groupId, userId]);

  return {
    subscribe: useCallback((cb: SubscribeCb) => {
      SockManager.getInstance().subscribe(cb);
    }, []),
    unsubscribe: useCallback((cb: SubscribeCb) => {
      SockManager.getInstance().unsubscribe(cb);
    }, []),
    submit: handleSubmit,
  };
};

export default useSocketObserver;
