import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ handleModalClose, image }) => {
  const handleBackdropClick = evt => {
    if (evt.currentTarget !== evt.target) {
      return;
    }
    handleModalClose();
  };
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code !== 'Escape') {
        return;
      }
      handleModalClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleModalClose]);

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={image} alt="" />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};
