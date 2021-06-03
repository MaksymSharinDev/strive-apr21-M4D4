import React from 'react'
import SingleBook from './SingleBook'
import {Col, Container, Form, Row} from 'react-bootstrap'
import CommentSection from './CommentSection'

class BookList extends React.Component {
    /*
    BookList responsabilities:
    1. single books layout disposition & visibility
    2. searchbar
    3. comment section layout and visibility
     */
    state = {
        searchQuery: '',
        commentSectionVisible: this.props.books.reduce((acc, elem) => {
            acc[elem.asin] = false
            return acc
        }, {}  )
    }



    getVisibleBooksIDs = () => {
        return this.props.books
            .filter(
                b => b.title
                    .toLowerCase()
                    .includes(this.state.searchQuery))
    }

    showCommentSection = (bID , title ) => {
        let visibly = this.state.commentSectionVisible
        visibly[bID] = !visibly[bID]
        visibly[bID] ?  this.setState({searchQuery : title.toLowerCase()}) : this.setState({searchQuery : ''})
        this.setState({ commentSectionVisible : visibly } )
    }

    render() {
        const SearchBar = () => {

        }
        return (
            <Container>
                <Row>
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Search</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Search here"
                                value={this.state.searchQuery}
                                onChange={e => this.setState({searchQuery: e.target.value})}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    {
                        this.getVisibleBooksIDs().map(b =>
                            (<Col xs={  this.state.commentSectionVisible[b.asin] ? 12 : 3  } >
                                <div className="d-flex">
                                    <div onClick={ () => this.showCommentSection(b.asin , b.title) }>
                                        <SingleBook id={`book${b.asin}`} book={b}  />
                                    </div>
                                    { this.state.commentSectionVisible[b.asin] ? <CommentSection /> : null }
                                </div>
                            </Col>))
                    }

                </Row>

            </Container>
        )
    }

    //Internal Components


}

export default BookList