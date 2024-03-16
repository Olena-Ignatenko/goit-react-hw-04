const ImageCard = ({ image, openModal }) => {
  return (
    <li>
      <div onClick={() => openModal(image)}>
        {" "}
        <img src={image.urls.small} alt={image.alt_description} />
      </div>
    </li>
  );
};

export default ImageCard;
