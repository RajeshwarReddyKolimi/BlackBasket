import React from "react";
import "../../styles/footer.css";
import { NavLink } from "react-router-dom";
import {
    BiLogoTwitter,
    BiLogoGithub,
    BiLogoLinkedinSquare,
    BiLogoInstagram,
} from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
function UserFooter() {
    return (
        <footer className="footer">
            <div className="footer-info">Happy Shopping😀</div>
            <div className="footer-list-container">
                <header className="footer-list-header">Follow me</header>
                <div className="footer-list">
                    <NavLink
                        target="_blank"
                        to="https://github.com/RajeshwarReddyKolimi"
                        className="footer-list-item"
                    >
                        <BiLogoGithub
                            className="footer-icons"
                            style={{ color: "black" }}
                        />
                    </NavLink>
                    <NavLink
                        target="_blank"
                        to="https://www.linkedin.com/in/rajeshwar-reddy-kolimi/"
                        className="footer-list-item"
                    >
                        <BiLogoLinkedinSquare
                            className="footer-icons"
                            style={{ color: "#0a66c2" }}
                        />
                    </NavLink>
                    <NavLink
                        target="_blank"
                        to="https://twitter.com/RajeshwarKolimi"
                        className="footer-list-item"
                    >
                        <BiLogoTwitter
                            className="footer-icons"
                            style={{ color: "#1da1f2" }}
                        />
                    </NavLink>
                    <NavLink
                        target="_blank"
                        to="https://www.instagram.com/rajeshwarreddykolimi/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
                        className="footer-list-item"
                    >
                        <BiLogoInstagram
                            className="footer-icons"
                            style={{ color: "#e1306c" }}
                        />
                    </NavLink>
                    <NavLink
                        target="_blank"
                        to="https://portfolio-rajeshwar.netlify.app/"
                        className="footer-list-item"
                    >
                        <BsGlobe className="footer-icons" />
                    </NavLink>
                    <NavLink
                        target="_blank"
                        to="mailto:kolimirajeshwarreddy@gmail.com"
                        className="footer-list-item"
                    >
                        <MdEmail className="footer-icons" />
                    </NavLink>
                </div>
            </div>
        </footer>
    );
}

export default UserFooter;
