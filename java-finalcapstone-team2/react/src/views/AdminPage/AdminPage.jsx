// import AdminReviewList from "../../components/AdminReviews";
import "./AdminPage.css";
import UserRatings from "../../components/UserRatings/UserRatings";
import UserReviews from "../../components/UserReviews/UserReviews";
import { useContext} from 'react';
import { UserContext } from '../../context/UserContext';


function AdminPage() {
    const admin = true;
    const user = useContext(UserContext);

    return (
        <div className="adminPage">
            <div className="adminHeader">
                <h1>Admin Controls</h1>
                <p>Welcome, {user.username}!</p>
            </div>

            <div className="ratingsContainer">
                <UserRatings admin={admin}></UserRatings>
            </div>

            <div className="reviewContainer" >
                <UserReviews admin={admin}></UserReviews>
                
            </div>
        </div>
        
    );
}

export default AdminPage;