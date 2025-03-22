'use client';

import React, { useState } from 'react';
import './AppointmentBooking.css';

interface DateInfo {
    day: string;
    date: number;
    month: string;
    fullDate: Date;
}

const AppointmentBooking: React.FC = () => {
    const [appointmentType, setAppointmentType] = useState<'video' | 'physical'>('video');
    const [selectedDate, setSelectedDate] = useState<DateInfo | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [location, setLocation] = useState<string>('MedicareHeart Institute, Okhla Road');
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

    // Generate 7 days starting from today
    const generateDates = (): DateInfo[] => {
        const dates: DateInfo[] = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push({
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                date: date.getDate(),
                month: date.toLocaleDateString('en-US', { month: 'short' }),
                fullDate: date
            });
        }
        return dates;
    };

    const dates = generateDates();

    // Morning slots
    const morningSlots: string[] = [
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'
    ];

    // Afternoon slots
    const afternoonSlots: string[] = [
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '12:00 AM', '12:00 AM', '12:30 PM'
    ];

    const handleDateSelect = (date: DateInfo): void => {
        setSelectedDate(date);
        setSelectedSlot(null);
    };

    const handleSlotSelect = (slot: string): void => {
        setSelectedSlot(slot);
    };

    const handleBookAppointment = async (): Promise<void> => {
        if (!selectedDate || !selectedSlot) {
            alert('Please select a date and time slot');
            return;
        }

        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        alert(`Appointment request sent! \nType: ${appointmentType === 'video' ? 'Video Consult' : 'Hospital Visit'} \nDate: ${selectedDate.day}, ${selectedDate.date} ${selectedDate.month} \nTime: ${selectedSlot}`);

        setLoading(false);
    };

    const navigateMonth = (direction: number): void => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(newMonth.getMonth() + direction);
        setCurrentMonth(newMonth);
    };

    return (
        <div className="appointment-container">
            <h2 className="appointment-title">Schedule Appointment</h2>

            {/* Appointment Type Selection */}
            <div className="appointment-type-container">
                <button
                    className={`appointment-type-btn ${appointmentType === 'video' ? 'active' : ''}`}
                    onClick={() => setAppointmentType('video')}
                >
                    Book Video Consult
                </button>
                <button
                    className={`appointment-type-btn ${appointmentType === 'physical' ? 'active' : ''}`}
                    onClick={() => setAppointmentType('physical')}
                >
                    Book Hospital Visit
                </button>
            </div>

            {/* Location Dropdown */}
            <div className="location-dropdown">
                <button className="location-btn">
                    <span>{location}</span>
                    <svg className="dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* Date Selection */}
            <div className="date-selection">
                <div className="month-navigator">
                    <button className="nav-btn" onClick={() => navigateMonth(-1)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div className="current-month">
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                    <button className="nav-btn" onClick={() => navigateMonth(1)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="dates-carousel">
                    {dates.map((date, index) => (
                        <div
                            key={index}
                            className={`date-card ${selectedDate === date ? 'active' : ''}`}
                            onClick={() => handleDateSelect(date)}
                        >
                            <div className="day">{date.day}</div>
                            <div className="date">{date.date}</div>
                            <div className="month">{date.month}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Time Slots */}
            <div className="time-slots">
                <div className="slot-section">
                    <div className="slot-header">
                        <svg className="slot-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>Morning</span>
                        <span className="slot-count">2 Slots</span>
                    </div>
                    <div className="slot-grid">
                        {morningSlots.map((slot, index) => (
                            <button
                                key={index}
                                className={`slot-btn ${selectedSlot === slot ? 'active' : ''} ${index === 1 ? 'available' : ''}`}
                                onClick={() => index === 1 ? handleSlotSelect(slot) : null}
                                disabled={index !== 1}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="slot-section">
                    <div className="slot-header">
                        <svg className="slot-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 8V12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>Afternoon</span>
                        <span className="slot-count">3 Slots</span>
                    </div>
                    <div className="slot-grid">
                        {afternoonSlots.map((slot, index) => (
                            <button
                                key={index}
                                className={`slot-btn ${selectedSlot === slot ? 'active' : ''}`}
                                disabled={true}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Book Button */}
            <button
                className="book-btn"
                onClick={handleBookAppointment}
                disabled={!selectedDate || !selectedSlot || loading}
            >
                {loading ? 'Processing...' : 'Next'}
            </button>
        </div>
    );
};

export default AppointmentBooking;