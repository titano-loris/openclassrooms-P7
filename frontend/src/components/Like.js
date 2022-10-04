

function Like({ post, }) {
    const user = useContext(UserContext);
    const postAlreadyLiked = post.usersLiked.includes(user.userId);
    const postAlreadyDisliked = post.usersDisliked.includes(user.userId);

}

export default Like