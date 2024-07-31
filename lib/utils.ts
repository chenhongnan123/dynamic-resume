import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const editDriver = driver({
  steps: [
    {
      element: '.home-button',
      popover: {
        title: 'Back to home',
        description: 'Back to the home page to view exmple profile',
        side: "left",
        align: 'start',
      },
    },
    {
      element: '.preview-button',
      popover: {
        title: 'Preview your profile',
        description: 'Preview your profile to see how it looks',
        side: "left",
        align: 'start',
      },
    },
  ]
});

export const loginDriver = driver({
  steps: [
    {
      element: '#login-link',
      popover: {
        title: 'Generate your own profile',
        description: 'Login to create your own profile and start building your portfolio',
        side: "left",
        align: 'start',
      },
    },
  ]
});


