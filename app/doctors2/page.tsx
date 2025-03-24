"use client"
import SearchBar from "@/components/SearchBar"
import Filter from "@/components/Filter"
import DocList from "@/components/DocList"
import Pagination from "@/components/Pagination"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import doc_list from "@/data/doctors.json"
import { FilterState } from "@/data/doctors.types"
import styles from "@/styles/DoctorSearch2.module.css"
import { useAuthContext } from "@/context/AppContext"
import axios from "axios"

const Doctors = ()=>{
    const router = useRouter()
    const {username , token} = useAuthContext()
    // const [doctor , setDoctor] = useState(doc_list)
    const [doctor , setDoctor] = useState([])
    // const [filterDoc , setFilterDoc] = useState(doc_list)
    const [filterDoc , setFilterDoc] = useState([])
    const [termSearched , setTermSearched] = useState('')
    const [filter , setFilter] = useState({
        rating : [],
        experience : [],
        gender : []
    })
    const [currPage , setCurrPage] = useState(1)
    const [docPerPage , setDocPerPage] = useState(6)

    const fetchDoctors = async()=>{
        try {
            const response = await axios.get("http://localhost:5000/doctors" , {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log("doctors : " , response.data?.docname)
            setFilterDoc(Array.isArray(response.data?.docname) ? response.data?.docname : [])
            setDoctor(Array.isArray(response.data?.docname) ? response.data?.docname : [])
        } catch (error:any) {
            console.log("error at doctor fetching" , error.message)
            setFilterDoc([])
            setDoctor([])
        }
    }

    useEffect(()=>{
        if(!username){
            router.push("/login")
        }
        else{
            fetchDoctors()
            // setFilterDoc()
        }
    },[])

    

    const addFilter = (search_value:string = termSearched ,filterVal: FilterState = filter )=>{
        let response = [...doctor]

        if(filterVal.rating.length >= 1){
            response = response.filter(item => filterVal.rating.includes(item.rating.toString()))
        }

        if(filterVal.gender.length >= 1){
            response = response.filter(item => filterVal.gender.includes(item.gender.toString()))
        }

        if(filterVal.experience.length >= 1){
            response = response.filter(item => filterVal.experience.includes(item.experience.toString()))
        }

        if(search_value){
            response = response.filter(item => item.doctor_name.toLowerCase().includes(search_value.toLowerCase()) || item.specialty.toLowerCase().includes(search_value.toLowerCase()) || item.diseases.some(disease => disease.toLowerCase().includes(search_value.toLowerCase())))
        }

        setFilterDoc(response)

        if(currPage !== 1){
            setCurrPage(1)
        }
    }

    const searchHandler = (value:string)=>{
        setTermSearched(value)
        addFilter(value , filter)
    }

    const filterChangeHandler = (type_of_filter : keyof FilterState , value:string)=>{
        const updatedFilter = {...filter}
        //@ts-ignore
        updatedFilter[type_of_filter] = [value];
        setFilter(updatedFilter)
        addFilter(termSearched, updatedFilter)

    }

    const filterResetHandler = ()=>{
        setTermSearched('')
        setFilter({
            rating : [],
            experience:[],
            gender:[]
        })
        setCurrPage(1)
        setFilterDoc(doctor)
    }

    const docProfile = (docId:number)=>{
        router.push(`/doctors2/${docId}`)
    }

    const pageChangehandler = (page_num:number)=>{
        setCurrPage(page_num)
    }

    const lastDoc = currPage * docPerPage
    const firstDoc = lastDoc - docPerPage
    const currDoc = (filterDoc || []).slice(firstDoc , lastDoc)

    const totalpages = Math.ceil((filterDoc?.length || 0) / docPerPage)


    return(
        <div className={styles.docDiv}>
            <main className={styles.docMain}>
                <div className={styles.docSearch}>
                    <h1 className={styles.docTitle}>
                        Find a doctor at your own ease
                    </h1>
                    <SearchBar
                    termSearched={termSearched}
                    onSearch={searchHandler}
                    ></SearchBar>
                </div>

                <div className={styles.docContent}>
                    <div className={styles.docTitleAvail}>
                        {filterDoc.length} doctors available
                    </div>

                    <div className={styles.docDesc}>
                        Book appointment with minimum wait time & verified doctor details
                    </div>
                </div>

                <div className={styles.docContentSection}>
                    <div className={styles.docContentSectionInner}>
                        <Filter filters={filter} onFilterChange={filterChangeHandler} onFilterReset={filterResetHandler}></Filter>

                        <DocList doc={currDoc || []} onDocClick={docProfile}></DocList>
                    </div>

                    <div>
                        {
                            totalpages > 1 && (
                                <Pagination current_page={currPage} total_pages={totalpages} onPageChange={pageChangehandler}></Pagination>
                            )
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Doctors