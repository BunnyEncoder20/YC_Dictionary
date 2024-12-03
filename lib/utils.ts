import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function formatViews(views: number): string {
  if (views === 1) {
    return "1 view";
  } 
  if (views < 1000) {
    return `${views} views`;
  } 

  let flag = false

  if (views < 1000000) {
    const scaled = (views / 1000) * 10;             // Scale to get the first decimal place as an integer
    if (Math.floor(scaled) % 10 === 0) flag = true; // Check if the first decimal is 0
    const formatted = views / 1000;
    return `${flag ? formatted.toFixed(0) : formatted.toFixed(1)}k views`
  }

  const scaled = (views / 1000000) * 10;            // Scale for millions
  if (Math.floor(scaled) % 10 === 0) flag = true;   // Check if the first decimal is 0
  const formatted = views / 1000000;
  return `${flag ? formatted.toFixed(0) : formatted.toFixed(1)}M views`;
}