import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
const News = () => {
  const [news, setNews] = useState([]);
  const [displayedNews, setDisplayedNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const articlesPerPage = 18;

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2024-09-03&sortBy=publishedAt&apiKey=24303d423552496da89971f12c13cc30`;
        const response = await axios.get(apiUrl);
        setNews(response.data.articles);
        setTotalResults(response.data.totalResults);
        setDisplayedNews(response.data.articles.slice(0, articlesPerPage));
        setFilteredNews(response.data.articles.slice(0, articlesPerPage));
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data: ", error);
        setError(true);
        setLoading(false);
      }
    };
    fetchUrl();
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    const endIndex = nextPage * articlesPerPage;
    setDisplayedNews(news.slice(0, endIndex));
    setFilteredNews(news.slice(0, endIndex));
    setPage(nextPage);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filtered = news.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(filtered);
  };

  if (error) {
    return (
      <h1 className="font-bold text-red-600 text-center text-5xl my-11">
        Something Went Wrong...
      </h1>
    );
  }

  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-[70vh] relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[-1]">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-solid border-r-transparent"></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center my-14">
          {/* Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full max-w-[1550px] px-10 mb-8 flex"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search news..."
              className="w-full p-4 border border-gray-300 rounded-l-lg shadow-md focus:outline-2 focus:outline-indigo-600"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white p-4 px-5 rounded-r-lg hover:bg-indigo-700 flex items-center justify-center"
            >
              <FaSearch className="text-white" />
            </button>
          </form>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 px-10 max-w-[1550px]">
            {filteredNews.map((News, id) => (
              <div
                key={id}
                className="w-sm rounded overflow-hidden shadow-lg bg-white flex flex-col"
              >
                <img
                  className="w-full h-[300px] object-cover"
                  src={
                    News.urlToImage ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZwOE2gNYfjR8UVt4P1moy-S2_OHnmm7-Frg&s"
                  }
                  alt="Sample Image"
                />
                <div className="px-6 py-4 flex-grow">
                  <div className="font-bold text-xl mb-2">
                    {truncateText(News.title, 55)}
                  </div>
                  <p className="text-gray-700">
                    {truncateText(News.description, 100)}
                  </p>
                </div>
                <div className="px-6 py-6 mt-auto flex justify-end">
                  <a
                    href={News.url}
                    target="_blank"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredNews.length < totalResults && (
            <button
              onClick={loadMore}
              className="bg-black hover:shadow-2xl text-white font-bold py-3 px-7 rounded mt-11"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default News;
