import { Calendar } from '@/components/ui/calendar';
import { useState, useEffect } from 'react';
import { AppointmentSlot, Embassy } from '@/types/appointment';

interface AppointmentCalendarProps {
  embassyId: string;
}

export function AppointmentCalendar({ embassyId }: AppointmentCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [availableSlots, setAvailableSlots] = useState<AppointmentSlot[]>([]);
  const [embassy, setEmbassy] = useState<Embassy | null>(null);

  useEffect(() => {
    // Fetch embassy details
    const fetchEmbassy = async () => {
      // Implement API call to fetch embassy details
      // setEmbassy(fetchedEmbassy);
    };
    fetchEmbassy();
  }, [embassyId]);

  useEffect(() => {
    if (selectedDate) {
      // Fetch available slots for the selected date
      const fetchAvailableSlots = async () => {
        // Implement API call to fetch available slots
        // setAvailableSlots(fetchedSlots);
      };
      fetchAvailableSlots();
    }
  }, [selectedDate, embassyId]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setAvailableSlots([]);
  };

  return (
    <div>
      <h2>{embassy?.name} Appointment Booking</h2>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
      />
      {selectedDate && (
        <div>
          <h3>Available Slots for {selectedDate.toDateString()}</h3>
          {availableSlots.length > 0 ? (
            <ul>
              {availableSlots.map((slot) => (
                <li key={slot.id}>{slot.timeSlot}</li>
              ))}
            </ul>
          ) : (
            <p>No available slots for this date.</p>
          )}
        </div>
      )}
    </div>
  );
}
