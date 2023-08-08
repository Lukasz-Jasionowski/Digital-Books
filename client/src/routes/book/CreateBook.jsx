import React, { useState } from 'react'
import NoImageSelected from "../../assets/no-image-selected.jpg"
import { Link } from 'react-router-dom'

function CreateBook() {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [stars, setStars] = useState(0);
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [sumbitted, setSumbitted] = useState('');

    const createBook = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(import.meta.env.VITE_APP_BASE_URL, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        title: title,
                        slug: slug
                    }
                )
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

    return (
        <div>
            <Link to={"/books"}>🔙 Books</Link>
            <h1>Create Book</h1>
            <p>This is where NodeJS, Express & MongoDB grab some data.<br></br>Data below is pulled from a MongoDB database.</p>

            {sumbitted ? (
                <p>Data submitted successfully!</p>
            ) :

                <form className='bookdetails' onSubmit={createBook}>
                    <div className='col-1'>
                        <label>Upload Thumbnail</label>
                        <img src={NoImageSelected} alt='preview image' />
                        <input type='file' accept='image/gif, image/jpeg, image/png' />
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

export default CreateBook