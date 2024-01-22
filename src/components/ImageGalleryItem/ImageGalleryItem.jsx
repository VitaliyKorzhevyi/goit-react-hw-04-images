import PropTypes from 'prop-types';
import { GalleryImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  return (
    <GalleryImg
      src={webformatURL}
      alt=""
      onClick={() => onClick(largeImageURL)}
    />
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
