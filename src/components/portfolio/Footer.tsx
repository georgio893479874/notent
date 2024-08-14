const Footer = () => {
  return (
    <footer className="bg-black text-white p-10 text-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
                <h4 className="text-lg font-semibold mb-2">Get Started</h4>
                <ul>
                <li><a href="#download">Download</a></li>
                <li><a href="#new-users">New Users</a></li>
                <li><a href="#upgrade">Upgrade</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-lg font-semibold mb-2">Account</h4>
                <ul>
                <li><a href="#sign-in">Sign In</a></li>
                <li><a href="#preferences">Preferences</a></li>
                <li><a href="#support">Support</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-lg font-semibold mb-2">Price</h4>
                <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#plans">Plans</a></li>
                <li><a href="#pricing">Pricing</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-lg font-semibold mb-2">Explore</h4>
                <ul>
                <li><a href="#music">Music</a></li>
                <li><a href="#artists">Artists</a></li>
                <li><a href="#albums">Albums</a></li>
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer;