// // src/components/BookingForm.tsx
// 'use client';

// import { useState } from 'react';
// import styles from '@/styles/BookingForm.module.css';

// type BookingFormProps = {
//   doctorId: number;
//   doctorName: string;
// };

// export default function BookingForm({ doctorId, doctorName }: BookingFormProps) {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     date: '',
//     time: '',
//     reason: '',
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Here you would normally send the data to your API
//     console.log('Booking form submitted:', { doctorId, ...formData });
//     setSubmitted(true);
//   };

//   if (submitted) {
//     return (
//       <div className={styles.success}>
//         <h3>Appointment Booked!</h3>
//         <p>Thank you for booking an appointment with Dr. {doctorName}.</p>
//         <p>We have sent a confirmation to your email.</p>
//         <button 
//           onClick={() => setSubmitted(false)} 
//           className={styles.newBookingButton}
//         >
//           Book Another Appointment
//         </button>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className={styles.form}>
//       <div className={styles.formGroup}>
//         <label htmlFor="name" className={styles.label}>Full Name</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           className={styles.input}
//           required
//         />
//       </div>

//       <div className={styles.formRow}>
//         <div className={styles.formGroup}>
//           <label htmlFor="email" className={styles.label}>Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={styles.input}
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="phone" className={styles.label}>Phone</label>
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className={styles.input}
//             required
//           />
//         </div>
//       </div>

//       <div className={styles.formRow}>
//         <div className={styles.formGroup}>
//           <label htmlFor="date" className={styles.label}>Date</label>
//           <input
//             type="date"
//             id="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             className={styles.input}
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="time" className={styles.label}>Time</label>
//           <select
//             id="time"
//             name="time"
//             value={formData.time}
//             onChange={handleChange}
//             className={styles.input}
//             required
//           >
//             <option value="">Select a time</option>
//             <option value="09:00">09:00 AM</option>
//             <option value="10:00">10:00 AM</option>
//             <option value="11:00">11:00 AM</option>
//             <option value="12:00">12:00 PM</option>
//             <option value="14:00">02:00 PM</option>
//             <option value="15:00">03:00 PM</option>
//             <option value="16:00">04:00 PM</option>
//             <option value="17:00">05:00 PM</option>
//           </select>
//         </div>
//       </div>

//       <div className={styles.formGroup}>
//         <label htmlFor="reason" className={styles.label}>Reason for Visit</label>
//         <textarea
//           id="reason"
//           name="reason"
//           value={formData.reason}
//           onChange={handleChange}
//           className={styles.textarea}
//           rows={4}
//           required
//         />
//       </div>

//       <button type="submit" className={styles.submitButton}>
//         Book Appointment
//       </button>
//     </form>
//   );
// }