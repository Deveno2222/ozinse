import { useState } from "react";
import { useFormContext } from "../../contexts/FormContext";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useGetCategoriesQuery } from "@/features/categories/api/categoryApi";
import { useGetGenresQuery } from "@/features/genre/api/genreApi";
import { useGetAgesQuery } from "@/features/age/api/ageApi";
import CustomButton from "@/components/CustomButton";
import { useUpdateMovieMutation } from "@/features/movies/api/movieApi";
import { Loader2 } from "lucide-react";

interface Props {
  handleNext: () => void;
}

const MainInfoForm = ({ handleNext }: Props) => {
  const { formData, updateFormData, resetForm, isEditMode, initialData } =
    useFormContext();

  const [updateMovie] = useUpdateMovieMutation();

  const [loading, setLoading] = useState<boolean>(false);

  const { data: categories } = useGetCategoriesQuery();
  const { data: types } = useGetGenresQuery();
  const { data: ages } = useGetAgesQuery();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (isEditMode && initialData?.movieId) {
        const movieId = initialData?.movieId;
        // Текстовая инфа
        const patchFormData = new FormData();

        patchFormData.append("title", formData.name);
        patchFormData.append("description", formData.description);
        patchFormData.append("releaseYear", formData.year);
        patchFormData.append("duration", formData.dur);
        patchFormData.append("director", formData.director);
        patchFormData.append("producer", formData.scripter);
        patchFormData.append("keyWords", formData.keyWords || "");

        if (formData.age.length > 0) {
          patchFormData.append(
            "ageCategoryId",
            formData.age.map((a) => a.ageCategoryId).join(",")
          );
        }

        if (formData.category.length > 0) {
          patchFormData.append(
            "categoryId",
            formData.category.map((c) => c.categoryId).join(",")
          );
        }

        if (formData.typeProject.length > 0) {
          patchFormData.append(
            "genreId",
            formData.typeProject.map((g) => g.genreId).join(",")
          );
        }

        await updateMovie({
          movieId: movieId,
          formData: patchFormData,
        }).unwrap();

        console.log("Данные успешно обновлены");
      }
    } catch (error) {
      console.error("Ошибка при обновлении текстовых данных: ", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.name &&
    formData.category.length > 0 &&
    formData.typeProject.length > 0 &&
    formData.age.length > 0 &&
    formData.year &&
    formData.dur &&
    formData.keyWords &&
    formData.description &&
    formData.director &&
    formData.scripter;

  return (
    <Grid container spacing={2} component="form">
      <Grid item xs={12}>
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
          fullWidth
          label="Название проекта"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          required
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Категория</InputLabel>
          <Select
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",

                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "1px",
                  borderRadius: "12px",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "12px",
                borderWidth: "1px",
              },
            }}
            multiple
            value={formData.category.map((c) => c.categoryId)}
            input={<OutlinedInput label="Категория" />}
            onChange={(e) => {
              const selectedIds = e.target.value as number[];
              const selectedCategories = categories?.filter((cat) =>
                selectedIds.includes(cat.categoryId)
              );

              updateFormData({ category: selectedCategories });
            }}
            renderValue={(selected) => (
              <div>
                {(selected as number[])
                  .map((id) => {
                    const category = categories?.find(
                      (c) => c.categoryId === id
                    );
                    return category?.name;
                  })
                  .join(", ")}
              </div>
            )}
          >
            {categories?.map((cat) => (
              <MenuItem key={cat.categoryId} value={cat.categoryId}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Тип проекта</InputLabel>
          <Select
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "1px",
                  borderRadius: "12px",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "12px",
                borderWidth: "1px",
              },
            }}
            multiple
            value={formData.typeProject.map((genre) => genre.genreId)}
            input={<OutlinedInput label="Тип проекта" />}
            onChange={(e) => {
              const selectedIds = e.target.value as number[];
              const selectedGenres =
                types?.filter((i) => selectedIds.includes(i.genreId)) || [];

              updateFormData({ typeProject: selectedGenres });
            }}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {(selected as number[])
                  .map((id) => {
                    const genre = types?.find((c) => c.genreId === id);
                    return genre?.name;
                  })
                  .filter(Boolean)
                  .join(", ")}
              </Box>
            )}
          >
            {types?.map((type) => (
              <MenuItem key={type.genreId} value={type.genreId}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Возрастной рейтинг</InputLabel>
          <Select
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "1px",
                  borderRadius: "12px",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "12px",
                borderWidth: "1px",
              },
            }}
            multiple
            value={formData.age.map((i) => i.ageCategoryId)}
            input={<OutlinedInput label="Возрастной рейтинг" />}
            onChange={(e) => {
              const selectedIds = e.target.value as number[];
              const selectedAges =
                ages?.filter((i) => selectedIds.includes(i.ageCategoryId)) ||
                [];

              updateFormData({ age: selectedAges });
            }}
            renderValue={(selected) => (
              <div>
                {(selected as number[])
                  .map((id) => {
                    const age = ages?.find((c) => c.ageCategoryId === id);
                    return age?.name;
                  })
                  .join(", ")}
              </div>
            )}
          >
            {ages?.map((age) => (
              <MenuItem key={age.ageCategoryId} value={age.ageCategoryId}>
                {age.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
          fullWidth
          label="Год выпуска"
          type="number"
          value={formData.year}
          onChange={(e) => updateFormData({ year: e.target.value })}
          required
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
          fullWidth
          label="Длительность (мин)"
          type="number"
          value={formData.dur}
          onChange={(e) => updateFormData({ dur: e.target.value })}
          required
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
          fullWidth
          label="Ключевые слова"
          value={formData.keyWords}
          onChange={(e) => updateFormData({ keyWords: e.target.value })}
          required
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
          fullWidth
          multiline
          rows={5}
          label="Описание"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          required
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
          fullWidth
          label="Режиссер"
          value={formData.director}
          onChange={(e) => updateFormData({ director: e.target.value })}
          required
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
          fullWidth
          label="Сценарист"
          value={formData.scripter}
          onChange={(e) => updateFormData({ scripter: e.target.value })}
          required
        />
      </Grid>

      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "flex-end" }}
        className="gap-2"
      >
        {isEditMode ? (
          <CustomButton
            className="w-[134px]"
            disabled={!isFormValid}
            onClick={() => handleSubmit()}
          >
            {loading && <Loader2 className="animate-spin w-6 h-6" />} Сохранить
          </CustomButton>
        ) : (
          <CustomButton
            className="w-[134px]"
            disabled={!isFormValid}
            onClick={handleNext}
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
  );
};

export default MainInfoForm;
