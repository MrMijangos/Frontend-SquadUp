import { useState, useEffect } from "react";
import LobbyCard from "./LobbyCard";
import { getAllLobbies } from "../../services/lobbyService";
import type { LobbyData } from "../../services/lobbyService";

const LobbyList = () => {
  const [lobbies, setLobbies] = useState<LobbyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllLobbies()
      .then(setLobbies)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Cargando lobbies...</p>;

  return (
    <div className="grid grid-cols-1 gap-4">
      {lobbies.map((lobby) => (
        <LobbyCard key={lobby.id} lobby={lobby} />
      ))}
    </div>
  );
};

export default LobbyList;