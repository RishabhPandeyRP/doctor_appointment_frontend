import DocCard from "./DocCard"
import styles from "@/styles/DocList.module.css"
import React from "react"
import { Doctor } from "@/data/doctors.types"

interface DocListParams{
    onDocClick: (docId:number)=>void
    doc:Doctor[]
}
const DocList = ({onDocClick , doc} : DocListParams) => {
    return (
        <div className={styles.docListDiv}>
            {
                doc?.length > 0 ? (
                    <>
                        {
                            doc.map(doctor => (
                                <DocCard
                                key={doctor.id}
                                doc = {doctor}
                                onClick = {onDocClick}
                                ></DocCard>
                            ))
                        }
                    </>

                ):(
                    <div className={styles.noresult}>
                        <p>No doctors found</p>
                        <p>Try adjusting your filters</p>
                    </div>
                )
            }
        </div>
    )
}

export default DocList