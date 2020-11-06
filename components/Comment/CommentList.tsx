import { Comment } from '../../pages';

interface CommentList {
  comments: Comment[];
}
const CommentList = ({ comments }: CommentList) => {
  return (
    <div>
      {comments.map((comment) => {
        // console.log('CONTENT', comment.content);
        return (
          <div key={comment.id}>
            <h4>{comment.user}</h4>
            <div dangerouslySetInnerHTML={{ __html: `${comment.content}` }} />
            {comment.comments.length > 0 && (
              <div style={{ paddingLeft: '2rem' }}>
                <CommentList comments={comment.comments} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
