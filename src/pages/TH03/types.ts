export interface Employee {
id: string;
name: string;
maxPerDay: number;
workingHours: {
    day: number; // 0-6
    start: string;
    end: string;
}[];
}

export interface Service {
id: string;
name: string;
price: number;
duration: number;
}

export type Status = "pending" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
id: string;
customer: string;
employeeId: string;
serviceId: string;
date: string;
start: string;
end: string;
status: Status;
}

export interface Review {
id: string;
appointmentId: string;
employeeId: string;
rating: number;
comment: string;
reply?: string;
}