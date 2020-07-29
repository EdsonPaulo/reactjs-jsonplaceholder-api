import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';
import {
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Button,
    Avatar,
    Breadcrumbs,
    Typography,
    makeStyles,
    Divider,
    TextField
} from '@material-ui/core';
import { API_URL } from '../../constants';
import './styles.css';

export default function PostArticle() {

    const styles = useStyles()
    const navigationHistory = useHistory()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        console.log("ID do Post: " + id)
        setIsLoading(true)

        fetch(`${API_URL}/posts/${id}`)
            .then((response) => response.json())
            .then((json) => setPost(json))
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })

        fetch(`${API_URL}/posts/${id}/comments`)
            .then((response) => response.json())
            .then((json) => setComments(json))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }, [])

    //renderizar o conteúdo do post
    const renderPostContent = () => (
        <>
            <Breadcrumbs separator="/" aria-label="breadcrumb">
                <Link color="inherit" to="/"> Home </Link>
                <Link color="inherit" to="/"> Posts </Link>
                <Typography color="textPrimary"> #{post.id}</Typography>
            </Breadcrumbs>

            <div className="postContainer">
                <h1>#{post.id} - {post.title}</h1>
                <p className="postBody">{post.body}{post.body}</p>
                <p className="postBody">{post.body}{post.body}{post.body} </p>
                <p className="postBody">{post.body}{post.body}{post.body} </p>
                <p className="postBody">{post.body} </p>
                <div className="postFooter">
                    <Typography color="textSecondary" variant="subtitle1">Por Edson Gregório (Sossego)</Typography>
                    <Typography color="textSecondary" variant="subtitle1">29/07/2020</Typography>
                </div>
            </div>
            <Divider light />

            <div className="commentsContainer">

                <Typography color="textSecondary" variant="h6" gutterBottom> Comentários</Typography>

                {
                    comments.map(comment => (
                        <div className="comment" key={comment.id}>
                            <div className="commentTop">
                                <Avatar src="/image.jpg" style={{marginRight: 20}} />
                                <div>
                                    <Typography variant="h6">{comment.name}</Typography>
                                    <Typography color="textSecondary" variant="subtitle1" gutterBottom>{comment.email}</Typography>
                                </div>
                            </div>
                            <Typography variant="body1" gutterBottom>{comment.body}</Typography>
                        </div>
                    ))
                }

                <form className="commentForm" noValidate autoComplete="on">
                    <TextField label="Seu Email" type="email" variant="outlined" />
                    <TextField label="Sua Mensagem" variant="outlined" />
                </form>
            </div>

        </>
    )

    //renderizar content placeholder enquanto aguarda resposta do fetch
    const renderLoading = () => (
        <div className={styles.skeletonContainer}>
            <Skeleton variant="rect" width={"100%"} height={50} />
            <div className={styles.divider} />
            <Skeleton variant="rect" width={"70%"} height={40} />
            <div className={styles.divider} />
            <Skeleton variant="rect" width={"100%"} height={100} />

            <div style={{ marginBottom: 50 }} />

            <Skeleton variant="rect" width={"100%"} height={50} />
            <div className={styles.divider} />
            <Skeleton variant="rect" width={"70%"} height={40} />
            <div className={styles.divider} />
            <Skeleton variant="rect" width={"100%"} height={100} />
        </div>
    )


    /***
     * RETURN PRINCIPAL DO COMPONENT
    */
    return (
        <div className="styles.container">
            {
                isLoading ? renderLoading() : renderPostContent()
            }
        </div>
    )
}



const useStyles = makeStyles({
    container: {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    card: {

        marginTop: 20,
        padding: 20,
    },
    cardTopContainer: {
        display: "flex",
        justifyContent: "space-beetwen"
    },
    title: {
        fontSize: 64,
    },
    divider: {
        marginBottom: 5
    },
    pagination: {
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        marginTop: 30

    },
    skeletonContainer: {
        height: "100vh",
    }
});