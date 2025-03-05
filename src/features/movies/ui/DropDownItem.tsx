import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";
import dropDown from "../../../assets/dropdown.svg"

interface Props {
  triggerLabel: string;
  items: {
    label: string;
    value: string;
  }[];
}

const DropDownItem = ({ triggerLabel, items }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="flex items-center gap-2 bg-[#8F92A10D] shadow-none text-[#B1B1B8] px-3 py-2 rounded-2xl h-10 hover:bg-[#EDEDEF] transition"
        >
          <span className="text-[#8F92A1]">{triggerLabel}:</span>
          <span className="text-dark font-bold">{items[0].label}</span>
          <img src={dropDown} alt="Сортировать" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {items.map((item) => (
          <DropdownMenuItem key={item.value}>{item.label}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownItem;
