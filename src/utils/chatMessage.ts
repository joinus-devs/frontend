interface MessageFromServer {
  method: "join" | "leave" | "broadcast";
  body: string;
  room: number;
  user: number;
}

export const makeMessage = (
  method: MessageFromServer["method"],
  body: string,
  room: number,
  user: number
) => {
  return JSON.stringify({
    method,
    body,
    room,
    user,
  });
};
