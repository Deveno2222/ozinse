import { useMemo, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useFormContext } from "../../contexts/FormContext";
import {
  useAddEpisodeVideoLinkMutation,
  useAddImagesMutation,
  useCreateMovieMutation,
  useGetMoviesQuery,
} from "@/features/movies/api/movieApi";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "@/features/movies/ui/ImageUploader";
import MultipleImageUploader from "@/features/movies/ui/MultipleImageUploader";
import CustomButton from "@/components/CustomButton";

export default function MediaInfoForm({
  openModal,
}: {
  handleBack: () => void;
  openModal: () => void;
  closeModal: () => void;
}) {
  const { formData, updateFormData, isEditMode, initialData, resetForm } =
    useFormContext();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { data: movies, refetch } = useGetMoviesQuery({});
  const [createMovie] = useCreateMovieMutation();
  const [addVideo] = useAddEpisodeVideoLinkMutation();
  const [addImage] = useAddImagesMutation();

  const handleCoverChange = (file: File | null) => {
    updateFormData({ coverImage: file });
  };

  const handleScreenshotsChange = (files: (File | string)[]) => {
    updateFormData({
      screenshots: files as File[],
    });
  };

  const isMediaChanged = useMemo(() => {
    if (!isEditMode || !initialData) return false;

    // Проверка изменения обложки
    const isCoverChanged =
      formData.coverImage instanceof File ||
      (typeof formData.coverImage === "string" &&
        formData.coverImage !== initialData.coverImage);

    // Проверка изменения скриншотов
    const hasScreenshotChanges =
      (formData.screenshots?.length || 0) !==
        (initialData.screenshots?.length || 0) ||
      formData.screenshots?.some((f) => f instanceof File);

    return isCoverChanged || hasScreenshotChanges;
  }, [formData.coverImage, formData.screenshots, initialData, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode && initialData?.movieId) {
        const movieId = initialData?.movieId;
        // Изображения
        const imagesFormData = new FormData();

        if (formData.coverImage) {
          if (formData.coverImage instanceof File) {
            imagesFormData.append("image", formData.coverImage);
          } else if (typeof formData.coverImage === "string") {
            // Если это URL из initialData - преобразуем в Blob
            const blob = await fetch(formData.coverImage)
              .then((r) => r.blob())
              .catch(() => null);
            if (blob) {
              imagesFormData.append("image", blob, "cover.jpg");
            }
          }
        }

        const newFiles = (formData.screenshots || []).filter(
          (file): file is File => file instanceof File
        );
        newFiles.forEach((file) => {
          imagesFormData.append("screenshots", file);
        });

        if (imagesFormData.entries().next().value) {
          await addImage({
            movieId: movieId,
            formData: imagesFormData,
          }).unwrap();
        }

        navigate(`/project/movie/${movieId}?refresh=${Date.now()}`);
      } else {
        const completeFormData = new FormData();
        completeFormData.append("title", formData.name);
        completeFormData.append("description", formData.description);
        completeFormData.append("releaseYear", formData.year);
        completeFormData.append("duration", formData.dur);
        completeFormData.append("director", formData.director);
        completeFormData.append("producer", formData.scripter);
        completeFormData.append("keyWords", formData.keyWords || "");

        if (formData.age.length > 0) {
          completeFormData.append(
            "ageCategoryId",
            formData.age.map((a) => a.ageCategoryId).join(",")
          );
        }

        if (formData.category.length > 0) {
          completeFormData.append(
            "categoryId",
            formData.category.map((c) => c.categoryId).join(",")
          );
        }

        if (formData.typeProject.length > 0) {
          completeFormData.append(
            "genreId",
            formData.typeProject.map((g) => g.genreId).join(",")
          );
        }

        const response = await createMovie(completeFormData).unwrap();

        if (response.result === true) {
          await new Promise((resolve) => setTimeout(resolve, 500));

          const updatedMovies = await refetch();

          const moviesList = updatedMovies.data?.data || [];

          await new Promise((resolve) => setTimeout(resolve, 300));

          const sortedMovies = [...moviesList].sort(
            (a, b) => b.movieId - a.movieId
          );

          const movieId = sortedMovies[0]?.movieId || null;

          if (formData.episodes.length > 0 && movieId !== null) {
            for (const episode of formData.episodes) {
              const episodeFormData = new FormData();
              episodeFormData.append("link", episode.link);

              try {
                await addVideo({
                  movieId: movieId,
                  seasonId: episode.seasonId,
                  seriesId: episode.seriesId,
                  formData: episodeFormData,
                });
              } catch (error) {
                console.error("Ошибка при добавлении серии", error);
              }
            }
          }

          if (movieId) {
            const imagesFormData = new FormData();

            if (formData.coverImage instanceof File) {
              imagesFormData.append("image", formData.coverImage);
            }

            formData.screenshots?.forEach((file) => {
              imagesFormData.append("screenshots", file);
            });

            if (
              imagesFormData.has("image") ||
              imagesFormData.has("screenshots")
            ) {
              await addImage({
                movieId: movieId,
                formData: imagesFormData,
              }).unwrap();
              console.log("Изображения успешно загружены");
            }
          }
          openModal();
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: "22px",
            fontWeight: "700",
          }}
          variant="h5"
          gutterBottom
        >
          Обложка
        </Typography>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "400",
            mb: 2,
          }}
          variant="caption"
        >
          Рекомендуется использовать картинки размером не менее 375×550px
        </Typography>
        <ImageUploader
          value={formData.coverImage}
          onChange={handleCoverChange}
        />
      </Grid>
      <Box
        sx={{
          height: "1px",
          width: "100%",
          backgroundColor: "#8F92A133", // или другой цвет
          my: 2,
          mx: 3,
        }}
      />

      <Grid item xs={12}>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: "22px",
            fontWeight: "700",
          }}
          variant="h5"
          gutterBottom
        >
          Скриншоты
        </Typography>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "400",
            mb: 2,
          }}
          variant="caption"
        >
          Рекомендуется использовать картинки размером не менее 400×226px
        </Typography>
        <MultipleImageUploader
          values={formData.screenshots || []}
          onChange={handleScreenshotsChange}
          maxFiles={10}
        />
      </Grid>

      <Grid item xs={12} sx={{ display: "flex", justifyContent: "end", mt: 3 }}>
        <div className="flex gap-2">
          <CustomButton
            type="submit"
            className="w-[134px]"
            disabled={loading || (isEditMode && !isMediaChanged)}
          >
            {loading && <Loader2 className="animate-spin w-6 h-6" />}{" "}
            {isEditMode ? "Сохранить" : "Добавить"}
          </CustomButton>

          <CustomButton
            className="w-[134px] bg-[#8F92A11A] text-dark hover:bg-[#3535361a]"
            onClick={resetForm}
          >
            Отмена
          </CustomButton>
        </div>
      </Grid>
    </Grid>
  );
}
