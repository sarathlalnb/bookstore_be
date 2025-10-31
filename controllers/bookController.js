const book = require("../models/bookModel");

const stripe = require("stripe")(process.env.stripeSecretKey);

exports.addbook = async (req, res) => {
  try {
    let {
      title,
      author,
      imageUrl,
      noOfPages,
      price,
      abstract,
      publisher,
      category,
      language,
      isbn,
      discountPrice,
    } = req.body;

    let { userMail } = req.user;

    // console.log(req.files)

    let uploadedImages = [];

    req.files.forEach((eachFile) => uploadedImages.push(eachFile.filename));

    console.log(uploadedImages);

    if (
      title &&
      author &&
      noOfPages &&
      price &&
      abstract &&
      publisher &&
      category &&
      language &&
      isbn &&
      userMail &&
      uploadedImages &&
      discountPrice
    ) {
      let existingBook = await book.findOne({ title });
      if (existingBook) {
        res
          .status(409)
          .json({ message: "Book With this title is already registered" });
      } else {
        let newBook = new book({
          title,
          author,
          imageUrl,
          noOfPages,
          price,
          abstract,
          publisher,
          category,
          language,
          isbn,
          userMail,
          discountPrice,
          uploadedImages,
        });
        await newBook.save();
        res.status(201).json(newBook);
      }
    } else {
      res.status(406).json({ message: "Please fill the form" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getAllbook = async (req, res) => {
  try {
    let searchKey = req.query.search;

    let query = {
      title: {
        $regex: searchKey,
        $options: "i",
      },
    };

    let Allbooks = await book.find(query);
    res.status(200).json(Allbooks);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getHomeBooks = async (req, res) => {
  try {
    let books = await book.find().limit(4);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getUserBooks = async (req, res) => {
  try {
    let { userMail } = req.user;
    let books = await book.find({ userMail: userMail });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getSingleBook = async (req, res) => {
  try {
    let { id } = req.params;

    let books = await book.findOne({ _id: id });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.makePayment = async (req, res) => {
  let { bookDetails } = req.body;

  let { userMail } = req.user;

  try {
    let bookresp = await book.findByIdAndUpdate(
      { _id: bookDetails._id },
      {
        title: bookDetails.title,
        author: bookDetails.author,
        imageUrl: bookDetails.imageUrl,
        noOfPages: bookDetails.noOfPages,
        price: bookDetails.price,
        discountPrice: bookDetails.discountPrice,
        abstract: bookDetails.abstract,
        publisher: bookDetails.publisher,
        category: bookDetails.category,
        userMail: bookDetails.userMail,
        brought: userMail,
        language: bookDetails.language,
        isbn: bookDetails.isbn,
        uploadedImages: bookDetails.uploadedImages,
      },
      { new: true }
    );

    let priceVal =
      Number(bookDetails.price) - Number(bookDetails.discountPrice);

    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: bookDetails.title,
            description: `${bookDetails.author} - ${bookDetails.publisher}`,
            images: [bookDetails.imageUrl],
            metadata: {
              title: bookDetails.title,
              author: bookDetails.author,
              imageUrl: bookDetails.imageUrl,
              noOfPages: bookDetails.noOfPages,
              price: bookDetails.price,
              discountPrice: bookDetails.discountPrice,
              abstract: bookDetails.abstract,
              publisher: bookDetails.publisher,
              category: bookDetails.category,
              userMail: bookDetails.userMail,
              brought: userMail,
              language: bookDetails.language,
              isbn: bookDetails.isbn,
            },
          },
          unit_amount: Math.round(priceVal * 100),
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "https://bookstore-fe-khaki.vercel.app/payment-success",
      cancel_url: "https://bookstore-fe-khaki.vercel.app/payment-failure",
    });

    res.status(200).json({ session: session });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getPaymentHistory = async (req, res) => {
  let { usermail } = req.user;

  try {
    let payments = await book.find({ brought: usermail });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json(error);
  }
};
