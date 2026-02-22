import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getPriorityNumber(
    upperBoundary: number | undefined,
    lowerBoundary = 0,
) {
    if (!upperBoundary) return lowerBoundary + 1000;
    return Math.floor((upperBoundary - lowerBoundary) / 2) + lowerBoundary;
}
