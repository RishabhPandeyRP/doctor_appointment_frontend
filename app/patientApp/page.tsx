"use client"
import React, { useState, useEffect } from 'react';
import styles from '@/styles/PatientApp.module.css';
import Cookies from 'js-cookie';
import axios from 'axios';

interface Appointments{
    id:number;
    start_time:string;
    newdate:string;
    status:string;
    doctor_name:string;
    specialty:string;

}
const PatientApp = () => {
  const [appointments, setAppointments] = useState<Appointments[]>([]);
  const [loading, setLoading] = useState(true);
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [id , setId] = useState<number | null>(null)
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
  

  useEffect(() => {
    const id = Cookies.get("userid")
    if(!id){
        return
    }
    // setId(Number(id))
    fetchAppointments(String(id));
  }, []);

  const fetchAppointments = async (id:string) => {
    setLoading(true);
    try {
      
    //   setTimeout(() => {
    //     const data = [
    //       {
    //         id: 1,
    //         title: "Dental Checkup",
    //         date: "2025-04-02",
    //         time: "10:30 AM",
    //         location: "Bright Smile Dental Clinic",
    //         status: "confirmed"
    //       },
    //       {
    //         id: 2,
    //         title: "Annual Physical",
    //         date: "2025-04-10",
    //         time: "09:00 AM",
    //         location: "City Health Hospital",
    //         status: "pending"
    //       },
    //       {
    //         id: 3,
    //         title: "Eye Examination",
    //         date: "2025-03-25",
    //         time: "02:15 PM",
    //         location: "Clear Vision Optometry",
    //         status: "cancelled"
    //       },
    //       {
    //         id: 4,
    //         title: "Therapy Session",
    //         date: "2025-04-05",
    //         time: "11:00 AM",
    //         location: "Wellness Center",
    //         status: "confirmed"
    //       }
    //     ];
    //     setAppointments(data);
    //     setLoading(false);
    //   }, 1000);

      const response =await axios.get(`${API_BASE_URL}/appointment/patient/${id}`)

      if(response.status == 200){
        console.log("response from appointment fetching")
        setAppointments(response.data)
        setLoading(false)
        return
      }


    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };

//   const handleFilterChange = (e) => {
//     setFilterStatus(e.target.value);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const getFilteredAppointments = () => {
//     return appointments.filter(appointment => {
//       const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
//       const matchesSearch = 
//         appointment.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
//         appointment.location.toLowerCase().includes(searchQuery.toLowerCase());
//       return matchesStatus && matchesSearch;
//     }).sort((a, b) => new Date(a.date) - new Date(b.date));
//   };

  const renderAppointmentsList = () => {
    // const filteredAppointments = getFilteredAppointments();
    
    if (loading) {
      return <div className={styles.loading}>Loading appointments...</div>;
    }
    
    if (appointments.length === 0) {
      return <div className={styles.noAppointments}>No appointments found</div>;
    }
    
    return appointments.map(appointment => {
      const date = new Date(appointment.newdate);
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      return (
        <div key={appointment.id} className={styles.appointmentCard}>
          <div className={styles.appointmentDate}>Dr. {appointment.doctor_name}</div>
          <div className={styles.appointmentTime}>{formattedDate} at {appointment.start_time}</div>
          <div className={styles.appointmentDetails}>
            <div className={styles.appointmentLocation}>{appointment.specialty}</div>
            <div className={`${styles.appointmentStatus} ${styles[`status${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}`]}`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Your Appointments</h1>
        {/* <button className={styles.newAppointmentBtn}>New Appointment</button> */}
      </div>
      
      <div className={styles.appointmentsContainer}>
        {/* <div className={styles.filterBar}>
          <select 
            id="filter-status" 
            className={styles.filterStatus}
            value={filterStatus}
            onChange={handleFilterChange}
          >
            <option value="all">All Appointments</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input 
            type="text" 
            className={styles.searchBox} 
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div> */}
        
        <div className={styles.appointmentsList}>
          {renderAppointmentsList()}
        </div>
      </div>
    </div>
  );
};

export default PatientApp;