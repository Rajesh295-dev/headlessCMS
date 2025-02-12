// const stripe = require('stripe')(process.env.STRIPE_KEY);
// 'use strict';

// /**
//  * order controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::order.order', ({ strapi }) => ({
//     async create(ctx) {
//         const { products } = ctx.request.body;
//         const lineItems = await Promise.all(
//             products.map(async (product) => {
//                 const item = await strapi
//                     .service("api::product.product")
//                     .findOne(product.id))}
//                     return {
//         price_data: {
//             currency: "usd",
//             product_data: {
//                 name: isHtmlElement.title,
//             },
//             unit_amount: isHtmlElement.price * 100,
//         },
//         quantity: isHtmlElement.quantity,
//     }

//         );

// try {
//     const session = stripe.checkout.create9({
//         line_items: [
//             {
//                 // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//                 price: '{{PRICE_ID}}',
//                 quantity: 1,
//             },
//         ],
//         mode: "payment",
//         success_url: `${process.env.YOUR_DOMAIN}?success=true`,
//         cancel_url: `${process.env.YOUR_DOMAIN}?sucsess=false`,
//         line_items: lineItems,
//         shipping_address_collection: { allowed_countries: ["US", "CA"] },
//         payment_method_types: ["card"],
//     });

//     await strapi.service("api::order:order").create({
//         data: {
//             products,
//             strapiId: session.id,
//         }
//     });
//     return { stripeSession: session };

// } catch (err) {
//     ctx.response.status = 500;
//     return err;
// }
//     }
// }));


'use strict';

const Stripe = require('stripe');
// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_KEY); // Correct instantiation

const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        try {
            const { products } = ctx.request.body;

            if (!products || !Array.isArray(products) || products.length === 0) {
                ctx.response.status = 400;
                ctx.body = { error: "Invalid products array." };
                return;
            }

            const lineItems = await Promise.all(
                products.map(async (product) => {
                    const item = await strapi
                        .service("api::product.product")
                        .findOne(product.id);

                    if (!item) {
                        throw new Error(`Product with ID ${product.id} not found`);
                    }

                    return {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: item.title,
                            },
                            unit_amount: item.price * 100,
                        },
                        quantity: product.quantity,
                    };
                })
            );

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                success_url: `${process.env.CLIENT_URL}?success=true`,
                cancel_url: `${process.env.CLIENT_URL}?success=false`,
                line_items: lineItems,
                shipping_address_collection: { allowed_countries: ["US", "CA"] },
            });

            await strapi.service("api::order.order").create({
                data: {
                    products,
                    strapiId: session.id,
                },
            });

            ctx.body = { stripeSession: session };
        } catch (err) {
            ctx.response.status = 500;
            ctx.body = { error: err.message };
        }
    },
}));
