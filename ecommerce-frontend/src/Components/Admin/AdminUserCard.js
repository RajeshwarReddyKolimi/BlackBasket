import React from "react";
import { useDispatch } from "react-redux";
import {
    blockUser,
    deleteUser,
    unblockUser,
} from "../../Redux/Thunks/adminThunks";
function AdminUserCard(props) {
    const { user } = props;
    const dispatch = useDispatch();
    function block() {
        dispatch(blockUser(user._id));
    }
    function unblock() {
        dispatch(unblockUser(user._id));
    }
    function delUser() {
        dispatch(deleteUser(user._id));
    }
    return (
        <div className="container-sm border border-dark mx-2">
            <img src={``} alt="image" />
            <h2>{user.firstName}</h2>
            <h3>{user.lastName}</h3>
            <h4>{user.email}</h4>
            <div>Cart: {user.cartSize}</div>
            <div>Wishlist: {user.wishlistSize}</div>
            <div>Orders: {user.wishlistSize}</div>
            {user.isBlocked ? (
                <button onClick={unblock}>Unblock</button>
            ) : (
                <button onClick={block}>Block</button>
            )}
            <button onClick={delUser}>Delete</button>
        </div>
    );
}

export default AdminUserCard;
