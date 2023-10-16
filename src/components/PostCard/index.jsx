import Proptypes from 'prop-types';
import './styles.css';

export const PostCard = ({ title, body, cover }) => {
  return (
    <div className="post">
      <img src={cover} alt={title}></img>
      <div className="post-content">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  title: Proptypes.string.isRequired,
  body: Proptypes.string.isRequired,
  cover: Proptypes.string.isRequired,
};
