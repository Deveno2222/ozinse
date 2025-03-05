import { Link, useLocation } from "react-router-dom";

interface Props {
  width: string;
  fill: string;
  d: string;
  text: string;
  textColor: string;
  link: string;
}

const SidebarElement = ({ width, fill, d, text, textColor, link }: Props) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(link);
  const activeColor = "#7E2DFC";

  return (
    <Link
      className={
        "flex flex-row items-center gap-4 py-4 px-6 relative rounded-lg hover:bg-gray-100"
      }
      to={link}
    >
      {/* Active line */}
      {isActive && (
        <div
          className="absolute left-0 w-[3px] h-[32px] rounded-r-full"
          style={{ backgroundColor: activeColor }}
        />
      )}

      {/* SVG icon */}
      <svg
        width={width}
        height={width}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={d}
          fill={isActive ? activeColor : fill}
        />
      </svg>

      {/* Text (скрыт на маленьких экранах, виден на больших) */}
      <span
        className="font-bold text-dark hidden md:block"
        style={{ color: isActive ? activeColor : textColor }}
      >
        {text}
      </span>
    </Link>
  );
};

export default SidebarElement;
