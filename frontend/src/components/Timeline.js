import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from 'react'
import Post from './Post'
import EditPost from "./EditPost";

function Timeline() {

    const [postList, setPostList] = useState([]);
    const [editable, setEditable] = useState({ id: null, isEditable: true });

    const getPostList = () => {
        fetch('http://localhost:3000/api/article')
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(res => {
                setPostList(res.data)
            })
            .catch((err) => {
                console.error('err: ', err);
            })
    }

    useEffect(() => {
        getPostList();
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
                    console.log("post id : " + JSON.stringify(post))
                    console.log("editable : " + JSON.stringify(editable))
                    if (editable.isEditable) {
                        return (<Box
                            component={Grid}
                            item
                            key={post._id}
                            sx={{ flexGrow: 1, width: 1 }}
                        >
                            <EditPost
                                post={post}
                                setEditable={setEditable}
                            />
                        </Box>)
                    } else {
                        return (<Box
                            component={Grid}
                            item
                            key={post._id}
                            sx={{ flexGrow: 1, width: 1 }}
                        >
                            <Post
                                post={post}
                                setEditable={setEditable}
                            />
                        </Box>)
                    }
                })}
            </Grid>
        </Grid>
    )
}

export default Timeline