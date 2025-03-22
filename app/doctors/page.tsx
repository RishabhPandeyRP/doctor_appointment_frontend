'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/DoctorSearch.module.css';
import initialDoctors from '@/data/doctors.json';
import { Doctor, FilterState } from '@/data/doctors.types';

const DoctorSearch = () => {
    const router = useRouter();
    const [doctors] = useState<Doctor[]>(initialDoctors);
    const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(initialDoctors);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filters, setFilters] = useState<FilterState>({
        rating: [],
        experience: [],
        gender: []
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [doctorsPerPage] = useState<number>(6); // Number of doctors to display per page

    // Apply search and filters to doctors list
    const applyFilters = (search: string = searchTerm, filterValues: FilterState = filters) => {
        let result = [...doctors];

        // Apply search
        if (search) {
            const searchLower = search.toLowerCase();
            result = result.filter(doctor =>
                doctor.name.toLowerCase().includes(searchLower) ||
                doctor.specialization.toLowerCase().includes(searchLower) ||
                doctor.diseases.some(disease => disease.toLowerCase().includes(searchLower))
            );
        }

        // Apply rating filter
        if (filterValues.rating.length > 0) {
            result = result.filter(doctor =>
                filterValues.rating.includes(doctor.rating.toString())
            );
        }

        // Apply experience filter
        if (filterValues.experience.length > 0) {
            result = result.filter(doctor =>
                filterValues.experience.includes(doctor.experience)
            );
        }

        // Apply gender filter
        if (filterValues.gender.length > 0) {
            result = result.filter(doctor =>
                filterValues.gender.includes(doctor.gender)
            );
        }

        setFilteredDoctors(result);

        // Reset to first page when filters change
        if (currentPage !== 1) {
            handlePageChange(1);
        }
    };

    // Handle search input
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        applyFilters(value , filters)
    };

    // Handle filter changes
    const handleFilterChange = (filterType: keyof FilterState, value: string) => {
        const newFilters = { ...filters };

        newFilters[filterType] = [value];

        setFilters(newFilters);
        applyFilters(searchTerm, newFilters);
    };

    // Reset all filters
    const resetFilters = () => {
        setSearchTerm('');
        setFilters({
            rating: [],
            experience: [],
            gender: []
        });
        setCurrentPage(1);

        setFilteredDoctors(doctors);
    };

    const navigateToDoctorProfile = (doctorId: number) => {
        router.push(`/doctors/${doctorId}`);
    };

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        // No longer updating URL with page number
    };

    // Get current doctors for pagination
    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

    // Calculate total pages
    const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

    // Generate page numbers array
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPageNumbersToShow = 5;

        if (totalPages <= maxPageNumbersToShow) {
            // If total pages are less than max to show, display all pages
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always include first page
            pageNumbers.push(1);

            // If current page is close to the beginning
            if (currentPage <= 3) {
                pageNumbers.push(2, 3, 4);
                pageNumbers.push("...");
            }
            // If current page is close to the end
            else if (currentPage >= totalPages - 2) {
                pageNumbers.push("...");
                for (let i = totalPages - 3; i < totalPages; i++) {
                    pageNumbers.push(i);
                }
            }
            // If current page is in the middle
            else {
                pageNumbers.push("...");
                pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
                pageNumbers.push("...");
            }

            // Always include last page
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.search}>
                    <h1 className={styles.title}>Find a doctor at your own ease</h1>

                    {/* Search Section */}
                    <div className={styles.searchSection}>
                        <div className={styles.searchWrapper}>
                            <input
                                type="text"
                                placeholder="Search by doctor name, disease, or specialization"
                                value={searchTerm}
                                onChange={handleSearch}
                                className={styles.searchInput}
                            />
                            <button className={styles.searchButton}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.doctorContent}>
                    <div className={styles.doctorTitle}>
                        {filteredDoctors.length} doctors available
                    </div>

                    <div className={styles.doctorDesc}>
                        Book appointments with minimum wait-time & verified doctor details
                    </div>
                </div>


                {/* Content Section */}
                <div className={styles.contentSection}>
                    <div className={styles.contentSectionInner}>
                        {/* Filters */}
                        <div className={styles.filtersContainer}>
                            <div className={styles.filtersHeader}>
                                <h2>Filter By:</h2>
                                <button onClick={resetFilters} className={styles.resetButton}>
                                    Reset
                                </button>
                            </div>

                            {/* Rating Filter */}
                            <div className={styles.filterGroup}>
                                <h3>Rating</h3>
                                {[5, 4, 3, 2, 1].map(star => (
                                    <div className={styles.filterOption} key={`star-${star}`}>
                                        <input
                                            type="radio"
                                            name='rating'
                                            id={`rating-${star}`}
                                            checked={filters.rating.includes(star.toString())}
                                            onChange={() => handleFilterChange('rating', star.toString())}
                                        />
                                        <label htmlFor={`rating-${star}`}>
                                            {star} {star === 1 ? 'Star' : 'Stars'}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            {/* Experience Filter */}
                            <div className={styles.filterGroup}>
                                <h3>Experience</h3>
                                {['15+ years', '10-15 years', '5-10 years', '3-5 years', '1-3 years', '0-1 years'].map(exp => (
                                    <div className={styles.filterOption} key={`exp-${exp}`}>
                                        <input
                                            type="radio"
                                            name='experience'
                                            id={`exp-${exp}`}
                                            checked={filters.experience.includes(exp)}
                                            onChange={() => handleFilterChange('experience', exp)}
                                        />
                                        <label htmlFor={`exp-${exp}`}>{exp}</label>
                                    </div>
                                ))}
                            </div>

                            {/* Gender Filter */}
                            <div className={styles.filterGroup}>
                                <h3>Gender</h3>
                                {['male', 'female'].map(gender => (
                                    <div className={styles.filterOption} key={`gender-${gender}`}>
                                        <input
                                            type="radio"
                                            name='gender'
                                            id={`gender-${gender}`}
                                            checked={filters.gender.includes(gender)}
                                            onChange={() => handleFilterChange('gender', gender)}
                                        />
                                        <label htmlFor={`gender-${gender}`}>
                                            {gender.charAt(0).toUpperCase() + gender.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Doctor Cards */}
                        <div className={styles.doctorsContainer}>
                            {currentDoctors.length > 0 ? (
                                <>
                                    {currentDoctors.map(doctor => (
                                        <div className={styles.doctorCard} key={doctor.id}
                                        onClick={() => navigateToDoctorProfile(doctor.id)}>
                                            <div className={styles.doctorImageContainer}>
                                                <div className={styles.doctorImage}></div>
                                            </div>
                                            <div className={styles.doctorInfo}>
                                                <h3>{doctor.name}</h3>

                                                <div className={styles.doctorMeta}>
                                                    <p className={styles.specialization}>{doctor.specialization}</p>
                                                    <span className={styles.experience}>{doctor.experience}</span>
                                                </div>

                                                <div className={styles.ratingBox}>
                                                    <span>Rating :</span>
                                                    <span className={styles.rating}>
                                                        {Array(doctor.rating).fill('★').join('')}
                                                        {Array(5 - doctor.rating).fill('☆').join('')}
                                                    </span>
                                                </div>

                                                <div className={styles.diseases}>
                                                    {doctor.diseases.join(', ')}
                                                </div>
                                                <button className={styles.appointmentButton}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent card click
                                                    navigateToDoctorProfile(doctor.id);
                                                }}>Book Appointment</button>
                                            </div>
                                        </div>
                                    ))}


                                </>
                            ) : (
                                <div className={styles.noResults}>
                                    <p>No doctors found matching your criteria.</p>
                                    <p>Try adjusting your filters or search term.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className={styles.pagination}>
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={styles.paginationButton}
                                >
                                    Previous
                                </button>

                                {getPageNumbers().map((number, index) => (
                                    number === "..." ?
                                        <span key={`ellipsis-${index}`} className={styles.paginationEllipsis}>...</span> :
                                        <button
                                            key={`page-${number}`}
                                            onClick={() => typeof number === 'number' && handlePageChange(number)}
                                            className={`${styles.paginationButton} ${currentPage === number ? styles.activePage : ''}`}
                                        >
                                            {number}
                                        </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={styles.paginationButton}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default DoctorSearch