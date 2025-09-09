import "./globals.css";

export const metadata = {
  title: "Search Animations",
  description: "Search Animations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Search Animations</title>
        <meta name="description" content="Search Animations" />
        <meta name="keywords" content="Search Animations" />
        <meta name="author" content="Search Animations" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`antialiased bg-gray-300/70`}>{children}</body>
    </html>
  );
}
