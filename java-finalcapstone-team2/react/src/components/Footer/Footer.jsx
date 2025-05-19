import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <p>&copy; {currentYear} Arcade Archive</p>
        </footer>
    );
};

export default Footer;