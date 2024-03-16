import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery !== "") {
      fetchImages(searchQuery, page);
    }
  }, [searchQuery, page]);

  const fetchImages = async (query, page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: query,
            page: page,
            per_page: 10, 
            client_id: "NYBFJtaT_RoW2_1AK1s-PHUz15VPsDdDFtpazbBjIE0", 
          },
        }
      );
      const data = response.data;
      if (page === 1) {
        setImages(data.results);
      } else {
        setImages((prevImages) => [...prevImages, ...data.results]);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  // const handleSubmit = (values, { resetForm }) => {
  //   setPage(1);
  //   setSearchQuery(values.search);
  //   resetForm();
  // };

  const handleSubmit = (search) => {
    setPage(1);
    setSearchQuery(search);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app">
      
      <SearchBar onSubmit={handleSubmit} />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: css.toastTextCenter,
        }}
      />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} openModal={openModal} />
      <LoadMoreBtn
        onLoadMore={handleLoadMore}
        hasMore={!loading && images.length > 0}
      />
      {selectedImage && (
        <ImageModal
          isOpen={true}
          image={selectedImage}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;
