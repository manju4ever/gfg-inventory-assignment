import { products as productsDB } from "~/persistence";

const ProductService = {
  addProducts: async (request, h) => {
    try {
      const products = request.payload;
      const productsWithImage = products.map((prod) => ({
        ...prod,
        image_url: "https://source.unsplash.com/100x100/?product",
        imageSrcList: [
          "https://source.unsplash.com/1366x768/?product",
          "https://source.unsplash.com/1800x1000/?product",
        ],
      }));
      await productsDB.insert(productsWithImage);
      return h.response();
    } catch (err) {
      logger.error(err);
      return h.response().code(500);
    }
  },
  getAllProducts: async (request, h) => {
    try {
      return h.response(await productsDB.find().execAsync());
    } catch (err) {
      logger.error(err);
      return h.response().code(500);
    }
  },
  updateProduct: async ({ params, payload }, h) => {
    try {
      const updated = await productsDB.updateOne(
        { _id: params.product_id },
        payload,
        { returnUpdatedDocs: true }
      );
      return h.response(updated);
    } catch (err) {
      logger.error(err);
      return h.response().code(500);
    }
  },
};

export default ProductService;
