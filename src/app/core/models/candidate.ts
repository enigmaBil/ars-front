export interface Candidate {
    id: number;
    name: string;
    email: string;
    phone: string;
    file: File; // CV file
    jobId: number; // ID of the job offer applied for
    experienceYears: number; // Years of experience
    educationLevel: string; // Education level (e.g., Bachelor's, Master's)
}