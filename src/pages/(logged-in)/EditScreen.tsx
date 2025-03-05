import MovieBreadCrumb from "@/features/movies/components/MovieBreadCrumb";
import MovieForm from "@/features/movies/components/MovieForm";

const EditScreen = () => {
  return (
    <div className="min-h-screen bg-[#8F92A10D] max-w-[872px] rounded-3xl">
      <MovieBreadCrumb page="Редактировать проект" />
      <div className="px-6">
        <MovieForm
          movie={{
            name: "Интерстеллар",
            category: ["action", "comedy"],
            typeProject: "film",
            age: ["childs"],
            year: "2014",
            dur: "169",
            keyWords: "космос, черные дыры, путешествия во времени",
            description:
              "Фильм о путешествии группы астронавтов через червоточину...",
            director: "Кристофер Нолан",
            scripter: "Джонатан Нолан",
            seasons: 2,
            episodes: [
              { id: "1", season: 1, episode: "https://www.youtube.com/watch?v=lX_4tYu1DxA&ab_channel=CSGOCHILL" },
              { id: "2", season: 1, episode: "https://www.youtube.com/watch?v=lX_4tYu1DxA&ab_channel=CSGOCHILL" },
              { id: "3", season: 2, episode: "https://www.youtube.com/watch?v=lX_4tYu1DxA&ab_channel=CSGOCHILL" },
              { id: "4", season: 2, episode: "https://www.youtube.com/watch?v=lX_4tYu1DxA&ab_channel=CSGOCHILL" },
              { id: "5", season: 2, episode: "https://www.youtube.com/watch?v=lX_4tYu1DxA&ab_channel=CSGOCHILL" },
              { id: "6", season: 2, episode: "https://www.youtube.com/watch?v=lX_4tYu1DxA&ab_channel=CSGOCHILL" },
            ],
            coverImage: new File([""], "cover.jpg", { type: "image/jpeg" }),
            screenshots: [
              new File([""], "screen1.jpg", { type: "image/jpeg" }),
              new File([""], "screen2.jpg", { type: "image/jpeg" }),
            ],
          }}
        />
      </div>
    </div>
  );
};

export default EditScreen;
