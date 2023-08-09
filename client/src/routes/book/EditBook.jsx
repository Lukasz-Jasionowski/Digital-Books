import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import NoImageSelected from "../../assets/no-image-selected.jpg"

function EditBook() {
    const urlSlug = useParams();
    const baseURL = import.meta.env.VITE_APP_BASE_URL + `/${urlSlug.slug}`;

    const [bookId, setBookId] = useState('');
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [stars, setStars] = useState(0);
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [sumbitted, setSumbitted] = useState('');
    const [image, setImage] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch(baseURL);
            if (!response.ok) {
                throw new Error('Failed to fetch data!');
            }
            const data = await response.json();
            setBookId(data._id);
            setTitle(data.title);
            setSlug(data.slug);
            setStars(data.stars);
            setCategories(data.category);
            setDescription(data.description);
            setThumbnail(data.thumbnail);
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const updateBook = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('bookId', bookId);
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('stars', stars);
        formData.append('description', description);
        formData.append('category', categories);

        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }

        try {
            const response = await fetch(import.meta.env.VITE_APP_BASE_URL, {
                method: "PUT",
                body: formData
            })
            if (response.ok) {
                setTitle('');
                setSlug('');
                setSumbitted(true);
            } else {
                console.log("Failed to submit data!");
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleCategoryChange = (e) => {
        setCategories(e.target.value.split(',').map((category) => category.trim()));
    }

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setThumbnail(e.target.files[0]);
        }
    }

    return (
        <div>
            <h1>Edit Book</h1>
            <p>This is where NodeJS, Express & MongoDB grab some data.<br></br>Data below is pulled from a MongoDB database.</p>

            {sumbitted ? (
                <p>Data submitted successfully!</p>
            ) :

                <form className='bookdetails' onSubmit={updateBook}>
                    <div className='col-1'>
                        <label>Upload Thumbnail</label>
                        {image ? (
                            <img src={image} alt='preview image' />
                        ) :
                            <img src={import.meta.env.VITE_APP_UPLOADS_IMG + thumbnail} alt='preview image' />
                        }
                        <input onChange={onImageChange} type='file' accept='image/gif, image/jpeg, image/png' />
                    </div>
                    <div className='col-2'>
                        <div>
                            <label>Title</label>
                            <input
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <label>Slug</label>
                            <input
                                type='text'
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)} />
                        </div>
                        <div>
                            <label>Stars</label>
                            <input
                                type='text'
                                value={stars}
                                onChange={(e) => setStars(e.target.value)} />
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea
                                rows='4'
                                cols='50'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div>
                            <label>Categories (comma-seperated)</label>
                            <input
                                type='text'
                                value={categories}
                                onChange={handleCategoryChange} />
                        </div>
                        <input type='submit' value='Add Book' />
                    </div>
                </form>
            }
        </div>
    )
}

export default EditBook