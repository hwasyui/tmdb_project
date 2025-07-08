import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Row, Col, Rate, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import { setPage } from '../store/movieSlice'
import SearchBar from '../components/SearchBar'

const Home = () => {
    const { movies, currentPage, perPage, searchQuery } = useSelector((state) => state.movie)
    const dispatch = useDispatch()

    const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const start = (currentPage - 1) * perPage
    const paginated = filtered.slice(start, start + perPage)

    return (
        <div style={{ padding: '2rem' }}>
        <SearchBar />
            <h1 style={{ color: '#f5c518', marginBottom: '2rem' }}>Top Movies</h1>
        <Row gutter={[16, 16]}>
            {paginated.map((movie) => (
            <Col key={movie.id} xs={24} sm={12} md={8} lg={6}>
                <Link to={`/movie/${movie.id}`}>
                <Card
                    hoverable
                    cover={<img alt={movie.title} src={movie.image} />}
                >
                    <Card.Meta title={movie.title} description={movie.year} />
                    <div style={{ marginTop: '8px' }}>
                    <Rate disabled allowHalf defaultValue={movie.rating / 2} />
                    </div>
                </Card>
                </Link>
            </Col>
            ))}
        </Row>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Pagination
            current={currentPage}
            total={movies.length}
            pageSize={perPage}
            onChange={(page) => dispatch(setPage(page))}
            />
        </div>
        </div>
    )
}

export default Home
