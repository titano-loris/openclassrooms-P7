import { Box, Button, Card, CardContent, CardActions, CardMedia, Typography } from "@mui/material";
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
                'Authorization': `Bearer ${user.token}`
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

    const actionButtons = (user.isAdmin || post.userId === user.userId) &&
        <>
            <Button onClick={handleEditPost}>EDIT</Button>
            <Button onClick={handleRemovePost}>REMOVE</Button>
        </>

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
                Title : {post.title}
            </CardContent>
            <CardContent>
                Content : {post.content}
            </CardContent>
            <CardActions disableSpacing>
                <Like post={post} setEditable={setEditable} />

                {actionButtons}
            </CardActions>
        </Box>

    return postCard
}

export default Post