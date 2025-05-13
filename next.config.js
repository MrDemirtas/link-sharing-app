module.exports = {
  images: {
    remotePatterns: [
      new URL("https://picsum.photos/**"),
      new URL(process.env.NEXT_PUBLIC_SUPABASE_URL + "**"),
    ],
  },
};
