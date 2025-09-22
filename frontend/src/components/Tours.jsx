import {usState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "../api/axiosInstance";
import { setTours } from '../features/tours/toursSlice';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';


const Tours = () => {
    const dispatch = useDispatch();
    const tours = useSelector((state) => state.tours);
   
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get('/tours');
                dispatch(setTours(response.data));
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        };

        fetchTours();
    }, [dispatch]);
    return (
        <Container className="d-flex flex-column align-items-center justify-content-center text-center py-4">
            <div className="my-4">
                <h1>BIENVENIDO A LOS TOURS  de ux</h1>
                
            </div>
            <h2 className="my-4">Tours Disponibles</h2> 
            <Row className= "justify-content-center w-100">
                {tours.map((tour) => (
                    <Col key={tour.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{tour.name}</Card.Title>
                                <Card.Text>{tour.description}</Card.Text>
                                <Card.Text>Price: ${tour.price}</Card.Text>
                                <Card.Text>Capacity: {tour.capacity} people</Card.Text>
                                <Button variant="primary">Book Now</Button>
                            </Card.Body>
                        </Card> 
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Tours;