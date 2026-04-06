import { Appointment, Review } from "../types";

export function calcEnd(start: string, duration: number) {
const [h, m] = start.split(":").map(Number);
const total = h * 60 + m + duration;
const hh = Math.floor(total / 60);
const mm = total % 60;
return `${hh.toString().padStart(2, "0")}:${mm
    .toString()
    .padStart(2, "0")}`;
}

export function isConflict(newApp: Appointment, apps: Appointment[]) {
return apps.some(a =>
    a.employeeId === newApp.employeeId &&
    a.date === newApp.date &&
    !(newApp.end <= a.start || newApp.start >= a.end)
);
}

export function isOverLimit(
employeeId: string,
date: string,
apps: Appointment[],
max: number
) {
const count = apps.filter(
    a => a.employeeId === employeeId && a.date === date
).length;
return count >= max;
}

export function avgRating(employeeId: string, reviews: Review[]) {
const list = reviews.filter(r => r.employeeId === employeeId);
if (list.length === 0) return 0;
return (
    list.reduce((sum, r) => sum + r.rating, 0) / list.length
);
}