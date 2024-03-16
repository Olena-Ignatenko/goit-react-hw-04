const LoadMoreBtn = ({ onLoadMore, hasMore }) => {
  if (!hasMore) {
    return null;
  }

  return (
    <button className="load-more-btn" onClick={onLoadMore}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
