import {Ad, NumericDate} from '../client/src/interfaces';

const ads: Ad[] = [
    {
        "id": "ad1",
        "title": "Huskita",
        "description": "huskita",
        "city": "Madrid",
        "country": "Spain",
        "date": {
            "seconds": 1630733880,
            "nanoseconds": 0
        },
        "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/Akita-Puppy.jpg?alt=media&token=ca0385f9-0373-4f20-b16d-c1a6bca1bef8",
        "sellerID": "seller1",
        "status": "active",
        "price": 2000
    },
        {
            "id": "ad2",
            "title": "Yorkshire Terrier",
            "description": "buy you won't regret!",
            "city": "Minsk",
            "country": "Belarus",
            "date": {
                "seconds": 1628941680,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/Yorkshire-Terrier-5-645mk070411.jpg?alt=media&token=c2b2423b-f3c6-47b4-acf7-9ff97128ac73",
            "sellerID": "seller2",
            "status": "active",
            "price": 500
        },
        {
            "id": "ad3",
            "title": "Bulldog",
            "description": "the best pitbull!!!1",
            "city": "Paris",
            "country": "France",
            "date": {
                "seconds": 1624289640,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/Bulldog-puppies-for-sale.jpg?alt=media&token=44c66f94-5326-4e4e-aecb-94fa6e796d13",
            "sellerID": "seller3",
            "status": "active",
            "price": 1500
        },
        {
            "id": "ad21",
            "title": "Chihuahua",
            "description": "great chihuahua!!!",
            "city": "Madrid",
            "country": "Spain",
            "date": {
                "seconds": 1633160520,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/image-2.jpeg?alt=media&token=https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/image-2.jpeg?alt=media&token=3d197ae6-adcf-469b-9460-7ac13e1e0488",
            "sellerID": "seller1",
            "status": "closed",
            "price": 800
        },
        {
            "id": "ad4",
            "title": "Irish Terrier",
            "description": "great price great puppy",
            "city": "Gomel",
            "country": "Belarus",
            "date": {
                "seconds": 1627704420,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/image.jpeg?alt=media&token=20bee7ff-5b7a-412a-958f-902921e3f62e",
            "sellerID": "seller4",
            "status": "active",
            "price": 400
        },
        {
            "id": "ad5",
            "title": "Yorkshire Terrier",
            "description": "puppies from the most beautiful dog!",
            "city": "New York",
            "country": "USA",
            "date": {
                "seconds": 1626776340,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/Yorkshire-Terrier-puppy-in-a-dog-bed.20200601164413905.jpg?alt=media&token=6b545cda-cf30-4545-b53a-7d725489d8a1",
            "sellerID": "seller5",
            "status": "active",
            "price": 1000
        },
        {
            "id": "ad6",
            "title": "Beagle",
            "description": "so cheap!",
            "city": "Los Angeles",
            "country": "USA",
            "date": {
                "seconds": 1629119880,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/maxresdefault.jpg?alt=media&token=2f26fa6e-9a38-4ee5-b9ea-2726964cb0f2",
            "sellerID": "seller6",
            "status": "active",
            "price": 900
        },
        {
            "id": "ad7",
            "title": "Yorkshire Terrier",
            "description": "Great puppy!",
            "city": "Minsk",
            "country": "Belarus",
            "date": {
                "seconds": 1627223700,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/1.jpg?alt=media&token=38799fe6-4c33-4194-8aae-569e9d336344",
            "sellerID": "seller7",
            "status": "active",
            "price": 500
        },
        {
            "id": "ad8",
            "title": "Akita Chow",
            "description": "cute puppy!",
            "city": "Minsk",
            "country": "Belarus",
            "date": {
                "seconds": 1630572720,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/Akita-puppy_gettyCW3T5G.png?alt=media&token=d538e509-520e-4f39-95b4-29e018844ba3",
            "sellerID": "seller8",
            "status": "active",
            "price": 800
        },
        {
            "id": "ad9",
            "title": "Maltese",
            "description": "Потрясающий любящий мальчик, здорововый, привитый",
            "city": "Gomel",
            "country": "Belarus",
            "date": {
                "seconds": 1632479040,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/maltese-puppy-960x540.jpg?alt=media&token=16884319-e0ff-45cf-87eb-69a4f18dfe43",
            "sellerID": "seller9",
            "status": "active",
            "price": 700
        },
        {
            "id": "ad23",
            "title": "German Shepherd",
            "description": "looking angry being kind",
            "city": "Madrid",
            "country": "Spain",
            "date": {
                "seconds": 1624611240,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/german-shepherd-05.jpg?alt=media&token=8f675701-5114-4b27-9ffc-d73ae1555cba",
            "sellerID": "seller1",
            "status": "sold",
            "price": 900
        },
        {
            "id": "ad10",
            "title": "Xolo",
            "description": "buy!!!1",
            "city": "Moscow",
            "country": "Russia",
            "date": {
                "seconds": 1630653000,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/nintchdbpict000405274798.jpg.webp?alt=media&token=5cd1a2c0-d960-46c1-a04a-d7ee363da7b5",
            "sellerID": "seller10",
            "status": "active",
            "price": 1300
        },
        {
            "id": "ad11",
            "title": "Borsoi",
            "description": "description description description",
            "city": "Gdansk",
            "country": "Poland",
            "date": {
                "seconds": 1631260320,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/Borzoi-Dog-Names-for-Male-and-Female-Puppies.jpg?alt=media&token=24e6a209-fc24-42c2-8107-46a4a88fc243",
            "sellerID": "seller11",
            "status": "active",
            "price": 600
        },
        {
            "id": "ad22",
            "title": "Collie",
            "description": "Beautiful fluffy puppy! ",
            "city": "Madrid",
            "country": "Spain",
            "date": {
                "seconds": 1633175520,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/90.jpeg?alt=media&token=6c79ac10-013c-43c9-b14b-35c0a91373ea",
            "sellerID": "seller1",
            "status": "active",
            "price": 500
        },
        {
            "id": "ad12",
            "title": "Dalmatin",
            "description": "description!!!!",
            "city": "Berlin",
            "country": "Germany",
            "date": {
                "seconds": 1631601300,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/Dalmatian-Puppy-Cost.png?alt=media&token=eb3c951f-4316-4aee-9237-54c9669585ca",
            "sellerID": "seller12",
            "status": "active",
            "price": 1300
        },
        {
            "id": "ad13",
            "title": "Corgi",
            "description": "ughhh so cute",
            "city": "Warsaw",
            "country": "Poland",
            "date": {
                "seconds": 1631589540,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/corgi-puppies.jpg?alt=media&token=6a16639c-2554-48c4-a968-85e2b64558d5",
            "sellerID": "seller13",
            "status": "active",
            "price": 1500
        },
        {
            "id": "ad14",
            "title": "Xolo",
            "description": "buy!",
            "city": "London",
            "country": "UK",
            "date": {
                "seconds": 1631259600,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/chalupaphar01.jpg.webp?alt=media&token=bce73470-626a-47a1-bff6-d06149a73318",
            "sellerID": "seller14",
            "status": "active",
            "price": 2000
        },
        {
            "id": "ad15",
            "title": "Dalmatin",
            "description": "Description",
            "city": "Kiev",
            "country": "Ukraine",
            "date": {
                "seconds": 1629966360,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/dalmatian-gallery-outdoors-2-min.jpg?alt=media&token=2cafc925-dce9-4b12-a980-fe9759cc08ba",
            "sellerID": "seller15",
            "status": "active",
            "price": 700
        },
        {
            "id": "ad16",
            "title": "York",
            "description": "Description",
            "city": "Riga",
            "country": "Latvia",
            "date": {
                "seconds": 1630478460,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/Teacup-Yorkies-The-World_s-Smallest-Dog-HP-long.jpg?alt=media&token=eb8d8b77-2164-4706-b1b9-e7387d7a509c",
            "sellerID": "seller16",
            "status": "active",
            "price": 1000
        },
        {
            "id": "ad17",
            "title": "Xolo",
            "description": "ancient dogs with big hearts!",
            "city": "Novopolotsk",
            "country": "Belarus",
            "date": {
                "seconds": 1632497700,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/95771b08b6da2ccca6611945a3e678b6.jpg?alt=media&token=5f56e8f1-b079-422d-95ca-f1a73195a208",
            "sellerID": "seller17",
            "status": "active",
            "price": 1200
        },
        {
            "id": "ad18",
            "title": "Bichon Frise",
            "description": "so kind cute puppy!",
            "city": "Nice",
            "country": "France",
            "date": {
                "seconds": 1626487080,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/Bichon-Frise-puppies-development-stage-and-their-behavior.jpg?alt=media&token=e8d64d21-e3e8-46c7-8889-d13bb2180653",
            "sellerID": "seller18",
            "status": "active",
            "price": 2100
        },
        {
            "id": "ad19",
            "title": "Borsoi",
            "description": "delivery available everywhere!",
            "city": "Brest",
            "country": "France",
            "date": {
                "seconds": 1630165320,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/Chart_rosyjski_borzoj_rybnik-kamien_pl.jpg?alt=media&token=f9af2cdb-ff2c-4ac5-be79-8b80802aac45",
            "sellerID": "seller19",
            "status": "active",
            "price": 1050
        },
        {
            "id": "ad20",
            "title": "Poodle",
            "description": "poodle",
            "city": "Paris",
            "country": "France",
            "date": {
                "seconds": 1628940900,
                "nanoseconds": 0
            },
            "picture": "https://firebasestorage.googleapis.com/v0/b/dog-shop-8c56c.appspot.com/o/poodle-puppies-breed.jpg?alt=media&token=92ae64bd-071f-4d00-bb31-dcc885e9750a",
            "sellerID": "seller20",
            "status": "active",
            "price": 3000
        }
    ]