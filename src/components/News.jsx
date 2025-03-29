import axios from "axios";
import { useEffect, useState } from "react";
import { FiAlertCircle, FiSearch } from "react-icons/fi";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const articlesPerPage = 18;

  const fetchUrl = async () => {
    try {
      const apiKey =
        import.meta.env.VITE_API_KEY || "24303d423552496da89971f12c13cc30";
      const apiUrl = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${apiKey}`;
      const response = await axios.get(apiUrl);
      setNews(response.data.articles);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const filteredNews = news.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  if (error) {
    return (
      <div className='flex items-center justify-center gap-4 w-full my-32 text-red-600 text-center text-3xl '>
        <FiAlertCircle />
        <h1 className='font-bold'>Something Went Wrong...</h1>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div className='w-full h-[70vh] flex items-center justify-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-solid border-r-transparent'></div>
        </div>
      ) : (
        <div className='flex flex-col items-center my-14'>
          <div className='w-full max-w-[1550px] px-10 mb-8 flex'>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search News...'
              className='w-full p-4 border border-gray-300 rounded-l-lg shadow-md focus:outline-2 focus:outline-indigo-600 text-xl'
            />
            <div className='bg-indigo-600 text-white p-4 px-5 rounded-r-lg flex items-center justify-center'>
              <FiSearch className='text-white text-2xl' />
            </div>
          </div>

          {filteredNews.length === 0 ? (
            <div className='flex items-center justify-center gap-4 w-full my-11 text-amber-600 text-center text-3xl '>
              <FiAlertCircle />
              <h1 className='font-bold'>No Results Found...</h1>
            </div>
          ) : (
            <div className='grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 px-10 max-w-[1550px]'>
              {filteredNews.slice(0, page * articlesPerPage).map((News, id) => (
                <div
                  key={id}
                  className='w-sm rounded overflow-hidden shadow-lg bg-white flex flex-col'>
                  <img
                    className='w-full h-[300px] object-cover'
                    src={News.urlToImage || "https://via.placeholder.com/300"}
                    alt='News Thumbnail'
                  />
                  <div className='px-6 py-4 flex-grow'>
                    <div className='font-bold text-xl mb-2'>
                      {truncateText(News.title, 55)}
                    </div>
                    <p className='text-gray-700'>
                      {truncateText(News.description, 100)}
                    </p>
                  </div>
                  <div className='px-6 py-6 mt-auto flex justify-end'>
                    <a
                      href={News.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'>
                      Read More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredNews.length > page * articlesPerPage && (
            <button
              onClick={loadMore}
              className='bg-black hover:shadow-2xl text-white font-bold py-3 px-7 rounded mt-11'>
              Load More
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default News;
