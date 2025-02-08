import React, { useState } from 'react';
import './CommentSection.css';

interface CommentAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface CommentData {
  id: string;
  author: CommentAuthor;
  content: string;
  createdAt: Date;
  replies: CommentData[];
}

const Comment: React.FC<{
  comment: CommentData;
  onReply: (parentId: string, content: string) => void;
}> = ({ comment, onReply }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showReplies, setShowReplies] = useState(false);

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onReply(comment.id, replyContent);
      setReplyContent('');
      setIsReplying(false);
      setShowReplies(true);
    }
  };

  return (
    <div className="br-comment-thread">
      <div className="br-comment">
        <div className="br-comment-avatar">
          {comment.author.avatarUrl ? (
            <img src={comment.author.avatarUrl} alt={comment.author.name} />
          ) : (
            <div>{comment.author.name[0]}</div>
          )}
        </div>
        <div className="br-comment-content">
          <div className="br-comment-header">
            <span className="br-comment-author">{comment.author.name}</span>
            <span className="br-comment-time">
              {comment.createdAt.toLocaleString()}
            </span>
          </div>
          <p className="br-comment-text">{comment.content}</p>
          <div className="br-comment-actions">
            <button onClick={() => setIsReplying(!isReplying)}>
              {isReplying ? 'Cancel' : 'Reply'}
            </button>
            {comment.replies.length > 0 && (
              <button 
                onClick={() => setShowReplies(!showReplies)}
                className={showReplies ? 'active' : ''}
              >
                {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
              </button>
            )}
          </div>
        </div>
      </div>

      {isReplying && (
        <form className="br-reply-form" onSubmit={handleSubmitReply}>
          <div className="br-comment-avatar">
            <div>Y</div>
          </div>
          <div className="br-reply-input-wrapper">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              rows={1}
            />
            <div className="br-comment-actions"> {/* Changed from br-reply-actions to br-comment-actions */}
              <button type="submit" disabled={!replyContent.trim()}>
                Reply
              </button>
            </div>
          </div>
        </form>
      )}

      <div className={`br-replies ${showReplies ? 'show' : ''}`}>
        {comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} onReply={onReply} />
        ))}
      </div>
    </div>
  );
};

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: CommentData = {
        id: Date.now().toString(),
        author: { id: 'current-user', name: 'You' },
        content: newComment,
        createdAt: new Date(),
        replies: []
      };
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    }
  };

  const handleAddReply = (parentId: string, content: string) => {
    const addReplyToComment = (comments: CommentData[]): CommentData[] => {
      return comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now().toString(),
                author: { id: 'current-user', name: 'You' },
                content,
                createdAt: new Date(),
                replies: []
              }
            ]
          };
        }
        if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReplyToComment(comment.replies)
          };
        }
        return comment;
      });
    };

    setComments(prev => addReplyToComment(prev));
  };

  return (
    <div className="br-comments-section">
      <form className="br-comment-form" onSubmit={handleAddComment}>
        <div className="br-comment-avatar">
          <div>Y</div>
        </div>
        <div className="br-input-wrapper">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows={1}
          />
          {newComment.trim() && (
            <div className="br-comment-actions">
              <button type="submit">Comment</button>
            </div>
          )}
        </div>
      </form>

      <div className="br-comments-list">
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={handleAddReply}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
