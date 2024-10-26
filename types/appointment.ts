// types/appointment.ts
export interface AppointmentSlot {
  id: string;
  date: Date;
  timeSlot: string;
  embassyId: string;
  available: boolean;
}

export interface Embassy {
  id: string;
  name: string;
  country: string;
}

export interface Appointment {
  id: string;
  userId: string;
  slotId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}
