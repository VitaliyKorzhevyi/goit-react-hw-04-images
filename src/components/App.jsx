import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import { fetchImages } from '../helpers/api/index';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { AppWrap } from './App.styled';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImage, setCurrentImage] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus('pending');
        const { hits, totalHits } = await fetchImages(search);
        setImages(hits);
        setTotalHits(totalHits);
        setStatus('resolve');
      } catch (error) {
        setStatus('reject');
        toast.error('ooops something went wrong');
      }
    };

    fetchData();
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { hits, totalHits } = await fetchImages(search, currentPage);
        setStatus('pending');
        setImages(prevImages => {
          const uniqueImages = [
            ...new Map(
              [...prevImages, ...hits].map(image => [image.id, image])
            ).values(),
          ];
          return uniqueImages;
        });

        setTotalHits(totalHits);

        if (hits.length === 0) {
          toast.info(`on request ${search} Nothing found`);
        }
        setStatus('resolve');
      } catch (error) {
        setStatus('reject');
        toast.error('ooops something went wrong');
      }
    };

    fetchData();
  }, [search, currentPage]);

  const handleSearchValue = (value, { resetForm }) => {
    setSearch(value.search);
    setCurrentPage(1);
    setImages([]);
    resetForm();
  };

  const handleNextPageClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleCurrentImgClick = evt => {
    setCurrentImage(evt);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const currentScoreImage = images.length;

  return (
    <AppWrap>
      <Searchbar onSubmit={handleSearchValue} />
      <ImageGallery imgList={images} onClick={handleCurrentImgClick} />

      {status === 'pending' && <Loader />}

      {currentScoreImage < totalHits && (
        <Button onClick={handleNextPageClick} />
      )}

      {showModal && (
        <Modal image={currentImage} handleModalClose={handleModalClose} />
      )}

      <ToastContainer />
    </AppWrap>
  );
};
