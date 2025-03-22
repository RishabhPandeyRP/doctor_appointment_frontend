// src/app/doctors/[id]/page.tsx
import { notFound } from 'next/navigation';
import styles from '@/styles/DoctorProfile.module.css';
import initialDoctors from '@/data/doctors.json';
import { Doctor } from '@/data/doctors.types';
import BookingForm from "@/components/BookingForm";

// Use TypeScript to define props for this page component
type DoctorProfilePageProps = {
    params: {
        id: string;
    };
};

// This is a Server Component
export default function DoctorProfilePage({ params }: DoctorProfilePageProps) {
    // Find the doctor with the matching ID
    const doctor = initialDoctors.find(
        (doc) => doc.id.toString() === params.id
    );

    // If no doctor is found, return a 404
    if (!doctor) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.profileHeader}>
                    <div className={styles.profileHeaderContent}>
                        <h1 className={styles.heading}>Doctor Profile</h1>
                        <p className={styles.subheading}>View detailed information and book an appointment</p>
                    </div>
                </div>

                <div className={styles.profileContent}>
                    <div className={styles.profileCard}>
                        <div className={styles.profileImageSection}>
                            <div className={styles.profileImage}>
                                {/* Here you would add the actual doctor image */}
                            </div>
                            <div className={styles.rating}>
                                <span className={styles.ratingText}>Rating</span>
                                <div className={styles.stars}>
                                    {Array(doctor.rating).fill('★').join('')}
                                    {Array(5 - doctor.rating).fill('☆').join('')}
                                </div>
                            </div>
                        </div>

                        <div className={styles.profileInfo}>
                            <h2 className={styles.doctorName}>{doctor.name}</h2>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Specialization:</span>
                                <span className={styles.infoValue}>{doctor.specialization}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Experience:</span>
                                <span className={styles.infoValue}>{doctor.experience}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Gender:</span>
                                <span className={styles.infoValue}>{doctor.gender.charAt(0).toUpperCase() + doctor.gender.slice(1)}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Treats:</span>
                                <div className={styles.diseasesTags}>
                                    {doctor.diseases.map((disease, index) => (
                                        <span key={index} className={styles.diseaseTag}>
                                            {disease}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>About:</span>
                                <p className={styles.aboutText}>
                                    Dr. {doctor.name} is a highly skilled {doctor.specialization} with {doctor.experience} of experience.
                                    They specialize in treating {doctor.diseases.join(', ')}.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.bookingSection}>
                        <button className={styles.bookingTitle}>Book an Appointment</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Generate static paths for all doctors
export async function generateStaticParams() {
    return initialDoctors.map((doctor) => ({
        id: doctor.id.toString(),
    }));
}