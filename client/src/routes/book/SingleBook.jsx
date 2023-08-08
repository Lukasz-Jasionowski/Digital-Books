import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function SingleBook() {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    const [data, setData] = useState([]);
    const urlSlug = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/${urlSlug.slug}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data.');
                }

                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    function StarRating({ numberOfStars }) {
        const stars = [];
        for (let i = 0; i < numberOfStars; i++) {
            stars.push(<span key={i}>⭐</span>)
        }
        return <div>Rating: {stars}</div>
    }

    return (
        <div>
            <Link to={"/books"}>🔙 Books</Link>
            <div className='bookdetails'>
                <div className='col-1'>
                    <img src={import.meta.env.VITE_APP_UPLOADS_IMG + `${data.thumbnail}`} alt={data?.title} />
                </div>
                <div className='col-2'>
                    <h1>{data?.title}</h1>
                    <p>{data?.description}</p>
                    <StarRating numberOfStars={data?.stars} />
                    <p>Category</p>
                    <ul>
                        {data?.category?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SingleBook