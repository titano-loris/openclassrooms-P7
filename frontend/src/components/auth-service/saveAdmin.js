function saveToken(userAdmin) {
    localStorage.setItem('isAdmin', JSON.stringify(userAdmin.toString()));
}

export default saveToken