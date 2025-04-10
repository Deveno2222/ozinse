import { useState, useMemo } from "react";
import SeasonButton from "../ui/SeasonButton";
import SeriesButton from "../ui/SeriesButton";

// типы (можно вынести в отдельный файл)
interface ISeries {
  seriesId: number;
  videoLink: string;
}

interface IMovie {
  movieId: number;
  seasonId: number;
  seasonCount: number;
  series: ISeries[];
}

interface Props {
  movie: IMovie;
  setActiveVideoLink: (url: string) => void;
}

const SeasonSeriesGroup = ({ movie, setActiveVideoLink }: Props) => {
  const [activeSeason, setActiveSeason] = useState<number>(1);
  const [activeSeries, setActiveSeries] = useState<number>(1);

  const seasons = useMemo(() => {
    return Array.from({ length: movie.seasonCount }, (_, i) => i + 1);
  }, [movie.seasonCount]);

  const seriesPerSeason = useMemo(() => {
    const result: Record<number, ISeries[]> = {};
    const countPerSeason = Math.ceil(movie.series.length / movie.seasonCount);

    movie.series.forEach((s, index) => {
      const season = Math.floor(index / countPerSeason) + 1;
      if (!result[season]) result[season] = [];
      result[season].push(s);
    });

    return result;
  }, [movie]);

  const filteredSeries = useMemo(() => {
    return seriesPerSeason[activeSeason] || [];
  }, [seriesPerSeason, activeSeason]);

  return (
    <div className="px-8 pt-4">
      {/* Сезоны */}
      <div className="flex gap-4 flex-wrap">
        {seasons.map((season) => (
          <SeasonButton
            key={season}
            season={season}
            isActive={activeSeason === season}
            onClick={() => {
              setActiveSeason(season);
              setActiveSeries(1);
              const firstSeries = seriesPerSeason[season]?.[0];
              if (firstSeries) {
                setActiveVideoLink(firstSeries.videoLink); // Устанавливаем видео по первой серии сезона
              }
            }}
          />
        ))}
      </div>

      {/* Серии */}
      <div className="-mx-8 px-8 border-b border-b-grayLine">
        <div className="flex gap-6 mt-4 flex-wrap">
          {filteredSeries.map((series, index) => (
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
