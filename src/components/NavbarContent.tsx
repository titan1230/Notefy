import React from 'react';

interface NavbarContentProps {
    userExists: boolean;
}

const NavbarContent: React.FC<NavbarContentProps> = ({ userExists }) => {
    return (
        <div className="navbar-end">
            {userExists ? (
                <a href="/dashboard">
                    <button className="btn btn-info mr-2 font-Grey_Qo text-xl">Dashboard</button>
                </a>
            ) : (
                <a href="/onboarding">
                    <button className="btn btn-info mr-2 font-Grey_Qo" type="submit">Get Started</button>
                </a>
            )}
        </div>
    );
};

export default NavbarContent;
