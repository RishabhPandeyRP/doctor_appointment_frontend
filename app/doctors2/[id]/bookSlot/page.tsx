import React from "react"
import styles from "@/styles/BookingSlot.module.css"
import doc_list from "@/data/doctors.json"
import SlotBooking from "@/components/SlotBooking"

const Booking = async ({ params }: { params: { id: string } }) => {
    const id = params?.id
    console.log("id from the booking page", id)
    return (
        <div className={styles.slotDiv}>
            <div className={styles.slotLeft}>
                <div className={styles.leftTitle}>
                    Book Your Next Doctor Visit in Seconds.
                </div>
                <div className={styles.leftDesc}>
                    CareMate helps you find the best healthcare provider by specialty, location, and more, ensuring you get the care you need.
                </div>
            </div>

            <div className={styles.slotRight}>
                <SlotBooking doc_list={doc_list} id={id}></SlotBooking>
            </div>
        </div>
    )
}

export default Booking