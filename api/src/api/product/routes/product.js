'use strict';

/**
 * product router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::product.product');


// const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::product.product", ({ strapi }) => ({
//     async findOne(ctx) {
//         const { id } = ctx.params;

//         const entity = await strapi.db.query("api::product.product").findOne({
//             where: { id },
//             populate: ["img", "img2", "categories", "sub_categories"], // Ensure relations are included
//         });

//         if (!entity) {
//             return ctx.notFound("Product not found");
//         }

//         return entity;
//     },
// }));
