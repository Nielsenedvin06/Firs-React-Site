import { createContext, useContext, useState } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [nickname, setNickname] = useState("");
  const [lobby, setLobby] = useState("");

  return (
    <PlayerContext.Provider value={{ nickname, setNickname, lobby, setLobby }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);