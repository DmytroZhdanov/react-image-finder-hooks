import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalContent, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, image: { src, alt } }) => {
  useEffect(() => {
    const onKeydown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
      return;
    };

    window.addEventListener('keydown', onKeydown);

    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  }, [onClose]);

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
    return;
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalContent>
        <img src={src} alt={alt} />
      </ModalContent>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
