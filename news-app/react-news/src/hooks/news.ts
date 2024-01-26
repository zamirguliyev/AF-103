import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { IArticle } from "../models";

const useNews = () => {
  const [news, setNews] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      setError("");
      setLoading(true);
      const response = await axios.get<IArticle[]>(
        "http://localhost:3000/api/news"
      );
      setNews(response.data);

      setLoading(false);
    } catch (e: unknown) {
      setLoading(false);
      setError((e as AxiosError).message);
    }
  }

  return { news, loading, error };
};

export default useNews;
