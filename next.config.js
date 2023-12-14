/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
//await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
      domains: ['res.cloudinary.com', 'avatars.githubusercontent.com', 'platform-lookaside.fbsbx.com', 'lh3.googleusercontent.com'],
      },
      eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
};

export default config;
