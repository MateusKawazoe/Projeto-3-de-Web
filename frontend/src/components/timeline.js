import React, { useState, useEffect } from 'react'
import '../styles/timeline.css'
import api from '../services/api'
import $ from 'jquery'
import Swal from 'sweetalert2'

export default function Timeline() {
    const [admin, setAdmin] = useState(0)

    async function checkAdmin() {
        const aux = await api.post('/user/showOne', {
            username: localStorage.getItem('username')
        })

        if(aux.data.admin) {
            setAdmin(1)
        }
    }

    useEffect(() => {
        checkAdmin()
    }, [])

    return (
        <div className="timeline-container">
            {localStorage.getItem('admin') && (
                <div className="posts">

                </div>
            )}
        </div>
    )
}