import { useState, useEffect } from "react";
import SeasonButton from "../ui/SeasonButton";
import SeriesButton from "../ui/SeriesButton";
import { useLazyGetSeasonQuery } from "../api/movieApi";
// ⚠️ Убедись, что импорт верный

interface ISeries {
  seriesId: number;
  videoLink: string;
}

interface Props {
  movieId: number;
  seasonCount: number;
  setActiveVideoLink: (url: string) => void;
}

const SeasonSeriesGroup = ({
  movieId,
  seasonCount,
  setActiveVideoLink,
}: Props) => {
  const [activeSeason, setActiveSeason] = useState<number>(1);
  const [activeSeries, setActiveSeries] = useState<number>(1);
  const [seasonSeries, setSeasonSeries] = useState<Record<number, ISeries[]>>(
    {}
  );

  const [fetchSeason, { isLoading }] = useLazyGetSeasonQuery();

  useEffect(() => {
    loadSeason(activeSeason);
  }, [activeSeason]);

  const loadSeason = async (season: number) => {
    if (seasonSeries[season]) return;

    try {
      const result = await fetchSeason({ movieId, seasonId: season }).unwrap();
      console.log("Получили серии:", result); 

      setSeasonSeries((prev) => ({
        ...prev,
        [season]: result.series,
      }));

      if (result.series.length > 0) {
        setActiveVideoLink(result.series[0].videoLink);
        setActiveSeries(1);
      }
    } catch (error) {
      console.error("Ошибка при загрузке сезона:", error);
    }
  };

  const seasons = Array.from({ length: seasonCount }, (_, i) => i + 1);
  const filteredSeries = seasonSeries[activeSeason] || [];

  return (
    <div className="px-8 pt-4">
      {/* Сезоны */}
      <div className="flex gap-4 flex-wrap">
        {seasons.map((season) => (
          <SeasonButton
            key={season}
            season={season}
            isActive={activeSeason === season}
            onClick={() => setActiveSeason(season)}
          />
        ))}
      </div>

      {/* Серии */}
      <div className="-mx-8 px-8 border-b border-b-grayLine">
        <div className="flex gap-6 mt-4 flex-wrap">
          {isLoading && <div>Загрузка...</div>}

          {!isLoading &&
            filteredSeries.map((series, index) => (
              <SeriesButton
                key={`season-${activeSeason}-series-${index}`}
                number={index + 1}
                isActive={activeSeries === index + 1}
                onClick={() => {
                  setActiveSeries(index + 1);
                  setActiveVideoLink(series.videoLink);
                }}
              />
            ))}

          {!isLoading && filteredSeries.length === 0 && (
            <div className="text-gray-500 mt-4">
              В этом сезоне пока нет серий
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeasonSeriesGroup;
