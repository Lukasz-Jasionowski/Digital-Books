require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Book = require("./models/Books");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/api/books", async (req, res) => {
    try {
        const category = req.query.category;

        const filter = {};
        if (category) {
            filter.category = category;
        }

        const data = await Book.find(filter);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "An error occured while fetching books." });
    }
});

app.get("/api/books/:slug", async (req, res) => {
    try {
        const slugParam = req.params.slug;
        const data = await Book.findOne({ slug: slugParam });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "An error occured while fetching books." });
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage });

app.post("/api/books", upload.single("thumbnail"), async (req, res) => {
    try {
        const newBook = new Book({
            title: req.body.title,
            slug: req.body.slug,
            stars: req.body.stars,
            description: req.body.description,
            category: req.body.category,
            thumbnail: req.file.filename
        })
        await Book.create(newBook);
        res.json("Data Submitted");
    } catch (error) {
        res.status(500).json({ error: "An error occured while adding book." });
    }
});

app.put("/api/books", upload.single("thumbnail"), async (req, res) => {
    try {
        const bookId = req.body.bookId;
        const updateBook = {
            title: req.body.title,
            slug: req.body.slug,
            stars: req.body.stars,
            description: req.body.description,
            category: req.body.category,
        }

        if (req.file) {
            updateBook.thumbnail = req.file.filename;
        }

        await Book.findByIdAndUpdate(bookId, updateBook);
        res.json("Data Edited");
    } catch (error) {
        res.status(500).json({ error: "An error occured while editing book." });
    }
});

app.delete("api/books/:id", async (req, res) => {
    const bookId = req.params.id;

    try {
        await Book.deleteOne({ _id });
        res.json(`Book ${req.body.bookId} Deleted!`);
    } catch (error) {
        res.json(error);
    }
});

app.get("/", (req, res) => {
    res.json("Hello!");
});

app.get("*", (req, res) => {
    res.sendStatus("404");
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})