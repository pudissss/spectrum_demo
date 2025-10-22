export type UserRole = "President" | "Vice President" | "HOD" | "Director" | "Lead" | "Treasurer" | "Secretary" | "Member";

export type Wing = "Alumni & IRP" | "Tech & Society" | "Academics" | "Events" | "Resolvence" | "Provision" | "Voice" | "Strategic Planning";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  wing?: Wing;
  rating?: number;
}

export interface WeeklyLog {
  id: string;
  leadId: string;
  leadName: string;
  wing: Wing;
  date: string;
  description: string;
  progress: 'On Track' | 'Delayed' | 'Completed';
}

export type GrievanceStatus = 'Submitted' | 'In Progress' | 'Resolved' | 'Closed';

export interface Grievance {
  id: string;
  submittedAt: string;
  description: string;
  status: GrievanceStatus;
  assignedTo?: string; 
}

export interface FocusRoomBooking {
  id: string;
  bookedBy: string;
  bookedByName: string;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
}

export interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Income' | 'Expense';
}

export interface Announcement {
  id: string;
  date: string;
  authorName: string;
  authorRole: UserRole;
  title: string;
  content: string;
  imageUrl?: string;
}
