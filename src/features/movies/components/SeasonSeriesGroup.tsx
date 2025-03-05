// SeasonSeriesGroup.tsx
import { useState, useMemo } from "react";
import SeasonButton from "../ui/SeasonButton"
import SeriesButton from "../ui/SeriesButton";

interface SeriesData {
  number: number;
  season: number;
}

const SeasonSeriesGroup = () => {
  const [activeSeason, setActiveSeason] = useState<number>(1);
  const [activeSeries, setActiveSeries] = useState<number>(1);
  
  // Данные серий (можно вынести в props или получать из API)
  const [series] = useState<SeriesData[]>([
    { number: 1, season: 1 },
    { number: 2, season: 1 },
    { number: 1, season: 2 },
    { number: 2, season: 2 },
    { number: 3, season: 2 },
    { number: 4, season: 2 },
  ]);

  // Автоматическое определение доступных сезонов
  const seasons = useMemo(
    () => Array.from(new Set(series.map(s => s.season))),
    [series]
  );

  // Фильтрация серий по выбранному сезону
  const filteredSeries = useMemo(
    () => series.filter(s => s.season === activeSeason),
    [series, activeSeason]
  );

  return (
    <div className="px-8 pt-4">
      {/* Секция выбора сезона */}
      <div className="flex gap-4 flex-wrap">
        {seasons.map(season => (
          <SeasonButton
            key={season}
            season={season}
            isActive={activeSeason === season}
            onClick={() => {
              setActiveSeason(season);
              setActiveSeries(1); // Сброс выбранной серии при смене сезона
            }}
          />
        ))}
      </div>

      {/* Секция выбора серии */}
      <div className="-mx-8 px-8 border-b border-b-grayLine">
        <div className="flex gap-6 mt-4 flex-wrap">
          {filteredSeries.map(series => (
            <SeriesButton
              key={`s${series.season}-e${series.number}`}
              number={series.number}
              isActive={activeSeries === series.number}
              onClick={() => setActiveSeries(series.number)}
            />
          ))}
          
          {filteredSeries.length === 0 && (
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