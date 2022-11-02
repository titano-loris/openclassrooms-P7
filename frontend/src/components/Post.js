import { Box, Button, Card, CardContent, CardActions, CardMedia, } from "@mui/material";
import React, { useContext } from 'react';
import { UserContext } from "./App";
import Like from "./Like";

function Post({ post, setEditable }) {

    const user = useContext(UserContext);

    const handleRemovePost = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/api/article/${post._id}`, {
            method: 'DELETE',
            headers: {

            }
        })
            .then((res) => {
                if (res.ok) {
                    return (res.json());
                }
            })
            .then(() => {
                setEditable({ id: null, isEditable: false })
            })
            .catch(err => {
                if (err) {
                    console.error(err);
                }
            })
    }

    const handleEditPost = (event) => {
        event.preventDefault();
        setEditable({ id: post._id, isEditable: true });
    }

    const postCard =
        <Box
            component={Card}
            sx={{ flexGrow: 1 }}
            variant='outlined'
        >
            {post.imageUrl && (
                <CardMedia
                    alt={post.imageUrl}
                    component="img"
                    image={post.imageUrl}
                    sx={{
                        objectFit: 'scale-down',
                        maxHeight: 300
                    }}
                />
            )}
            <CardContent>
                Post ID : {post._id}
            </CardContent>
            <CardContent>
                Title : {post.title}
            </CardContent>
            <CardContent>
                Content : {post.content}
            </CardContent>
            <CardActions disableSpacing>
                <Like post={post} setEditable={setEditable} />
                <Button onClick={handleEditPost}>EDIT</Button>
                <Button onClick={handleRemovePost}>REMOVE</Button>
            </CardActions>
        </Box>

    return postCard
}

export default Post