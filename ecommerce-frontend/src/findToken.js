async function findToken() {
    const cookie = document.cookie
        .split(";")
        .find((cookie) => cookie.startsWith("refreshToken="));
    let token = "";
    if (cookie) token = cookie.split("=")[1];
    return token;
}
export default findToken;
