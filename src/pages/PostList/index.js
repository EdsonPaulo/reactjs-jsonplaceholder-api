import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import Pagination from "@material-ui/lab/Pagination"
import {
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Button,
    Typography,
    makeStyles
} from '@material-ui/core';

import { API_URL } from '../../constants';

export default function PostList() {

    const styles = useStyles()
    const navigationHistory = useHistory()
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [displayPosts, setDisplayPosts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setIsLoading(true)
        fetch(`${API_URL}/posts`)
            .then((response) => response.json())
            .then((json) => setPosts(json))
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }, [])
   
    useEffect(() => {
        paginate()
    }, [page, posts])

    //tratar a paginação da lista de posts
    const paginate = () => {
        if (posts.length > 0) {
            let postsAux = posts.slice((page - 1) * 10, 10 * page);
            setIsLoading(false)
            setDisplayPosts(postsAux)
        }
    }

    //renderizar a lista de posts e o paginator
    const renderPostsList = () => (
    <>
        <Typography color="textSecondary" variant="h4" gutterBottom> Últimos Posts </Typography>
        {
            displayPosts.map(post => (
                <Card key={post.id} className={styles.card}>
                    <CardHeader title={"#" + post.id + " - " + post.title} subheader="Por Edson Gregório" />
                    <CardContent>
                        <Typography variant="body1" style={{ fontSize: 20 }} >
                            {post.body}...
                        </Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: "space-between" }}>
                        <Typography variant="subtitle1" color="textSecondary" >
                            29/07/2020
                        </Typography>
                        <Button size="large" onClick={() => navigationHistory.push(`/posts/${post.id}`)}>Ler Mais </Button>
                    </CardActions>
                </Card>
            ))
        }
        <div className={styles.pagination}>
            <Pagination count={posts.length / 10} color="primary" onChange={(event, value) => setPage(value)} />
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
                isLoading ? renderLoading()
                    : posts ? renderPostsList()
                        : <h4>Nenhum post para mostrar!</h4>
            }
        </div >
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