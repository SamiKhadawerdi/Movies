import React from 'react'
import { Row } from 'react-bootstrap'
import CardMovie from './CardMovie'
import PaginationMovies from './PaginationMovies'

const MovieList = ({ movies,getpage ,pagecount}) => {
    return (
        <Row className='mt-3'>
            {movies.length >= 1 ? (movies.map((mov) => {
                return (<CardMovie key={mov.id} mov={mov} />)
            })) : <h2 className='text-center p-5'>لا يوجد لافلام ...</h2>}
            {movies.length >= 1 ?<PaginationMovies getpage={getpage} pagecount={pagecount}/>:null}

            </Row>
    )
}

export default MovieList