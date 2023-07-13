import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, setModalImg }) => {
  return (
    <Gallery>
      {images.map(({ webformatURL, tags, largeImageURL }, index) => (
        <ImageGalleryItem
          key={index}
          modalUrl={largeImageURL}
          url={webformatURL}
          tags={tags}
          setModalImg={setModalImg}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  setModalImg: PropTypes.func.isRequired,
};
