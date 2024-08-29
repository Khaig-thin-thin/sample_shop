const Product = require("../model/ProductModel");
const products = [
    {
        img: "static/images.jpg",
        title: "cute dog",
        description: "The dog is so cute and swetie."
    },
    {
        img: "static/images (1).jpg",
        title: "cute dog",
        description: "The dog is so cute and swetie."
    },
    {
        img: "static/images (2).jpg",
        title: "cute dog",
        description: "The dog is so cute and swetie."
    },
    {
        img: "static/images.jpg",
        title: "cute dog",
        description: "The dog is so cute and swetie."
    },
    // {
    //      img: "static/images (2).jpg",
    //      title: "cute dog",
    //      description: "The dog is so cute and swetie."
    // },
    // {
    //      img: "static/images.jpg",
    //      title: "cute dog",
    //      description: "The dog is so cute and swetie."
    // }


];

module.exports.productGet = async function (req, res) {
    let products = await Product.find();
    res.render("product", {
        page_title: "Products",
        product: products
    });
}
module.exports.productPost = async function (req, res) {
    let name = req.body.name;
    let price = req.body.price;
    let img = req.body.img;
    let description = req.body.description;
    product = new Product({
        name, price, img, description
    });
    try {
        product = await product.save();
        res.status(201).json({
            product
        });
    } catch (err) {
        res.json({
            errors: err.message
        });
    }


}
module.exports.addProduct = async function (req, res) {
    res.render("add-products", { page_title: "Add Product" })
}
module.exports.searchProduct = async function (req, res) {
    let keyword = req.query.keyword || ""; // Default to an empty string if keyword is undefined

    let query = {};
    if (keyword.trim() !== "") {
        query.name = { $regex: keyword, $options: "i" };
    }

    try {
        let products = await Product.find(query);
        res.render(
            "partials/selection-section",
            { selection: products },
            (err, html) => {
                if (err) {
                    res.status(500).json({
                        error: "something went wrong",
                    });
                    return;
                }

                res.status(200).json({
                    html,
                    products,
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};
module.exports.viewProduct = async function (req, res) {
    let productId = req.params.id;

    try {
        let product = await Product.findById(productId);
        if (!product) {
            res.status(404).render("404", { page_title: "Product Not Found" });
            return;
        }

        res.render("product-details", {
            page_title: product.name,
            product: product,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch product details" });
    }
};

module.exports.productDetails = async function (req, res) {
    console.log(req.params)
    const id = req.params.id;
    try {
        const p = await Product.findById(id);
        if (!p) {
            res.status(404).json({
                error: [
                    { product: "not found" }
                ]
            })
            return;
        }
        res.render('product_details',{product:p,page_title:p.name});
    } catch (err) {
        res.status(400).json({
            error: [
                {
                    product: err.message
                }
            ]
        })
    }
};
module.exports.productUpdateGet = async (req, res) => {
    const id = req.params.id;
   
    try {
        // Find the product by ID
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).render('update-product', {
                error: 'Product not found',
                product: {}
            });
        }
 
        // Render the update form with the product details
        res.render('update-product', { product, error: null });
    } catch (err) {
        console.error('Error retrieving product:', err);
        res.status(500).render('update-product', {
            error: 'Failed to retrieve product',
            product: {}
        });
    }
};
module.exports.updateProduct = async function (req, res) {
    const id = req.params.id;
    const { name, price, img, description } = req.body;
   
    try {
      let product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({
          error: "Product not found",
        });
        
      }
   
      // Update product fields
      product.name = name || product.name;
      product.price = price || product.price;
      product.img = img || product.img;
      product.description = description || product.description;
   
      // Save updated product
      await product.save();
      res.redirect(`/product/${id}/details`);
    //   res.status(200).json({
    //     message: "Product updated successfully",
    //     product,
    //   });
    } catch (err) {
      res.status(500).json({
        error: "Failed to update product",
      });
    }
};
module.exports.deleteProduct = async function (req, res) {
    const productId = req.params.id;
   
    try {
      const product = await Product.findByIdAndDelete(productId);
   
      if (!product ||product.isDeleted ) {
        return res.status(404).json({
          error: "Product not found",
        });
      }
      product.isDeleted = true;     
      await product.save();
   
      res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (err) {
        console.log(err);
      res.status(500).json({
        error: "Failed to delete product",
      });
    }
  }

