'use client';

import React, { useState } from "react";
import Image from "next/image";

interface TopChampion {
  championId: number;
  championName: string;
  championLevel: number;
  championPoints: number;
}

interface SummonerData {
  name: string;
  level: number;
  puuid: string;
  profileIconUrl: string;
}

interface RiotLookupData {
  summoner: SummonerData;
  topChampions: TopChampion[];
}

const RiotLookup: React.FC = () => {
  const [riotId, setRiotId] = useState("");
  const [region, setRegion] = useState("na1");
  const [data, setData] = useState<RiotLookupData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(
        "https://nm2kdjxihkdqa2gkktn2ir2wyi0nssxg.lambda-url.us-east-1.on.aws/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            summonerName: riotId,
            region: region,
          }),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to fetch");
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center absolute p-6 sm:p-20 h-full w-full z-10">
      {/* Transparent Blurred Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 flex flex-col gap-4"
      >
        <h2 className="text-center text-2xl font-bold font-mono text-white">
            Search Summoner
        </h2>

        <input
          type="text"
          placeholder="Enter Riot ID (e.g. vir#0410)"
          value={riotId}
          onChange={(e) => setRiotId(e.target.value)}
          required
          className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
        />

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none"
        >
          <option value="na1">NA</option>
          <option value="euw1">EUW</option>
          <option value="eun1">EUNE</option>
          <option value="kr">KR</option>
          <option value="jp1">JP</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded-lg transition"
        >
          {loading ? "Fetching..." : "Search"}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-4 text-red-400 bg-red-900/30 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Result Card */}
      {data && (
        <div className="mt-6 w-full max-w-2xl backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 text-white animate-tile-fade-in">
          <div className="flex items-center gap-4">
            <Image
              src={data.summoner.profileIconUrl}
              alt="icon"
              className="w-16 h-16 rounded-full border border-white/30"
              width={64}
              height={64}
            />
            <div>
              <h3 className="text-xl font-bold">{data.summoner.name}</h3>
              <p className="text-white/70">Level {data.summoner.level}</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-3 font-mono text-lg">Top Champions</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {data.topChampions.map((champ) => (
                <div
                  key={champ.championId}
                  className="bg-white/10 border border-white/20 rounded-xl p-4 flex flex-col items-center text-center hover:bg-white/20 transition"
                >
                  <div className="text-base font-bold mb-1">
                    {champ.championName}
                  </div>
                  <div className="text-sm text-white/70">
                    Mastery Level {champ.championLevel}
                  </div>
                  <div className="text-xs mt-1 text-sky-800">
                    {champ.championPoints.toLocaleString()} pts
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiotLookup;