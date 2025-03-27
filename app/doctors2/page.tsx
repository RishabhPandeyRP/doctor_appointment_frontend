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
import Cookies from "js-cookie"
import { useRef } from "react"

const Doctors = () => {
    const router = useRouter()
    const { username, token } = useAuthContext()
    console.log("token and user from context ", username, token)
    // const [doctor , setDoctor] = useState(doc_list)
    const [doctor, setDoctor] = useState([])
    // const [filterDoc , setFilterDoc] = useState(doc_list)
    const [filterDoc, setFilterDoc] = useState([])
    const [termSearched, setTermSearched] = useState('')
    const termSearchedRef = useRef("")
    const [filter, setFilter] = useState({
        rating: [],
        experience: [],
        gender: []
    })
    const [currPage, setCurrPage] = useState(1)
    // const [docPerPage, setDocPerPage] = useState(6)
    const [loading, setLoading] = useState(false)

    const fetchDoctors = async () => {
        try {
            setLoading(true)

            

            // const response = await axios.get("http://localhost:5000/doctors", {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // })

            const response = await axios.get(`http://localhost:5000/doctors/page-doctors?page=${currPage}&limit=6`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log("doctors from fetcher : ", response.data?.docname)
            setFilterDoc(Array.isArray(response.data?.docname.doctors) ? response.data?.docname.doctors : [])
            setDoctor(Array.isArray(response.data?.docname.doctors) ? response.data?.docname.doctors : [])
            setLoading(false)
        } catch (error: any) {
            console.log("error at doctor fetching", error.message)
            setFilterDoc([])
            setDoctor([])
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!token || !username) return
        console.log("token and user in useeffect ", username, token)
        const cookieUsername = Cookies.get("username")
        console.log("this is username ", cookieUsername)
        if (!cookieUsername) {
            router.push("/login")
        }
        else {
            console.log("inside fetching consdition")
            fetchDoctors()
            // setFilterDoc()
        }
    }, [token, username , currPage])


    // const addFilter = (search_value: string = termSearched, filterVal: FilterState = filter) => {
    //     let response = [...doctor]

    //     if (filterVal.rating.length >= 1) {
    //         response = response.filter(item => filterVal.rating.includes(item.rating.toString()))
    //     }

    //     if (filterVal.gender.length >= 1) {
    //         response = response.filter(item => filterVal.gender.includes(item.gender.toString()))
    //     }

    //     if (filterVal.experience.length >= 1) {
    //         response = response.filter(item => filterVal.experience.includes(item.experience.toString()))
    //     }

    //     if (search_value) {
    //         response = response.filter(item => item.doctor_name.toLowerCase().includes(search_value.toLowerCase()) || item.specialty.toLowerCase().includes(search_value.toLowerCase()) || item.diseases.some(disease => disease.toLowerCase().includes(search_value.toLowerCase())))
    //     }

    //     setFilterDoc(response)

    //     if (currPage !== 1) {
    //         setCurrPage(1)
    //     }
    // }

    const paginatedDoc = async() => {
        try {
            const queryParams = { ...filter, search: termSearchedRef.current }
            console.log("all filters are ", queryParams)

            const url = `http://localhost:5000/doctors/page-doctors?page=1&limit=6&search=${queryParams.search}&rating[]=${queryParams.rating}&experience[]=${queryParams.experience}&gender[]=${queryParams.gender}`

            const response = await axios.get(url , {
                headers : {"Content-Type":"application/json"}
            })

            if(response.status == 200){
                console.log("data from pagination" , response.data.docname.doctors)
                setFilterDoc(response.data.docname.doctors)
            }
            console.log(url)
        } catch (error:any) {
            console.log("some error occured while pagination" , error.message)
        }

    }

    const searchHandler = (value: string) => {
        // setTermSearched(value)
        // addFilter(value, filter)

        termSearchedRef.current = value
    }

    const filterChangeHandler = (type_of_filter: keyof FilterState, value: string) => {
        const updatedFilter = { ...filter }
        //@ts-ignore
        updatedFilter[type_of_filter] = [value];
        setFilter(updatedFilter)
        // addFilter(termSearched, updatedFilter)

    }

    const filterResetHandler = () => {
        // setTermSearched('')
        termSearchedRef.current = ''
        setFilter({
            rating: [],
            experience: [],
            gender: []
        })
        setCurrPage(1)
        setFilterDoc(doctor)
    }

    const docProfile = (docId: number) => {
        router.push(`/doctors2/${docId}`)
    }

    const pageChangehandler = (page_direction: number) => {
        setCurrPage(currPage + page_direction)
    }

    // const lastDoc = currPage * docPerPage
    // const firstDoc = lastDoc - docPerPage
    // const currDoc = (filterDoc || []).slice(firstDoc, lastDoc)

    // const totalpages = Math.ceil((filterDoc?.length || 0) / docPerPage)


    return (
        <div className={styles.docDiv}>
            <main className={styles.docMain}>
                <div className={styles.docSearch}>
                    <h1 className={styles.docTitle}>
                        Find a doctor at your own ease
                    </h1>
                    <SearchBar
                        termSearched={termSearchedRef.current}
                        paginatedDoc={paginatedDoc}
                        onSearch={searchHandler}
                    ></SearchBar>
                </div>

                {loading ? <div>Please wait while we fetching doctors for you</div> : <>
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
                            <Filter filters={filter} printFilters={paginatedDoc} onFilterChange={filterChangeHandler} onFilterReset={filterResetHandler}></Filter>

                            <DocList doc={filterDoc || []} onDocClick={docProfile}></DocList>
                        </div>

                        {/* <button onClick={paginatedDoc}>print filters</button> */}

                        {/* <div>
                            {
                                totalpages > 1 && (
                                    <Pagination current_page={currPage} total_pages={totalpages} onPageChange={pageChangehandler}></Pagination>
                                )
                            }
                        </div> */}

                        
                    </div>

                    <div className={styles.pagination}>
                            <button className={styles.pageBtn} onClick={()=>pageChangehandler(-1)} disabled={currPage == 1}>prev</button>
                            <div className={styles.pageBtnValue}>{currPage}</div>
                            <button className={styles.pageBtn} onClick={()=>pageChangehandler(1)}>next</button>
                        </div>
                </>}

                

                
            </main>
        </div>
    )
}

export default Doctors