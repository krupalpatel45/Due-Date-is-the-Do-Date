import React, { Component } from 'react'
import './card.css'
import { Link, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
class Home extends Component {
    state = {
        tracks: [
            {
                TrackName: 'History',
                Content: [
                    {
                        name: 'Ancient History',
                        img: 'http://4.bp.blogspot.com/-mMYMMNNbc1E/TzoL6ENO9_I/AAAAAAAAItw/pWHJBJnxqhQ/s1600/Ancient%2BIndian%2BArchitecture%2BPhotos.jpg',
                    },
                    {
                        name: 'Medieval History',
                        img: 'https://www.iasexpress.net/wp-content/uploads/2019/01/Medieval-Indian-History-Mind-Map-Upsc-IAS.jpg',
                    },
                    {
                        name: 'Modern History',
                        img: 'https://wbpscupsc.com/wp-content/uploads/2019/08/2.jpg',
                    },
                ],
            },

            {
                TrackName: 'Geography',
                Content: [
                    {
                        name: 'Physical Geography',
                        img: 'https://blogs.brighton.ac.uk/geography/files/2017/11/Physical-Geography-1-1bhrbpl.jpg',
                    },
                    {
                        name: 'Human Geography',
                        img: 'https://study.com/cimages/course-image/human-geography-textbook_137698_large.jpg',
                    },
                    {
                        name: 'Political Geography',
                        img: 'https://www.colorado.edu/geography/sites/default/files/styles/medium/public/article-image/geog_4712_image.png?itok=AbU7HOvT',
                    },
                    {
                        name: 'Economic Geography',
                        img: 'https://image.slidesharecdn.com/2-170727104348/95/geography-igcse-graph-skills-13-638.jpg?cb=1501152308',
                    },
                ],
            },
        ],
    }
    render() {
        let cardContainer = {
            padding: '2px 16px',
            backgroundColor: this.props.curState.theme.color,
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
            height: '50px',
            color: 'whitesmoke',
            fontFamily: 'monospace',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '18px',
        }
        let card = {
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
            transition: '0.5s',
            borderRadius: '20px' /* 5px rounded corners */,
            margin: '1%',
            padding: '5px',
            width: '100%',
        }
        return (
            <div>
                {this.state.tracks.map(track => (
                    <div className='m-5'>
                        <h2>{track['TrackName']}</h2>
                        <hr></hr>
                        <div className='row'>
                            {track['Content'].map((t, ind) => (
                                <div className='col card' key={ind} style={card}>
                                    <Link
                                        to={{
                                            pathname: '/test/selectTest/' + t['name'],
                                            image: t['img'],
                                        }}
                                    >
                                        <img src={t['img']} alt='' />
                                        <div className='' style={cardContainer}>
                                            {t['name']}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    curState: state,
})
export default connect(mapStateToProps, {})(Home)
