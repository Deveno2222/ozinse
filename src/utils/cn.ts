import { clsx } from "clsx";  // Можно заменить на classnames
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
