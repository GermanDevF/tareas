import type { NextConfig } from "next";

//https://lh3.googleusercontent.com/a/ACg8ocLEt4H8lPkgjtQhMweA_6rlkvnV4lKnpvBQEuD5iKtOdt07Ymo=s96-c
// https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
        port: "",
        pathname: "/blocks/marketing-ui/hero/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
    ],
  },
};

export default nextConfig;
