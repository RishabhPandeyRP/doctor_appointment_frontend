"use client"
import { DoctorExtended } from "@/data/doctors.types"
import styles from "@/styles/SlotBooking.module.css"
import { useState, useEffect, useRef } from "react"

interface SlotBooking {
    doc_list: DoctorExtended[]
}

interface DateInformation {
    day: string;
    date: number;
    month: string;
    completeDate: Date
}

interface SlotInfo {
    id: number;
    date: string;
    slot: string;
    is_booked: boolean
}

const SlotBooking = ({ doc_list }: SlotBooking) => {
    const [slotType, setSlotType] = useState('physical')
    const [selDate, setSelDate] = useState<DateInformation | null>(null)
    const [selSlot, setSelSlot] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [currentMonth, setCurrMonth] = useState<Date>(new Date())
    const [availSlots, setAvailSlots] = useState<SlotInfo[]>([])
    const datesWrapperRef = useRef<HTMLDivElement>(null)

    const slotChangeHandler = () => {
        if (slotType === 'physical') {
            setSlotType('video')
            return
        }
        setSlotType('physical')
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

            setAvailSlots(updatedSlots);
            setSelSlot(null); // Reset selected slot when date changes
            console.log("available slots : ", availSlots)
        }
    }, [selDate]);

    let displayMorningSlots = availSlots.filter(slot => slot.slot.split(" ")[1] === "AM")
    let displayNoonSlots = availSlots.filter(slot => slot.slot.split(" ")[1] === "PM")


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
                completeDate: date
            });
            i++;
        }

        return dateArr;
    };

    let dates = dateGenerate()

    useEffect(()=>{
        setSelDate(dates[0])
    } ,[])

    const dateSelecthandler = (date: DateInformation) => {
        console.log("date clicked", date)
        setSelDate(date)
        setSelSlot(null)
    }

    const slotSelecthandler = (slotId: number) => {
        const selectedSlotArr = availSlots.find(slot => slot.id === slotId)

        if(selectedSlotArr && !selectedSlotArr.is_booked){
            setSelSlot(selectedSlotArr.slot)

            const updatedSlots = availSlots.map(slot => (
                slot.id === slotId ? {...slot , is_booked : true} : slot
            ))

            setAvailSlots(updatedSlots)
        }
        
    }

    const bookingHandler = async () => {
        if (!selDate || !selSlot) {
            alert("plase sel date and slot")
            return
        }

        setLoading(true)

        await new Promise(res => setTimeout(res, 1500))

        alert("appointment request sent")

        setLoading(false)
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
                    <div className={slotType === 'video' ? styles.slotActive : styles.slotType} onClick={slotChangeHandler}>Book Video Consult</div>
                    <div className={slotType === 'physical' ? styles.slotActive : styles.slotType} onClick={slotChangeHandler}>Book Hospital Visit</div>
                </div>

                {slotType == 'physical' && <div className={styles.slotLocation}>
                    location
                </div>}

                <div className={styles.slotMonth}>
                    <div className={styles.slotLeft} onClick={() => monthNavigate(-1)}></div>

                    <div>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>

                    <div className={styles.slotLeft} onClick={() => monthNavigate(1)}></div>
                </div>

                <div className={styles.datesWrapper} ref={datesWrapperRef}>
                    {
                        dates.map((date , index) => (
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
                                displayMorningSlots.map((slot , index) => (
                                    <div key={index} className={slot.is_booked ? styles.activeSlotCard : styles.slotCards}

                                    onClick={()=>!slot.is_booked &&slotSelecthandler(slot.id)}
                                    >
                                        {slot.slot}
                                    </div>
                                ))
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
                                displayNoonSlots.map((slot , index) => (
                                    <div key={index} className={slot.is_booked ? styles.activeSlotCard : styles.slotCards}

                                    onClick={()=>!slot.is_booked &&slotSelecthandler(slot.id)}>
                                        {slot.slot}
                                    </div>
                                ))
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