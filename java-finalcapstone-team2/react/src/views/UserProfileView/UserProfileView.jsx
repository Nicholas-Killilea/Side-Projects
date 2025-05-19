import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import UserReviews from '../../components/UserReviews/UserReviews';
import UserRatings from '../../components/UserRatings/UserRatings';
import UserList from '../../components/UserLists/UserLists';
import './UserProfileView.css'; // Changed to non-module CSS

function UserProfileView() {
    const user = useContext(UserContext);

    if (!user) {
        return (
            <div className="user-profile-page">
                <div className="user-profile-header">
                    <h1>Please log in to view your profile</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="user-profile-page">
            <div className="user-profile-header">
                <h1>Hello, {user.username}!</h1>
            </div>

            {/* Lists Section */}
            <section className="profile-section">
                <h2 className="section-title">My Game Lists</h2>
                <div className="profile-section-content">
                    <UserList />
                </div>
            </section>

            {/* Ratings Section */}
            <section className="profile-section">
                <h2 className="section-title">My Ratings</h2>
                <div className="profile-section-content ratings-section">
                    <UserRatings />
                </div>
            </section>

            {/* Reviews Section */}
            <section className="profile-section">
                <h2 className="section-title">My Reviews</h2>
                <div className="profile-section-content reviews-section">
                    <UserReviews />
                </div>
            </section>
        </div>
    );
}

export default UserProfileView;