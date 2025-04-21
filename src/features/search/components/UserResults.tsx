import UserCard from "@/features/users/components/UserCard";

interface IUser {
  id: number;
  name: string;
  email: string;
  birthDate: string;
  phone: string;
}

interface Props {
  data: IUser[];
}

const UserResults = ({ data }: Props) => {
  return (
    <div className="flex flex-wrap gap-[18px] mt-8 ml-10">
      {data.map((user) => (
        <UserCard key={user.id} data={user} />
      ))}
    </div>
  );
};

export default UserResults;
