import './Header.css'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
// import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { AuthContext } from '../../state/AuthContext';
import SettingsIcon from '@mui/icons-material/Settings';

function Header() {

    const { user } = useContext(AuthContext);
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    //logout
    const handleLogout = async () => {
		localStorage.clear();
		window.location.href = '/';
	};

  return (
    <div className="headerContainer">
        <div className="headerLeft">
        <Link className="headerLink" to={"/"}>
            <img
            src={PUBLIC_FOLDER + "logo/logo4.png"}
            alt='logo'
            className="logo" />
        </Link>
        </div>
        {/* <div className="headerCenter">
            <div className="searchBar">
                <SearchIcon className="searchIcon" />
                <input
                placeholder="Search"
                className="searchInput"
                />
            </div>
        </div> */}
        <div className="headerRight">
            <div className="headerIcons">
                <div className="headerIconItem">
                    <Link className="headerLink" to={`/allPosts/${user.username}`}><HomeIcon /></Link>
                </div>
                <div className="headerIconItem">
                    <Link className="headerLink" to={`/setting/${user.username}`}><SettingsIcon /></Link>
                </div>
                <div className="headerIconItem">
                    <Link className="headerLink" to={`/profile/${user.username}`}><PersonIcon /></Link>
                </div>
                <div className="headerIconItem">
                    <Link className="headerLink" to="/post"><PostAddIcon /></Link>
                </div>
                <div className="headerIconItem">
                    <Link className="headerLink" to={`/favorite/${user.username}`}><FavoriteBorderIcon /></Link>
                </div>
                <div className="headerIconItem">
                    <LogoutIcon href="/" onClick={handleLogout} />
                </div>
            </div>
        </div>
    </div>
  );
}

export default Header