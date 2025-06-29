import React, { useState } from 'react';

const getComments = (episodeId) => {
  const data = localStorage.getItem('comments_' + episodeId);
  return data ? JSON.parse(data) : [];
};
const saveComments = (episodeId, comments) => {
  localStorage.setItem('comments_' + episodeId, JSON.stringify(comments));
};

const Comments = ({ episodeId }) => {
  const [comments, setComments] = useState(() => getComments(episodeId));
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (!text.trim()) return;
    const newComments = [...comments, { text, date: new Date().toISOString() }];
    setComments(newComments);
    saveComments(episodeId, newComments);
    setText('');
  };

  return (
    <div style={{marginTop: 16}}>
      <h4>Comments</h4>
      <ul style={{padding: 0, listStyle: 'none'}}>
        {comments.map((c, i) => (
          <li key={'comment-' + i} style={{marginBottom: 8, fontSize: 15}}>
            <span style={{color: '#888', fontSize: 12, marginRight: 8}}>{new Date(c.date).toLocaleString()}</span>
            {c.text}
          </li>
        ))}
      </ul>
      <div style={{display: 'flex', gap: 8}}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a comment..."
          style={{flex: 1, padding: '0.4rem 0.7rem', borderRadius: 6, border: '1px solid #e5e7eb'}}
          aria-label="Add a comment"
        />
        <button onClick={handleAdd} style={{padding: '0.4rem 1rem'}}>Post</button>
      </div>
    </div>
  );
};

export default Comments;
