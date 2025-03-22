import React from "react"
import styles from "@/styles/Searchbar.module.css"

interface Searchparams{
    termSearched : string
    onSearch : (value : string)=> void
}

const SearchBar = ({termSearched , onSearch} : Searchparams)=>{

    const searchChangeHandler = (e : React.ChangeEvent<HTMLInputElement>)=>{
        onSearch(e.target.value)
    }

    return(
        <div className={styles.searchDiv}>
            <div className={styles.searchContent}> 
                <input type="text"
                 name=""
                  id=""
                  placeholder="Search by doctor name , disease , specialization"
                  value={termSearched}
                  onChange={searchChangeHandler}
                  className={styles.searchInput} /> 
                <button className={styles.searchBtn}> 
                    search
                </button>
            </div>
        </div>
    )
}

export default SearchBar