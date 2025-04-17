import MovieBreadCrumb from "@/features/movies/components/MovieBreadCrumb";
import MovieForm from "@/features/movies/components/MovieForm";
import { Stepper } from "@mui/material";
import { FormProvider } from "node_modules/react-hook-form/dist/useFormContext";
import { useState } from "react";

const EditScreen = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };
  return (
    <FormProvider>
      <div className="min-h-screen bg-[#8F92A10D] max-w-[872px] rounded-3xl p-8">
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ bgcolor: "background.paper", p: 4, borderRadius: 4 }}>
          <div className="flex items-center gap-4 mb-8">
            <div
              className="flex items-center bg-[#8F92A11A] rounded-md justify-center p-[5px] cursor-pointer"
              onClick={handleBack}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.9407 9.16692V10.8336H6.25051L8.95258 13.5357L7.7741 14.7142L3.06006 10.0002L7.7741 5.28613L8.95258 6.46464L6.25032 9.16692H16.9407Z"
                  fill="#171717"
                />
              </svg>
            </div>
            <p className="text-dark font-bold text-[22px]">
              {steps[activeStep]}
            </p>
          </div>
          {activeStep === 0 && <MainInfoForm handleNext={handleNext} />}
          {activeStep === 1 && (
            <SeasonsInfoForm handleNext={handleNext} handleBack={handleBack} />
          )}
          {activeStep === 2 && <MediaInfoForm handleBack={handleBack} />}
        </Box>
      </div>
    </FormProvider>
    // <div className="min-h-screen bg-[#8F92A10D] max-w-[872px] rounded-3xl">
    //   <MovieBreadCrumb page="Редактировать проект" />
    //   <div className="px-6">
    //     {/* <MovieForm
    //       movie={{
    //         name: "Интерстеллар",
    //         category: ["action", "comedy"],
    //         typeProject: "film",
    //         age: ["childs"],
    //         year: "2014",
    //         dur: "169",
    //         keyWords: "космос, черные дыры, путешествия во времени",
    //         description:
    //           "Фильм о путешествии группы астронавтов через червоточину...",
    //         director: "Кристофер Нолан",
    //         scripter: "Джонатан Нолан",
    //         seasons: 2,
    //         episodes: [
    //           { id: "1", season: 1, episode: "https://www.youtube.com/watch?v=lX_4tYu1DxA&ab_channel=CSGOCHILL" },
    //           { id: "2", season: 1, episode: "https://www.youtube.com/watch?v=lX_4tYu1DxA&ab_channel=CSGOCHILL" },
    //           { id: "3", season: 2, episode: "https://www.youtube.com/watch?v=lX_4tYu1DxA&ab_channel=CSGOCHILL" },
    //           { id: "4", season: 2, episode: "https://www.youtube.com/watch?v=lX_4tYu1DxA&ab_channel=CSGOCHILL" },
    //           { id: "5", season: 2, episode: "https://www.youtube.com/watch?v=lX_4tYu1DxA&ab_channel=CSGOCHILL" },
    //           { id: "6", season: 2, episode: "https://www.youtube.com/watch?v=lX_4tYu1DxA&ab_channel=CSGOCHILL" },
    //         ],
    //         coverImage: new File([""], "cover.jpg", { type: "image/jpeg" }),
    //         screenshots: [
    //           new File([""], "screen1.jpg", { type: "image/jpeg" }),
    //           new File([""], "screen2.jpg", { type: "image/jpeg" }),
    //         ],
    //       }}
    //     /> */}
    //   </div>
    // </div>
  );
};

export default EditScreen;
