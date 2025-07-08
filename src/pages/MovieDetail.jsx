import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Rate, Tag, Button, Input, List } from 'antd';
import { addComment } from '../store/movieSlice';

const MovieDetail = () => {
    const { id } = useParams();
    const movie = useSelector((state) =>
        state.movie.movies.find((m) => m.id === parseInt(id))
    );
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    if (!movie) return <p>Movie not found!</p>;

    const handleComment = () => {
        if (comment.trim()) {
        dispatch(addComment({ movieId: movie.id, comment }));
        setComment('');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
        <Card
            title={movie.title}
            cover={<img src={movie.image} alt={movie.title} />}
        >
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Duration:</strong> {movie.duration}</p>
            <p><strong>Description:</strong> {movie.description}</p>
            <div style={{ margin: '10px 0' }}>
            <Rate disabled allowHalf defaultValue={movie.rating / 2} />
            </div>
            {movie.genre?.map((g, i) => (
            <Tag color="blue" key={i}>{g}</Tag>
            ))}

            <div style={{ marginTop: '2rem' }}>
            <Input.TextArea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your comment"
                rows={2}
            />
            <Button onClick={handleComment} type="primary" style={{ marginTop: '10px' }}>Submit Comment</Button>

            <List
                header={`${movie.comments.length} Comments`}
                dataSource={movie.comments}
                renderItem={(item, index) => (
                <List.Item key={index}>{item}</List.Item>
                )}
                style={{ marginTop: '1rem' }}
            />
            </div>

            <div style={{ marginTop: '1rem' }}>
            <Link to="/">
                <Button type="primary">Back</Button>
            </Link>
            </div>
        </Card>
        </div>
    );
};

export default MovieDetail;