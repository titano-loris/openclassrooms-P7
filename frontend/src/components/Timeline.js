import { Box, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from 'react'
import Post from './Post'
import EditPost from "./EditPost";
import { useNavigate } from "react-router-dom";

function Timeline() {
    const navigate = useNavigate();
    const [postList, setPostList] = useState([]);
    const [editable, setEditable] = useState({ id: null, isEditable: false });
    const newPost = () => {
        navigate('/newPost');
    }
    const getPostList = () => {
        fetch('http://localhost:3000/api/article')
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(res => {
                setPostList(res.data)
                console.log('res.data', res.data)
            })
            .catch((err) => {
                console.error('err: ', err);
            })
    }

    useEffect(() => {
        getPostList();
        console.log('editable', editable)
    }, [editable]);

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="space-around"
        >
            <Grid
                item
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                rowSpacing={2}
                xs={12}
                lg={6}
                sx={{ margin: 1 }}
            >
                {postList.map((post) => {

                    if (editable.isEditable && editable.id === post._id) {
                        return (<Box
                            component={Grid}
                            item
                            key={post._id}
                            sx={{ flexGrow: 1, width: 1 }}
                        >
                            <EditPost post={post} setEditable={setEditable} />
                        </Box>)
                    } else {
                        return (<Box
                            component={Grid}
                            item
                            key={post._id}
                            sx={{ flexGrow: 1, width: 1 }}
                        >
                            <Post post={post} setEditable={setEditable} />
                        </Box>)
                    }
                })}
            </Grid>
            <Button onClick={newPost}>Ajouter nouveau post</Button>
        </Grid>

    )
}

export default Timeline