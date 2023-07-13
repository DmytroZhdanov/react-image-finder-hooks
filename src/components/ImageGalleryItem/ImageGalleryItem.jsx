import PropTypes from 'prop-types';
import { Btn, Image, Item } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ setModalImg, modalUrl, url, tags }) => {
  const handleClick = (src, alt) => {
    setModalImg(src, alt);
  };

  return (
    <Item>
      <Btn onClick={() => handleClick(modalUrl, tags)} type="button">
        <Image src={url} alt={tags} />
      </Btn>
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  modalUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  setModalImg: PropTypes.func.isRequired,
};
