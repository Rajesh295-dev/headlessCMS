

module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: 'cloudinary',
            providerOptions: {
                cloud_name: env('CLOUDINARY_NAME'),
                api_key: env('CLOUDINARY_KEY'),
                api_secret: env('CLOUDINARY_SECRET'),
            },
            actionOptions: {
                uploadStream: {  // ✅ Keep `uploadStream`
                    folder: env("CLOUDINARY_FOLDER", "rajWay"),
                },
                delete: {},
            },

        },
    },

});

