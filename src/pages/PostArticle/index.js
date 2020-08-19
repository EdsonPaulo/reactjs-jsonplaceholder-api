import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';
import {
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
    const { id } = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
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
    }, [id])

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
                    <Typography color="textSecondary" variant="subtitle1">Por Edson Gregório</Typography>
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
                                <Avatar src="/image.jpg" style={{ marginRight: 20 }} />
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
                    <Typography color="textSecondary" variant="h6" gutterBottom> Deixe o seu comentário.</Typography>
                    <TextField margin="dense" fullWidth label="Seu Email" type="email" variant="outlined" />
                    <TextField margin="dense" rows="5" multiline fullWidth label="Sua Mensagem" variant="outlined" />
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 15 }}>
                        <Button color="primary" disabled variant="contained">Comentar</Button>
                    </div>
                </form>
            </div>
        </>
    )

    //renderizar content placeholder enquanto aguarda resposta do fetch
    const renderLoading = () => (
        <div className={styles.skeletonContainer}>
            <Skeleton variant="rect" width={"100%"} height={400} />
            <div className={styles.divider} />
            <Skeleton variant="rect" width={"100%"} height={30} />

            <div style={{ marginBottom: 50 }} />

            <Skeleton variant="circle" width={50} height={50} />
            <div className={styles.divider} />
            <Skeleton variant="rect" width={"100%"} height={20} />
            <div className={styles.divider} />
            <Skeleton variant="rect" width={"100%"} height={20} />

            <div style={{ marginBottom: 20 }} />

            <Skeleton variant="circle" width={50} height={50} />
            <div className={styles.divider} />
            <Skeleton variant="rect" width={"100%"} height={20} />
            <div className={styles.divider} />
            <Skeleton variant="rect" width={"100%"} height={20} />
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
    divider: {
        marginBottom: 5
    },
    skeletonContainer: {
        height: "100vh",
    }
});