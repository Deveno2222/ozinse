import { useState, useEffect } from "react";
import { Button, Grid, TextField, Box, Typography } from "@mui/material";
import isEqual from "lodash/isEqual";

import { useFormContext } from "../../contexts/FormContext";
import CustomButton from "@/components/CustomButton";
import { Loader2, Trash2 } from "lucide-react";
import React from "react";
import { useAddEpisodeVideoLinkMutation } from "@/features/movies/api/movieApi";

interface EpisodeData {
  movieId: number;
  seasonId: number;
  seriesId: number;
  link: string;
}

interface Season {
  season: number;
  episodes: string[];
}

interface SeasonsInfoFormProps {
  handleNext: () => void;
  handleBack: () => void;
}

export default function SeasonsInfoForm({ handleNext }: SeasonsInfoFormProps) {
  const { formData, updateFormData, isEditMode, initialData, resetForm } =
    useFormContext();

  const [addVideo] = useAddEpisodeVideoLinkMutation();

  const initialSeasonCount = initialData?.episodes?.length || 0;
  const [initialSeasons, setInitialSeasons] = useState<Season[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [seasons, setSeasons] = useState<Season[]>(() => {
    const savedSeasons: Season[] = [];
    for (let i = 0; i < (formData.seasons || 0); i++) {
      const seasonNumber = i + 1;
      const episodes = (formData.episodes || [])
        .filter((ep: EpisodeData) => ep.seasonId === seasonNumber)
        .map((ep: EpisodeData) => ep.link);
      savedSeasons.push({
        season: seasonNumber,
        episodes: episodes.length > 0 ? episodes : [""],
      });
    }
    return savedSeasons;
  });

  useEffect(() => {
    const episodes: EpisodeData[] = seasons.flatMap((season, seasonIndex) =>
      season.episodes
        .filter((ep) => ep.trim() !== "")
        .map((episode, episodeIndex) => ({
          movieId: 0,
          seasonId: seasonIndex + 1,
          seriesId: episodeIndex + 1,
          link: episode,
        }))
    );

    updateFormData({ episodes });
  }, [seasons]);

  useEffect(() => {
    if (isEditMode && initialData?.episodes) {
      const convertedSeasons = convertEpisodesToSeasons(initialData.episodes);
      setInitialSeasons(convertedSeasons);
    }
  }, [initialData, isEditMode]);

  const convertEpisodesToSeasons = (episodes: EpisodeData[]): Season[] => {
    const seasonsMap: Record<number, string[]> = {};
    episodes.forEach((ep) => {
      if (!seasonsMap[ep.seasonId]) {
        seasonsMap[ep.seasonId] = [];
      }
      seasonsMap[ep.seasonId].push(ep.link);
    });
    return Object.keys(seasonsMap).map((seasonId) => ({
      season: parseInt(seasonId),
      episodes: seasonsMap[parseInt(seasonId)],
    }));
  };

  const hasChanges = !isEqual(seasons, initialSeasons);

  const handleSeasonChange = (value: number) => {
    // Запрещаю уменьшение количество сезонов
    if (isEditMode && value < initialSeasonCount) return;

    const newSeasons: Season[] = [];
    for (let i = 0; i < value; i++) {
      const seasonNumber = i + 1;
      const existingSeason = seasons.find((s) => s.season === seasonNumber);
      newSeasons.push({
        season: seasonNumber,
        episodes: existingSeason?.episodes || [""],
      });
    }
    setSeasons(newSeasons);
    updateFormData({ seasons: value });
  };

  const handleEpisodeChange = (
    seasonIndex: number,
    episodeIndex: number,
    value: string
  ) => {
    const newSeasons = [...seasons];
    newSeasons[seasonIndex].episodes[episodeIndex] = value;
    setSeasons(newSeasons);
  };

  const addEpisode = (seasonIndex: number) => {
    const newSeasons = [...seasons];
    newSeasons[seasonIndex].episodes.push("");
    setSeasons(newSeasons);
  };

  const removeEpisode = (seasonIndex: number, episodeIndex: number) => {
    const newSeasons = [...seasons];
    newSeasons[seasonIndex].episodes.splice(episodeIndex, 1);
    setSeasons(newSeasons);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const episodes: EpisodeData[] = seasons.flatMap((season, seasonIndex) =>
        season.episodes
          .filter((ep) => ep.trim() !== "")
          .map((episode, episodeIndex) => ({
            movieId: 0,
            seasonId: seasonIndex + 1,
            seriesId: episodeIndex + 1,
            link: episode,
          }))
      );

      updateFormData({ episodes });

      if (isEditMode && initialData?.movieId) {
        const movieId = initialData.movieId;

        const newEpisodes = episodes.filter(
          (newEp) =>
            !initialData.episodes.some(
              (oldEp) =>
                oldEp.seasonId === newEp.seasonId &&
                oldEp.seriesId === newEp.seriesId
            )
        );

        for (const episode of newEpisodes) {
          const episodeFormData = new FormData();
          episodeFormData.append("link", episode.link);
          await addVideo({
            movieId,
            seasonId: episode.seasonId,
            seriesId: episode.seriesId,
            formData: episodeFormData,
          }).unwrap();
        }
      }
    } catch (error) {
      console.error("Ошибка при добавлении серий: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFieldDisabled = (seasonIndex: number, episodeIndex: number) => {
    if (!isEditMode) return false;

    const initialEpisodes = initialData?.episodes || [];

    return initialEpisodes.some(
      (ep) =>
        ep.seasonId === seasonIndex + 1 && ep.seriesId === episodeIndex + 1
    );
  };

  const hasEmptyFields = seasons.some((season) =>
    season.episodes.some((ep) => ep.trim() === "")
  );

  const isEpisodeRemovable = (seasonIndex: number, episodeIndex: number) => {
    if (!isEditMode) return true;

    const initialEpisodes = initialData?.episodes || [];

    const isInitial = initialEpisodes.some(
      (ep) =>
        ep.seasonId === seasonIndex + 1 && ep.seriesId === episodeIndex + 1
    );

    return !isInitial;
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
            fullWidth
            label="Количество сезонов"
            type="number"
            value={formData.seasons || 0}
            onChange={(e) => handleSeasonChange(Number(e.target.value))}
            inputProps={{ min: 1 }}
            required
          />
        </Grid>

        {seasons.map((season, seasonIndex) => (
          <React.Fragment key={`season-${season.season}`}>
            <Grid item xs={12} key={season.season}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Сезон {season.season}
              </Typography>

              {season.episodes.map((episode, episodeIndex) => (
                <Box
                  key={episodeIndex}
                  sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}
                >
                  <TextField
                    disabled={isFieldDisabled(seasonIndex, episodeIndex)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                    fullWidth
                    label={`Серия ${episodeIndex + 1} / YouTube Video ID`}
                    value={episode}
                    onChange={(e) =>
                      handleEpisodeChange(
                        seasonIndex,
                        episodeIndex,
                        e.target.value
                      )
                    }
                    required
                  />

                  {episodeIndex > 0 &&
                    isEpisodeRemovable(seasonIndex, episodeIndex) && (
                      <div
                        className="flex items-center justify-center hover:bg-grayLine p-2 w-12 h-12 rounded-2xl transition-colors ease-in-out cursor-pointer"
                        onClick={() => removeEpisode(seasonIndex, episodeIndex)}
                      >
                        <Trash2 size={16} />
                      </div>
                    )}
                </Box>
              ))}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mt: 1,
                  mb: 0,
                }}
              >
                <Button
                  onClick={() => addEpisode(seasonIndex)}
                  sx={{
                    color: "primary.main",
                    textTransform: "none",
                    fontSize: "14px",
                    "&:hover": {
                      backgroundColor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Добавить серию
                </Button>
              </Box>
            </Grid>
            {seasonIndex < seasons.length - 1 && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    height: "1px",
                    backgroundColor: "#8F92A11A",
                  }}
                />
              </Grid>
            )}
          </React.Fragment>
        ))}

        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "end", mt: 3, gap: 1 }}
        >
          {isEditMode ? (
            <CustomButton
              className="w-[134px]"
              type="submit"
              disabled={
                isEditMode
                  ? !hasChanges || isLoading || hasEmptyFields
                  : isLoading
              }
            >
              {isLoading && <Loader2 className="animate-spin w-6 h-6" />}
              Сохранить
            </CustomButton>
          ) : (
            <CustomButton
              className="w-[134px]"
              onClick={handleNext}
              disabled={hasEmptyFields}
            >
              Далее
            </CustomButton>
          )}
          <CustomButton
            className="w-[134px] bg-[#8F92A11A] text-dark hover:bg-[#3535361a]"
            onClick={resetForm}
          >
            Отмена
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
}
