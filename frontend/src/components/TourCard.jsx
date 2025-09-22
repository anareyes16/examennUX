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
    };
    
    const handleReserve = async () => {
        if (!customerName || !selectedTime) {
            setError('Por favor, selecciona un horario y escribe tu nombre.');
            return;
        }
        try {
            const response = await axios.put('/tours/reserve', {
                personName: customerName,
                scheduleTime: selectedTime,
                tourId: tour.id
            });
            setReservationStatus(response.data.message);
            setError(null);
        }   
        catch (error) {
            console.error('Error making reservation:', error);
            setError('No se pudo completar la reserva. Inténtalo de nuevo.');
            setReservationStatus(null);
        }
    };

    return (
        <div className="tour-card">
            <h3>{tour.name}</h3>
            <p>{tour.description}</p>
            <button onClick={handleCheckAvailability}>{showAvailability ? 'Ocultar Disponibilidad' : 'Ver Disponibilidad'}</button>
            {showAvailability && (
                <div className="availability-section">
                    {error && <p className="error">{error}</p>}
                    {availability.length > 0 ? (
                        <div>
                            <h4>Horarios Disponibles:</h4>
                            <ul>
                                {availability.map((slot) => (
                                    <li key={slot.id}>
                                        <label>
                                            <input
                                                type="radio"
                                                name="scheduleTime"
                                                value={slot.schedule_time}
                                                checked={selectedTime === slot.schedule_time}
                                                onChange={(e) => setSelectedTime(e.target.value)}
                                            />
                                            {new Date(slot.schedule_time).toLocaleString()} - Asientos disponibles: {slot.seats_available}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <input  
                                type="text"
                                placeholder="Tu Nombre"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                            <button onClick={handleReserve}>Reservar</button>   
                            {reservationStatus && <p className="success">{reservationStatus}</p>}
                        </div>
                    ) : (<p>No hay horarios disponibles para este tour.</p>
                    )}
                </div>
            )}
        </div>
    );
};