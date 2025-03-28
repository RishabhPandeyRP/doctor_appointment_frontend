"use client"
import { DoctorExtended } from "@/data/doctors.types"
import styles from "@/styles/SlotBooking.module.css"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useAuthContext } from "@/context/AppContext"

interface SlotBooking {
    doc_list: DoctorExtended[],
    id: string
}

interface DateInformation {
    day: string;
    date: number;
    month: string;
    completeDate: Date;
    stringFormat: string

}

interface SlotInfo {
    slotId:number;
    id: number;
    date: string;
    slot: string;
    is_booked: boolean;
    start_time: string;
    end_time:string;
    is_available:boolean;
}

const SlotBooking = ({ doc_list, id }: SlotBooking) => {
    const { token, userId } = useAuthContext()
    const [slotType, setSlotType] = useState('online')
    const [selDate, setSelDate] = useState<DateInformation | null>(null)
    const [selSlot, setSelSlot] = useState<SlotInfo | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [currentMonth, setCurrMonth] = useState<Date>(new Date())
    const [availSlots, setAvailSlots] = useState<SlotInfo[]>([])
    const datesWrapperRef = useRef<HTMLDivElement>(null)

    const slotChangeHandler = () => {
        if (slotType === 'online') {
            setSlotType('offline')
            return
        }
        setSlotType('online')
    }

    const morning = [
        { id: 101, slot: '9:00 AM', is_booked: false },
        { id: 102, slot: '9:30 AM', is_booked: false },
        { id: 103, slot: '10:00 AM', is_booked: false },
        { id: 104, slot: '10:30 AM', is_booked: false },
        { id: 105, slot: '11:00 AM', is_booked: false },
        { id: 106, slot: '11:30 AM', is_booked: false }
    ];

    const noon = [
        { id: 201, slot: '12:00 PM', is_booked: false },
        { id: 202, slot: '12:30 PM', is_booked: false },
        { id: 203, slot: '1:00 PM', is_booked: false }
    ];

    useEffect(() => {
        if (selDate) {
            const formattedDate = selDate.completeDate.toISOString().split('T')[0];

            // Combine morning and noon slots with the selected date
            const updatedSlots = [...morning, ...noon].map(slot => ({
                ...slot,
                date: formattedDate
            }));

            setAvailSlots(updatedSlots as SlotInfo[]);
            setSelSlot(null); // Reset selected slot when date changes
            console.log("available slots : ", availSlots)
        }
    }, [selDate]);




    const dateGenerate = () => {

        const today = new Date();
        const dateArr = [];

        let i = 0;

        while (i < 15) {
            let date = new Date(today);
            date.setDate(i + today.getDate());
            dateArr.push({
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                date: date.getDate(),
                month: date.toLocaleDateString('en-US', { month: 'short' }),
                completeDate: date,
                stringFormat: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
            });
            i++;
        }

        return dateArr;
    };

    let dates = dateGenerate()

    useEffect(() => {
        setSelDate(dates[0])
    }, [])

    const dateSelecthandler = async (date: DateInformation) => {
        console.log("date clicked", date)
        setSelDate(date)
        setSelSlot(null)
        try {
            const response = await axios.get(`http://localhost:5000/slots/${id}/${date.stringFormat}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("date data from response ", response.data)
            setAvailSlots(response.data)
        } catch (error) {
            console.log("some error occured while fetching slots data")
        }
    }

    const getAMPM = (time: string) => {
        const hour = parseInt(time?.split(":")[0], 10)
        return hour < 12 ? "AM" : "PM"
    }

    console.log("availSlots ", availSlots)

    let displayMorningSlots = availSlots.filter(slot => getAMPM(slot.start_time) === "AM")
    let displayNoonSlots = availSlots.filter(slot => getAMPM(slot.start_time) === "PM")

    const slotSelecthandler = (slotId: number) => {
        const selectedSlotArr = availSlots.find(slot => slot.id === slotId)
        if (selSlot == null) {

            if (selectedSlotArr && selectedSlotArr.is_available) {
                const date = new Date(selectedSlotArr.date).toISOString().slice(0, 10)
                setSelSlot({ start_time: selectedSlotArr.start_time, slotId: selectedSlotArr.id, date: date, end_time: selectedSlotArr.end_time } as SlotInfo)

                const updatedSlots = availSlots.map(slot => (
                    slot.id === slotId ? { ...slot, is_available: false } : slot
                ))

                setAvailSlots(updatedSlots)
            }
        }
        else if (selectedSlotArr && selectedSlotArr.start_time == selSlot.start_time) {
            setSelSlot(null)

            const updatedSlots = availSlots.map(slot => (
                slot.id === slotId ? { ...slot, is_available: true } : slot
            ))

            setAvailSlots(updatedSlots)
        }
        else {
            alert("slot already selected")
        }

    }

    const bookingHandler = async () => {

        try {
            if (!selDate || !selSlot) {
                alert("plase sel date and slot")
                return
            }

            const payload = {
                "doctor_id": Number(id),
                "patient_id": Number(userId),
                "doctor_slot_id": Number(selSlot.slotId),
                "appointment_date": selSlot.date,
                "start_time": selSlot.start_time,
                "end_time": selSlot.end_time,
                "type": slotType,
                "patient_details": { "age": 25, "gender": "male", "problem": "Headache" }
            }

            setLoading(true)

            // await new Promise(res => setTimeout(res, 1500))

            console.log("this is payload ", payload)

            const response = await axios.post("http://localhost:5000/appointment/book", payload, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } })

            console.log("response after booking is done ", response.data)



            alert(`appointment request sent ${selSlot.start_time} ${selSlot.slotId} ${selSlot.date}`)

            setLoading(false)
        } catch (error: any) {
            console.log("error while booking the slot : ", error.message)
            setLoading(false)
        }

    }

    const monthNavigate = (direction: number) => {
        const updateMonth = new Date(currentMonth)

        updateMonth.setMonth(updateMonth.getMonth() + direction)
        setCurrMonth(updateMonth)

        if (datesWrapperRef.current) {
            datesWrapperRef.current.scrollLeft = 0;
        }
    }



    return (
        <div className={styles.slotDiv}>
            <div className={styles.slotForm}>
                <div className={styles.slotHeader}>
                    <div className={styles.slotHeaderTitle}>
                        Schedule Appointment
                    </div>
                    {/* <div>
                        <button>
                            Book Appointment
                        </button>
                    </div> */}
                </div>

                <div className={styles.slotTypeBox}>
                    <div className={slotType === 'online' ? styles.slotActive : styles.slotType} onClick={slotChangeHandler}>Book Video Consult</div>
                    <div className={slotType === 'offline' ? styles.slotActive : styles.slotType} onClick={slotChangeHandler}>Book Hospital Visit</div>
                </div>

                {slotType == 'offline' && <div className={styles.slotLocation}>
                    location
                </div>}

                <div className={styles.slotMonth}>
                    <div className={styles.slotLeft} onClick={() => monthNavigate(-1)}></div>

                    <div>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>

                    <div className={styles.slotLeft} onClick={() => monthNavigate(1)}></div>
                </div>

                <div className={styles.datesWrapper} ref={datesWrapperRef}>
                    {
                        dates.map((date, index) => (
                            <div key={index} onClick={() => dateSelecthandler(date)} className={`${styles.dateCard} ${selDate && selDate.date === date.date && selDate.month === date.month ? styles.active : ''}`}>
                                <div className={styles.day}>{date.day}</div>
                                <div className={styles.date}>{date.date}</div>
                                <div className={styles.month}>{date.month}</div>
                            </div>
                        ))
                    }
                </div>

                <div className={styles.slotCardSuperWrapper}>

                    <div className={styles.slotCardWrapper}>
                        <div>
                            <div className={styles.morning}>
                                Morning
                            </div>
                            <div>

                            </div>
                        </div>

                        <div className={styles.slotCardsBox}>
                            {
                                displayMorningSlots.length != 0 ? displayMorningSlots.map((slot, index) => (
                                    <div key={index} className={!slot.is_available ? styles.activeSlotCard : styles.slotCards}

                                        onClick={() => slotSelecthandler(slot.id)}
                                    >
                                        {slot.start_time}
                                    </div>
                                )) : <div>No slots available</div>
                            }

                        </div>
                    </div>

                    <div className={styles.slotCardWrapper}>
                        <div>
                            <div className={styles.noon}>
                                Afternoon
                            </div>
                            <div>

                            </div>
                        </div>

                        <div className={styles.slotCardsBox}>
                            {
                                displayNoonSlots.length != 0 ? displayNoonSlots.map((slot, index) => (
                                    <div key={index} className={!slot.is_available ? styles.activeSlotCard : styles.slotCards}

                                        onClick={() => slot.is_available && selSlot == null && slotSelecthandler(slot.id)}>
                                        {slot.start_time}
                                    </div>
                                )) : <div>No slots available</div>
                            }
                        </div>


                    </div>
                </div>

                <button className={styles.bookBtn} onClick={bookingHandler} disabled={loading}>
                    {
                        loading ? 'Proccessing ...' : 'Book Appointment'
                    }
                </button>
            </div>
        </div>
    )
}

export default SlotBooking