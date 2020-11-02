import React, { useState, useEffect } from 'react'
import '../styles/posts.css'
import api from '../services/api'
import $ from 'jquery'
import Swal from 'sweetalert2'

export default function Posts({ type }) {
    
    switch(type) {
        case 1:
            return (
                <div>

                </div>
            )
        
        case 2:
            return (
                <div>

                </div>
            )

        case 3: 
            return (
                <div>

                </div>
            )
    }
}