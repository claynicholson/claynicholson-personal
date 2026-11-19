/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // www → apex, preserving path.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.claynicholson.com" }],
        destination: "https://claynicholson.com/:path*",
        statusCode: 301,
      },
      // http → https. Cloudflare sits in front and reports the visitor's
      // original scheme in cf-visitor; matching that (not x-forwarded-proto)
      // avoids redirect loops regardless of Cloudflare's origin SSL mode.
      {
        source: "/:path*",
        has: [{ type: "header", key: "cf-visitor", value: '.*"scheme":"http".*' }],
        destination: "https://claynicholson.com/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
