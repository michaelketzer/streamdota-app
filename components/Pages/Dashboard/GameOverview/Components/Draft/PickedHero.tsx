import React, { useCallback, useState } from "react";

import { ReactElement } from "react";
import ShowStats from "./ShowStats";
import classNames from "classnames";
import { getDefaultHeader } from "../../../../../../modules/middleware/Network";
import { useAbortFetch } from "../../../../../../hooks/abortFetch";

interface Props {
  heroId: number;
  heroClass: string;
  overlayActive: boolean;
  onShowOverlay: () => void;
}

export interface HeroOverview {
  index: number;
  heroId: number;
  matchCount: number;
  matchWins: number;
  pickPhaseOne: number;
  pickPhaseTwo: number;
  pickPhaseThree: number;
  banCount: number;
  banPhaseOne: number;
  banPhaseTwo: number;
  banPhaseThree: number;
  totalGamesCount: number;
}

export async function fetchHeroStats(
  abortController: AbortController,
  leagueId: string,
  heroId: number
): Promise<HeroOverview | null> {
  const response = await fetch(
    process.env.API_URL + `/casting/heroStats/${leagueId}/${heroId}`,
    { headers: getDefaultHeader(), signal: abortController.signal }
  );
  if (response.ok) {
    return await response.json();
  }

  return null;
}

export const baseUrl = "https://api.streamdota.com/static/heroes/vids/";

export default React.memo(function PickedHero({
  heroId,
  heroClass,
  overlayActive,
  onShowOverlay,
}: Props): ReactElement {
  const [stats] = useAbortFetch(fetchHeroStats, "7.28", heroId);
  const games = stats?.matchCount || 0;
  const wins = stats?.matchWins || 0;
  const totalGamesCount = stats?.totalGamesCount || 0;
  const winRate = games > 0 ? Math.floor((wins * 100) / games) : 0;
  const banRate =
    totalGamesCount > 0
      ? Math.floor(((stats?.banCount || 0) * 100) / totalGamesCount)
      : 0;
  const pickRate =
    totalGamesCount > 0 ? Math.floor((games * 100) / totalGamesCount) : 0;

  return (
    <div className={"entry"}>
      <video loop autoPlay muted playsInline>
        <source src={baseUrl + heroClass + "/300.mov"} type="video/quicktime" />
        <source src={baseUrl + heroClass + "/300.webm"} type="video/webm" />
      </video>

      <div className={"details"}>
        <div className={"statsValue"}>
          <div className={"stats"}>
            {wins} / {games}
          </div>
          <div
            className={classNames("winRate", {
              positive: winRate > 60,
              negative: winRate < 40,
            })}
          >
            {winRate}%
          </div>
          <div className={"label"}>WINRATE</div>
        </div>
        <div className={"statsValue"}>
          <div className={"stats"}>{pickRate}%</div>
          <div className={"label"}>PICKS</div>
        </div>
        <div className={"statsValue"}>
          <div className={"stats"}>{banRate}%</div>
          <div className={"label"}>BANS</div>
        </div>
      </div>

      <div className={"details"}>
        <ShowStats
          heroId={heroId}
          heroClass={heroClass}
          rawStats={stats}
          disabled={overlayActive}
          onActivate={onShowOverlay}
        />
      </div>

      <style jsx>{`
        .entry {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: stretch;
          position: relative;
          padding-top: 150px;
        }

        video {
          border-top-right-radius: 1rem;
          border-top-left-radius: 1rem;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 150px;
        }

        .details {
          padding: 1.5rem 1rem 1rem 1rem;
          text-align: center;
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 0.5rem;
        }

        .details + .details {
          padding-top: 0;
        }

        .label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 0.1rem;
        }

        .winRate {
          font-weight: bold;
          margin: 2px 0 2px 0;
        }

        .positive {
          color: var(--primary-accent);
        }

        .negative {
          color: var(--delete-red);
        }

        @media screen and (max-width: 1160px) {
          .details {
            padding: 1.5rem 0.5rem 0.5rem 0.5rem;
          }

          video {
            height: 75px;
          }
        }
      `}</style>
    </div>
  );
});
