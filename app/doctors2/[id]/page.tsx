import styles from "@/styles/DocProfile.module.css"
import React from "react"
// import doc_list from "@/data/doctors.json"
import { notFound } from "next/navigation"
// import { Doctor } from "@/data/doctors.types"
import { redirect } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { cookies } from "next/headers"


export default async function DocProfile({ params }: { params: { id?: string } }) {
    const Cookie = await cookies()
    const token = Cookie.get("token")?.value;

    const id = params?.id

    if(!token || !id){
        return notFound()
    }

    const response  = await axios.get(`http://localhost:5000/doctors/${id}`, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

    console.log("response from profile is " , response.data.docname)

    const bookingNavigate = () => {
        redirect(`/doctors2/${id}/bookSlot`)
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
                        <div className={styles.profileRatingStars}>{Array(response.data.docname.rating).fill('★').join('')}
                            {Array(5 - response.data.docname.rating).fill('☆').join('')}</div>
                    </div>
                </div>

                <div className={styles.profileContentRight}>
                    <div className={styles.profileName}>{response.data.docname.doctor_name}</div>

                    <div className={styles.profileData}>
                        <div className={styles.profileDataKeys}>
                            <div>Specialization :</div>
                            <div>Experience :</div>
                            <div>Gender :</div>
                            <div>Treats :</div>
                            <div className={styles.about}>About :</div>
                        </div>

                        <div className={styles.profileDataValues}>
                            <div>{response.data.docname.specialty}</div>
                            <div>{response.data.docname.experience}</div>
                            <div>{response.data.docname.gender}</div>
                            <div className={styles.profileDiseases}>
                                {response.data.docname.diseases.map((disease:string , index:number) => (
                                    <div className={styles.profileDiseasesCard} key={index}>{disease}</div>
                                ))}
                            </div>
                            <div>{response.data.docname.doctor_name} is a highly skilled {response.data.docname.specialty} with {response.data.docname.experience}  of experience. They specialize in treating {response.data.docname.diseases.map((disease:string) => disease)}</div>
                        </div>
                    </div>
                </div>
            </div>

            <Link href={`/doctors2/${id}/bookSlot`}>
                <button className={styles.profileBtn}>Book an Appointment</button>
            </Link>


        </div>
    )
}
