// React imports
import React from 'react';

// Component imports
import { PartnerDashboard } from '../components/PartnerDashboard'
import { Loading } from '../components/Loading';

// Service imports
import PostService from '../services/BulkDiscountPostService';
import DiscountService from '../services/DiscountService';
import UserService from '../services/UserService'
import {BulkDiscount} from "../components/BulkDiscount";

export class BulkDiscountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [ ],
            discounts : [],
            selectedDiscount : "",
            user: UserService.isAutehnticated() ? UserService.getCurrentUser() : undefined,
            loading: true
        }
        this.addPost = this.addPost.bind(this);
        this.joinPost = this.joinPost.bind(this);
        this.leavePost = this.leavePost.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    addPost(e){
        e.preventDefault();
        const discountId = this.state.selectedDiscount ;
        PostService.addPost(discountId)
            .then((newPost) => {
                newPost.joined = true;
                let posts = this.state.posts;
                posts.push(newPost);
                this.setState(posts);
            })
            .catch(e => { console.error(e); });

    }

    joinPost(postId){
        PostService.joinPost(postId)
            .then((newPost) => {
                let posts = this.state.posts;
                for(let i=0;i<posts.length;i++){
                    if (posts[i]._id === postId){
                        posts[i].joined = true;
                        break;
                    }
                }
                this.setState(posts);
            })
            .catch(e => { console.error(e); });

    }

    leavePost(postId){
        PostService.leavePost(postId)
            .then((newPost) => {
                let posts = this.state.posts;
                for(let i=0;i<posts.length;i++){
                    if (posts[i]._id === postId){
                        posts[i].joined = false;
                        break;
                    }
                }
                this.setState(posts);
            })
            .catch(e => { console.error(e); });

    }
    handleSelectChange(event)
    {
        this.setState({selectedDiscount:event.target.value})
    }
    componentDidMount() {
        DiscountService.getBulkDiscounts()
            .then((discounts) => {
                this.setState({
                    discounts: discounts,
                    selectedDiscount: discounts[0] ? discounts[0]._id : undefined
                })
            })
            .catch(e => { console.error(e); });
        PostService.getPosts()
            .then((posts) => {
                for (let i=0;i<posts.length;i++){
                    if (posts[i].users.includes(this.state.user.id))
                    {
                        posts[i].joined = true;
                    }
                    if (posts[i].users.length >= posts[i].discount.bulkAmount){
                        posts[i].isFull = true;
                    }
                }
                this.setState({
                    posts: posts,
                    loading: false
                })
            })
            .catch(e => { console.error(e); });
    }


    render() {

        if (this.state.loading) {
            return(
                <Loading/>
            );
        } else {
            return(
                <BulkDiscount
                    props = {this.props}
                    discounts = {this.state.discounts}
                    posts = {this.state.posts}
                    selectedDiscount = {this.state.selectedDiscount}
                    handleSelectChange = {this.handleSelectChange}
                    addPost = {this.addPost}
                    joinPost = {this.joinPost}
                    leavePost = {this.leavePost}
                />
            );
        }
    }
}