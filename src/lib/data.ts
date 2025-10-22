import { User, Wing, WeeklyLog, Grievance, FocusRoomBooking, Expense, UserRole } from './types';

export const WINGS: Wing[] = [
  "Alumni & IRP",
  "Tech & Society",
  "Academics",
  "Events",
  "Resolvence",
  "Provision",
  "Voice",
  "Strategic Planning",
];

const users: User[] = [
  { id: 'user-pres', name: 'Alex Thompson', email: 'president@focus.com', role: 'President' },
  { id: 'user-hod', name: 'Ben Carter', email: 'hod@focus.com', role: 'HOD' },
  { id: 'user-sec', name: 'Catherine Doe', email: 'secretary@focus.com', role: 'Secretary' },
  { id: 'user-tres', name: 'David Lee', email: 'treasurer@focus.com', role: 'Treasurer' },

  { id: 'dir-res', name: 'Rachel Green', email: 'rachel.g@focus.com', role: 'Director', wing: 'Resolvence', rating: 4 },
  { id: 'lead-res-1', name: 'Monica Geller', email: 'monica.g@focus.com', role: 'Lead', wing: 'Resolvence', rating: 5 },
  { id: 'lead-res-2', name: 'Phoebe Buffay', email: 'phoebe.b@focus.com', role: 'Lead', wing: 'Resolvence', rating: 4 },

  { id: 'dir-tech', name: 'Ross Geller', email: 'ross.g@focus.com', role: 'Director', wing: 'Tech & Society', rating: 5 },
  { id: 'lead-tech-1', name: 'Chandler Bing', email: 'chandler.b@focus.com', role: 'Lead', wing: 'Tech & Society', rating: 5 },
  { id: 'lead-tech-2', name: 'Joey Tribbiani', email: 'joey.t@focus.com', role: 'Lead', wing: 'Tech & Society', rating: 3 },

  { id: 'dir-events', name: 'Eleanor Vance', email: 'eleanor.v@focus.com', role: 'Director', wing: 'Events', rating: 4.5 },
  { id: 'lead-events-1', name: 'Frank Wright', email: 'frank.w@focus.com', role: 'Lead', wing: 'Events', rating: 4 },
  
  { id: 'user-member', name: 'Grace Hall', email: 'grace.h@focus.com', role: 'Member', wing: 'Academics'},
];

export const ALL_USERS: User[] = users;

const weeklyLogs: WeeklyLog[] = [
  { id: 'log-1', leadId: 'lead-res-1', leadName: 'Monica Geller', wing: 'Resolvence', date: '2024-07-22', description: 'Handled 5 new grievances, resolved 3.', progress: 'On Track' },
  { id: 'log-2', leadId: 'lead-res-2', leadName: 'Phoebe Buffay', wing: 'Resolvence', date: '2024-07-22', description: 'Followed up on pending cases.', progress: 'On Track' },
  { id: 'log-3', leadId: 'lead-tech-1', leadName: 'Chandler Bing', wing: 'Tech & Society', date: '2024-07-21', description: 'Website maintenance completed.', progress: 'Completed' },
  { id: 'log-4', leadId: 'lead-tech-2', leadName: 'Joey Tribbiani', wing: 'Tech & Society', date: '2024-07-20', description: 'Planning for next tech workshop.', progress: 'Delayed' },
  { id: 'log-5', leadId: 'lead-events-1', leadName: 'Frank Wright', wing: 'Events', date: '2024-07-23', description: 'Finalized venue for the annual fest.', progress: 'On Track' },
];

export const ALL_LOGS: WeeklyLog[] = weeklyLogs;

const grievances: Grievance[] = [
  { id: 'grv-1', submittedAt: '2024-07-20T10:00:00Z', description: 'Wi-Fi issues in the library.', status: 'Resolved', assignedTo: 'lead-res-1' },
  { id: 'grv-2', submittedAt: '2024-07-21T11:30:00Z', description: 'Cafeteria food quality has degraded.', status: 'In Progress', assignedTo: 'lead-res-2' },
  { id: 'grv-3', submittedAt: '2024-07-22T09:00:00Z', description: 'Not enough seating in the common area.', status: 'Submitted' },
  { id: 'grv-4', submittedAt: '2024-07-23T14:00:00Z', description: 'Broken projector in room 201.', status: 'In Progress', assignedTo: 'lead-res-1' },
];

export const ALL_GRIEVANCES: Grievance[] = grievances;

const today = new Date();
const formatDate = (date: Date) => date.toISOString().split('T')[0];

const bookings: FocusRoomBooking[] = [
  { id: 'book-1', bookedBy: 'dir-tech', bookedByName: 'Ross Geller', date: formatDate(today), startTime: '10:00', endTime: '11:00', title: 'Tech Wing Sync' },
  { id: 'book-2', bookedBy: 'dir-res', bookedByName: 'Rachel Green', date: formatDate(today), startTime: '14:00', endTime: '15:30', title: 'Grievance Review' },
  { id: 'book-3', bookedBy: 'user-pres', bookedByName: 'Alex Thompson', date: formatDate(new Date(today.getTime() + 86400000)), startTime: '11:00', endTime: '12:00', title: 'HOD Meeting' },
];

export const ALL_BOOKINGS: FocusRoomBooking[] = bookings;

const expenses: Expense[] = [
    { id: 'exp-1', date: '2024-07-01', description: 'Initial budget allocation', amount: 50000, type: 'Income' },
    { id: 'exp-2', date: '2024-07-05', description: 'Workshop materials', amount: 2500, type: 'Expense' },
    { id: 'exp-3', date: '2024-07-10', description: 'Event banner printing', amount: 1200, type: 'Expense' },
    { id: 'exp-4', date: '2024-07-15', description: 'Sponsorship from TechCorp', amount: 10000, type: 'Income' },
    { id: 'exp-5', date: '2024-07-20', description: 'Catering for seminar', amount: 5000, type: 'Expense' },
];

export const ALL_EXPENSES: Expense[] = expenses;
