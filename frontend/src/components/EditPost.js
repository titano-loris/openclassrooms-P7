import { Button, IconButton, TextField, Card, Box } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "./App";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CardMedia from '@mui/material/CardMedia';

function EditPost({ post, setEditable }) {

    const user = useContext(UserContext);

    const defaultValues = {
        content: post.content,
    }
    const [formValues, setFormValues] = useState(defaultValues)
    const [image, setImage] = useState()

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }
    const formData2 = new FormData();

    const handleSubmit = (event) => {
        event.preventDefault();
        let postCopy = { ...post }
        formData2.append('content', formValues.content)
        formData2.append('title', postCopy.title)
        if (image) {
            formData2.append('imageUrl', image)
        }
        console.log("Post to sent : " + JSON.stringify(postCopy))
        console.log("Form Data : " + formData2.get("content"))
        console.log("ICI : " + post._id)
        let data = new Map([['title', post.title], ['content', formValues.content]])
        let jsonData = JSON.stringify(Object.fromEntries(data));

        fetch(`http://localhost:3000/api/article/${post._id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'multipart/form-data'
            },
            body: formData2
        })
            .then(value => {
                console.log(value)
                return (value.json())
            })
            .then(value => {
                /* console.log(value)
                 if (value) {
                     setEditable({ id: null, isEditable: false })
                 }*/
            })
            .catch(err => {
                if (err) { console.error(err) }
            })
    }

    const handleAddImages = (event) => {
        setImage(event.target.files[0])
    }

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 1
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1, width: 1, minWidth: 350 }}
            >
                <Box
                    component={Card}
                    sx={{ flexGrow: 1, width: 1 }}
                    variant='outlined'
                >
                    {(post.imageUrl && !image) &&
                        <CardMedia
                            alt={post.imageUrl}
                            component="img"
                            image={post.imageUrl}
                            sx={{
                                objectFit: 'scale-down',
                                maxHeight: 300
                            }}
                        />
                    }
                    {image &&
                        <CardMedia
                            alt={image.name}
                            component="img"
                            image={URL.createObjectURL(image)}
                            sx={{
                                objectFit: 'scale-down',
                                maxHeight: 300
                            }}
                        />
                    }
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                    >
                        <input hidden accept="image/*" type="file" onChange={handleAddImages} />
                        <AddPhotoAlternateIcon color="inherit" />
                    </IconButton>
                    <Box component={TextField}
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        id="content"
                        label="Post content"
                        name="content"
                        autoComplete="content"
                        defaultValue={post.content}
                        autoFocus
                        value={formValues.name}
                        onChange={handleInputChange}
                        variant="standard"
                        sx={{ width: 0.98, mr: 1, ml: 1 }}
                    />
                    <Button type="submit">EDIT POST</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default EditPost