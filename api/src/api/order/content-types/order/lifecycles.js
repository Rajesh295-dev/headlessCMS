module.exports = {
    async beforeCreate(event) {
        const { data } = event.params;

        // Extract the title of the first product (if available)
        if (!data.title || data.title.trim() === "") {
            data.title = (data.products && Array.isArray(data.products) && data.products.length > 0)
                ? data.products[0].title
                : "No Product Title"; // Default title if no product exists
        }
    },

    async beforeUpdate(event) {
        const { data } = event.params;

        if (!data.title || data.title.trim() === "") {
            data.title = (data.products && Array.isArray(data.products) && data.products.length > 0)
                ? data.products[0].title
                : "No Product Title";
        }
    }
};
