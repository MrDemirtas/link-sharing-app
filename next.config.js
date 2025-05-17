module.exports = {
  images: {
    remotePatterns: [new URL(process.env.NEXT_PUBLIC_SUPABASE_URL + "/**")],
  },
};
