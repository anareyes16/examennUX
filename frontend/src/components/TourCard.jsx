import {usState, useEffect} from 'react';
import axios from "../api/axiosInstance";



const TourCard = ({ tour }) => {
    const [showAvailability, setShowAvailability] = useState(false);
    const [availability, setAvailability] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [reservationStatus, setReservationStatus] = useState(null);
    const [error, setError] = useState('');


    const fetchAvailability = async () => {
        try {
            const response = await axios.get(`/tours/availability`);
            const filteredAvailability = response.data.filter(
                (item) => item.tour_id === tour.id
            );
            setAvailability(filteredAvailability);
        } catch (error) {
            console.error('Error fetching availability:', error);
            setError('No se pudo obtener la disponibilidad de este tour.');
        }
    };

    const handleCheckAvailability = () => {
        const newShowAvailability = !showAvailability;
        setShowAvailability(newShowAvailability);
        if (newShowAvailability) {
            fetchAvailability();
        } else {
            setAvailability([]);
            setSelectedTime('');
        }   
    }
    const handleReserve = async () => {
        if (!customerName || !selectedTime) {
            setError('Por favor, selecciona un horario y escribe tu nombre.');
            return;
        }

        
    }