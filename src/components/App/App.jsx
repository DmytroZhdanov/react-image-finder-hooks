import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container, ErrorImg, ErrorMsg } from './App.styled';
import { Modal } from 'components/Modal/Modal';
import { fetchImages } from 'ApiService/ApiService';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import errorImg from '../../error.png';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [modalImage, setModalImage] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (query === '') return;

    setStatus('pending');

    fetchImages(query, page)
      .then(({ hits, totalHits }) => {
        setTotalPages(totalHits / 12);

        page > 1
          ? setImages(prevImages => [...prevImages, ...hits])
          : setImages(hits);
        
        setStatus(totalHits ? 'resolved' : 'rejected');
      })
      .catch(error => {
        console.error(error.message);
        setStatus('rejected');
      });
  }, [query, page]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [query]);

  const handleSearch = query => {
    setImages([]);
    setPage(1);
    setQuery(query);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const setModalImg = (src, alt) => {
    setModalImage({ src, alt });
  };

  const resetModalImg = () => {
    setModalImage('');
  };

  return (
    <Container>
      <Searchbar onSearch={handleSearch} />
      {(status === 'pending' || status === 'resolved') && (
        <>
          <ImageGallery images={images} setModalImg={setModalImg} />
          {page < totalPages && status !== 'pending' && (
            <Button onClick={handleLoadMore} />
          )}
          {status === 'pending' && <Loader />}
        </>
      )}
      {status === 'rejected' && (
        <>
          <ErrorMsg>
            Sorry... We couldn't find pictures matching "{query}"
          </ErrorMsg>
          <ErrorImg src={errorImg} alt="Error" />
        </>
      )}
      {modalImage && <Modal image={modalImage} onClose={resetModalImg} />}
    </Container>
  );
};
