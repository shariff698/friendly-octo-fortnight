const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;


/* ================= MIDDLEWARE ================= */

app.use(cors());

app.use(express.json());


/* ================= PRODUCTS ================= */

const products = [

    {
        id: 1,
        name: "Smartphone Pro",
        category: "Electronics",
        price: 24999,
        stock: 20
    },

    {
        id: 2,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 4500,
        stock: 35
    },

    {
        id: 3,
        name: "Laptop Pro",
        category: "Electronics",
        price: 65000,
        stock: 10
    },

    {
        id: 4,
        name: "Classic Sneakers",
        category: "Fashion",
        price: 3500,
        stock: 25
    }

];


/* ================= HOME ================= */

app.get("/", (req, res) => {

    res.json({
        message: "ShopPro API is running",
        status: "success"
    });

});


/* ================= GET PRODUCTS ================= */

app.get("/api/products", (req, res) => {

    res.json({
        success: true,
        products
    });

});


/* ================= GET PRODUCT ================= */

app.get("/api/products/:id", (req, res) => {

    const id =
        Number(req.params.id);

    const product =
        products.find(
            item => item.id === id
        );

    if (!product) {

        return res.status(404).json({

            success: false,

            message: "Product not found"

        });

    }

    res.json({

        success: true,

        product

    });

});


/* ================= CREATE ORDER ================= */

app.post("/api/orders", (req, res) => {

    const {
        customer,
        items,
        total
    } = req.body;


    if (
        !customer ||
        !items ||
        items.length === 0
    ) {

        return res.status(400).json({

            success: false,

            message: "Invalid order"

        });

    }


    const order = {

        orderId:
            "ORD-" +
            Date.now(),

        customer,

        items,

        total,

        status: "pending",

        createdAt:
            new Date().toISOString()

    };


    console.log(
        "New order:",
        order
    );


    res.status(201).json({

        success: true,

        message:
            "Order created successfully",

        order

    });

});


/* ================= NEWSLETTER ================= */

app.post(
    "/api/newsletter",
    (req, res) => {

        const {
            email
        } = req.body;


        if (!email) {

            return res.status(400).json({

                success: false,

                message:
                    "Email is required"

            });

        }


        console.log(
            "Newsletter subscriber:",
            email
        );


        res.json({

            success: true,

            message:
                "Successfully subscribed"

        });

    }
);


/* ================= 404 ================= */

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route not found"

    });

});


/* ================= SERVER ================= */

app.listen(
    PORT,
    () => {

        console.log(
            `ShopPro server running on port ${PORT}`
        );

    }
);
