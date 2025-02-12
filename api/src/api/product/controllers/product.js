'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product');



// "use strict";

// const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::product.product", ({ strapi }) => ({
//     async findOne(ctx) {
//         try {
//             const { id } = ctx.params;

//             // Ensure ID is properly formatted
//             const productId = Number(id);
//             if (isNaN(productId)) {
//                 return ctx.badRequest("Invalid product ID");
//             }

//             // Fetch product from database
//             const entity = await strapi.entityService.findOne(
//                 "api::product.product",
//                 productId,
//                 { populate: "*" }
//             );

//             if (!entity) {
//                 return ctx.notFound();
//             }

//             return { data: entity };
//         } catch (error) {
//             strapi.log.error("findOne error:", error);
//             return ctx.internalServerError("Something went wrong");
//         }
//     },
// }));
