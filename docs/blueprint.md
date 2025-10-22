# **App Name**: FOCUS: Student Body Management System

## Core Features:

- User Authentication and Authorization: Secure user authentication using Spring Security and JWT tokens, with role-based access control for Presidents, HODs, Directors, Leads, Treasurer, and Secretary.
- Role-Based Dashboards: Customized dashboards for each user role (President, HOD, Director, Lead, Treasurer, Secretary) displaying relevant information and actions. All users can see the star ratings given to directors.
- Weekly Log Management: Leads submit weekly logs with date, description, and progress. Directors can view all logs submitted by their Leads.
- Focus Room Booking: Users can check Focus Room availability, book it in advance with date and time, and start/stop a meeting timer. Double booking prevention is implemented.
- Public Grievance Submission: A public form allowing students to submit grievances anonymously. Grievances are routed to the Resolvence Wing director's dashboard and managed by leads.
- Analytics Dashboard: The President and HOD dashboards display analytics such as total meetings booked, total grievances, and logs submitted per wing. LLM tool will aggregate metrics on an ad hoc basis.
- Grievance Status Tracking: Resolvence Leads can view and update the status of submitted grievances.
- Star Grading System: Presidents give star ratings to Directors, which are displayed on all user dashboards alongside their wing name. Directors can also rate their wingmates.
- Treasurer Expense Tracker: Treasurer has access to an expense tracker and log to monitor and manage the treasury balance.
- Secretary Role: The Secretary has similar functionalities to the President, excluding star grading and DDL/DCL permissions.

## Style Guidelines:

- Primary color: Deep Indigo (#6666CC), evokes a sense of focus and institutional professionalism, while still leaning toward creativity.
- Background color: Very light lavender (#F0F0F8). The light tint relates it to the deep indigo of the primary color.
- Accent color: Muted Violet (#996699). Close to the primary hue on the color wheel, yet a little darker and significantly desaturated, it provides subtle contrast.
- Headline font: 'Space Grotesk', sans-serif, for headings. Body font: 'Inter', sans-serif, for main content. Code font: 'Source Code Pro'.
- Use a set of professional and modern icons for navigation and key actions. Consistent style across all sections.
- Clean and structured layout using TailwindCSS. Navbar for main navigation. Role-based dashboards with clear information hierarchy. Built with Vite React JS.
- Subtle transitions and animations for a smooth user experience. Loading animations for data fetching.