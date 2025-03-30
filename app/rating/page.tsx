'use client';
import { useState } from 'react';
import styles from '@/styles/Rating.module.css';

export default function Rating() {
  const [rating, setRating] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
//   const [doctorName, setDoctorName] = useState('');

  const handleRating = (value:number) => {
    setRating(value);
  };

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      setSubmitted(true);
      // Here you would typically send the data to your backend
      console.log({ rating });
    }
  };

//   const resetForm = () => {
//     setRating(0);
//     setSubmitted(false);
//     setDoctorName('');
//   };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Doctor Rating</h1>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* <div className={styles.inputGroup}>
              <label htmlFor="doctorName" className={styles.label}>Doctor Name</label>
              <input
                type="text"
                id="doctorName"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className={styles.input}
                required
              />
            </div> */}
            
            <div className={styles.ratingContainer}>
              <p className={styles.label}>Rate your experience (1-5):</p>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleRating(value)}
                    className={`${styles.star} ${rating >= value ? styles.active : ''}`}
                    aria-label={`Rate ${value} out of 5`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              type="submit" 
              className={styles.button}
              disabled={rating === 0}
            >
              Submit Rating
            </button>
          </form>
        ) : (
          <div className={styles.thankYou}>
            <h2>Thank You!</h2>
            <p>You rated {rating} out of 5 stars.</p>
            {/* <button onClick={resetForm} className={styles.button}>
              Rate Another Doctor
            </button> */}
          </div>
        )}
      </div>
    </main>
  );
}