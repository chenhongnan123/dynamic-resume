/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com'], // 添加github头像服务的域名
    },
    transpilePackages: ['three'],
    output: "standalone",
}

module.exports = nextConfig
