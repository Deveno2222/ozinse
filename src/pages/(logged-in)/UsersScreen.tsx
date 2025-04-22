import DropDown from "@/components/DropDown/DropDown";
import UserCard from "@/features/users/components/UserCard";

const mockUsers = [
  {
    id: 1,
    name: "Иван Иванов",
    email: "ivan@example.com",
    birthDate: "1990-01-15",
    phone: "+7 (701) 123-45-67",
  },
  {
    id: 2,
    name: "Петр Петров",
    email: "petr@example.com",
    birthDate: "1988-03-22",
    phone: "+7 (702) 234-56-78",
  },
  {
    id: 3,
    name: "Сергей Смирнов",
    email: "sergey@example.com",
    birthDate: "1995-07-11",
    phone: "+7 (707) 345-67-89",
  },
  {
    id: 4,
    name: "Анна Кузнецова",
    email: "anna@example.com",
    birthDate: "1992-10-30",
    phone: "+7 (705) 456-78-90",
  },
  {
    id: 5,
    name: "Мария Соколова",
    email: "maria@example.com",
    birthDate: "1989-06-18",
    phone: "+7 (777) 567-89-01",
  },
  {
    id: 6,
    name: "Дмитрий Орлов",
    email: "dmitriy@example.com",
    birthDate: "1993-12-25",
    phone: "+7 (708) 678-90-12",
  },
  {
    id: 7,
    name: "Елена Федорова",
    email: "elena@example.com",
    birthDate: "1991-04-09",
    phone: "+7 (776) 789-01-23",
  },
  {
    id: 8,
    name: "Алексей Васильев",
    email: "alexey@example.com",
    birthDate: "1987-08-14",
    phone: "+7 (701) 890-12-34",
  },
  {
    id: 9,
    name: "Ольга Николаева",
    email: "olga@example.com",
    birthDate: "1994-11-03",
    phone: "+7 (702) 901-23-45",
  },
  {
    id: 10,
    name: "Юрий Волков",
    email: "yuriy@example.com",
    birthDate: "1986-09-27",
    phone: "+7 (707) 012-34-56",
  },
  {
    id: 11,
    name: "Виктор Климов",
    email: "viktor@example.com",
    birthDate: "1990-05-20",
    phone: "+7 (705) 123-45-67",
  },
  {
    id: 12,
    name: "Татьяна Миронова",
    email: "tatyana@example.com",
    birthDate: "1993-02-17",
    phone: "+7 (777) 234-56-78",
  },
  {
    id: 13,
    name: "Николай Егоров",
    email: "nikolay@example.com",
    birthDate: "1989-07-08",
    phone: "+7 (708) 345-67-89",
  },
  {
    id: 14,
    name: "Светлана Белова",
    email: "svetlana@example.com",
    birthDate: "1991-01-05",
    phone: "+7 (776) 456-78-90",
  },
  {
    id: 15,
    name: "Кирилл Максимов",
    email: "kirill@example.com",
    birthDate: "1995-10-13",
    phone: "+7 (701) 567-89-01",
  },
  {
    id: 16,
    name: "Наталья Григорьева",
    email: "natalya@example.com",
    birthDate: "1992-06-02",
    phone: "+7 (702) 678-90-12",
  },
  {
    id: 17,
    name: "Артем Захаров",
    email: "artem@example.com",
    birthDate: "1994-03-28",
    phone: "+7 (707) 789-01-23",
  },
  {
    id: 18,
    name: "Екатерина Лебедева",
    email: "ekaterina@example.com",
    birthDate: "1990-12-19",
    phone: "+7 (705) 890-12-34",
  },
  {
    id: 19,
    name: "Владимир Баранов",
    email: "vladimir@example.com",
    birthDate: "1988-11-07",
    phone: "+7 (777) 901-23-45",
  },
  {
    id: 20,
    name: "Ирина Мельникова",
    email: "irina@example.com",
    birthDate: "1996-04-01",
    phone: "+7 (708) 012-34-56",
  },
];

const UsersScreen = () => {
  return (
    <div className="min-h-screen bg-[#8F92A10D] rounded-tl-3xl py-10 px-12 overflow-hidden">
      <div className="flex items-baseline gap-2">
        <h2 className="text-dark text-[22px] font-bold">Пользователи</h2>
        <span className="text-[#171717CC] text-sm font-bold">142</span>
      </div>
      <div className="max-w-[293px] my-10">
        <DropDown
          label={"Сортировать"}
          buttonText="Click"
          content={["По дате регистрации", "По имени"]}
          onChange={function (val: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[18px]">
        {mockUsers.map((user) => (
          <UserCard key={user.id} data={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersScreen;
