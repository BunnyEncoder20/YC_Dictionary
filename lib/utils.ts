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
  if (views < 1000000) {
    const formatted = views / 1000;
    return `${formatted % 1 === 0 ? formatted.toFixed(0) : formatted.toFixed(1)}k views`;
  }
  const formatted = views / 1000000;
  return `${formatted % 1 === 0 ? formatted.toFixed(0) : formatted.toFixed(1)}M views`;
}