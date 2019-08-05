
export function getUser() {
    let user = sessionStorage.getItem("r_admin_user");
    if(user) {
        user = JSON.parse(user)
    }
    return user
}
export function getToken() {
    if(getUser()) {
        return `basic ${getUser().token}`
    }
    return null
}
export function setUser(user) {
    return sessionStorage.setItem("r_admin_user", JSON.stringify(user))
}

export function removeUser() {
    return sessionStorage.removeItem("r_admin_user")
}
