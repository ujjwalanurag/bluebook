import React from "react";
import { Link } from "react-router-dom";

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    // componentDidMount() {
    //     this.props.fetchPosts(this.props.user.id);
    // };

    // componentDidUpdate(prevProps) {
    //     const userId = this.props.currentUser.id
    //     if (prevProps.currentUser.id !== userId) {
    //         this.props.fetchPosts(userId);
    //     }
    // }

    handleDelete (for_user_id, postId) {
        return e => {
            e.preventDefault();
            const postInfo = {
                for_user_id: for_user_id,
                postId: postId
            };
            this.props.deletePost(postInfo);
        }
    }

    render() {
        if (Object.values(this.props.posts).length === 0) {
            return null;
        }
        return (
            <div className="posts">
                <ul className="posts-list">
                    {Object.values(this.props.posts).map(post => (
                        <li>
                            <div className="post-header">
                                <img className="post-header-img" src={post.author.profileUrl} />
                            
                                <div className="post-header-details">
                                    <div className="post-header-name">
                                        <Link to={`/${post.author_id}`}>{`${post.author.first_name} ${post.author.surname}`}</Link>
                                    </div>
                                    <div className="post-header-date">
                                        {
                                            new Date(`${post.created_at}`).toLocaleString()
                                        }
                                    </div>
                                </div>
                            </div>
                            
                            <div className="post-body">
                                {post.body}
                            </div>
                            
                            {
                                this.props.currentUser.id === post.author_id &&
                                <button 
                                    onClick={this.handleDelete(post.for_user_id, post.id)}
                                    className="post-delete-button">
                                    X
                                </button>
                            }
                        </li>
                        ))}
                </ul>
            </div>
        )
    }
}

export default Posts;