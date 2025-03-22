import styles from "@/styles/DocProfile.module.css"
import React from "react"
import doc_list from "@/data/doctors.json"
import { notFound } from "next/navigation"
import { Doctor } from "@/data/doctors.types"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function DocProfile({ params }: { params: { id: string } }) {
    function getDocById(): Doctor {
        let doc = doc_list.find(doc => doc.id.toString() === params.id.toString())

        if (!doc) {
            throw new Error("No doctor found")
        }

        return doc
    }

    let doc: Doctor = getDocById()
    if (!doc) return notFound()

    console.log(doc)

    const bookingNavigate = () => {
        redirect(`/doctors2/${params.id}/bookSlot`)
    }

    return (
        <div className={styles.profileDiv}>
            <div className={styles.profileHeader}>
                <div className={styles.profileTitle}>
                    Doctor Profile
                </div>
                <div className={styles.profileDesc}>
                    View detailed information and book an appointment
                </div>
            </div>

            <div className={styles.profileContent}>
                <div className={styles.profileContentLeft}>
                    <div className={styles.profileImg}>

                    </div>
                    <div className={styles.profileRatingBox}>
                        <div className={styles.profileRatingTitle}>Rating</div>
                        <div className={styles.profileRatingStars}>{Array(doc.rating).fill('★').join('')}
                            {Array(5 - doc.rating).fill('☆').join('')}</div>
                    </div>
                </div>

                <div className={styles.profileContentRight}>
                    <div className={styles.profileName}>{doc.name}</div>

                    <div className={styles.profileData}>
                        <div className={styles.profileDataKeys}>
                            <div>Specialization :</div>
                            <div>Experience :</div>
                            <div>Gender :</div>
                            <div>Treats :</div>
                            <div className={styles.about}>About :</div>
                        </div>

                        <div className={styles.profileDataValues}>
                            <div>{doc.specialization}</div>
                            <div>{doc.experience}</div>
                            <div>{doc.gender}</div>
                            <div className={styles.profileDiseases}>
                                {doc.diseases.map((disease , index) => (
                                    <div className={styles.profileDiseasesCard} key={index}>{disease}</div>
                                ))}
                            </div>
                            <div>{doc.name} is a highly skilled {doc.specialization} with {doc.experience}  of experience. They specialize in treating {doc.diseases.map(disease => disease)}</div>
                        </div>
                    </div>
                </div>
            </div>

            <Link href={`/doctors2/${params.id}/bookSlot`}>
                <button className={styles.profileBtn}>Book an Appointment</button>
            </Link>


        </div>
    )
}
