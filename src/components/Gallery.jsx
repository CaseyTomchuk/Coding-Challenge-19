import { useState, useEffect } from 'react'
import TourCard from './TourCard'

function Gallery() {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // this function removes a tour from the list when not interested is clicked
    const remove = (id) => {
        setTours((newTours) => newTours.filter((tour) => tour.id !== id));
        // when setTours is called here, the component is re-rendered without the removed tour
    }

    useEffect(() => {
        async function fetchTours() {
            try {
                const response = await fetch('/api/react-tours-project'); // I had to make changes inside vite.config.js to get this to work
                const data = await response.json();
                console.log(data); // for testing
                setTours(data); 
            }
            catch (error) {
                console.error('Oops', error);
                setError(true);
            }
            finally {
                setLoading(false);
            }
        }
        fetchTours(); // calling fetchTours
    }, []); // The empty dependency array []  makes it run only on mount. Absolutely cannot remove.

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error loading tours</div>
    }

    return (
        <div className="tours-container">
            {tours.map((tour) => (
                <TourCard 
                    key={tour.id} 
                    id={tour.id}
                    name={tour.name}
                    info={tour.info}
                    image={tour.image}
                    price={tour.price}
                    onRemove={remove}
                />
            ))}
        </div>
    );
}

export default Gallery;