import Modal from "react-modal";

const ImageModal = ({ isOpen, image, onRequestClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <img src={image.urls.regular} alt={image.alt_description} />
      <div>{image.author}</div>
      <div>{image.likes} likes</div>
      <div>{image.description}</div>
    </Modal>
  );
};

export default ImageModal;
