module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Adjust paths as needed
  theme: {
    extend: {}, // Add your theme customizations here
  },
  plugins: [], // Add any plugins you want to use
  purge: {
    enabled: true, // Enable purging for production builds
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], // Adjust paths to match your content
  },
};
