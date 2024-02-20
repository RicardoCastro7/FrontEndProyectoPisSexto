import "bootstrap/dist/css/bootstrap.min.css";
import '../css/footerstyle.css'; 


const Footer = () => {
    return (
        <div className="footerContainer">
        <div className="footerLogo">
          {/* Tu logo aquí */}
        </div>
        <div className="footerMenu">
          <div className="footerMenuItem">
            <a href="#">Download Now</a>
            <a href="#">License</a>
          </div>
          <div className="footerMenuItem">
            <a href="#">About</a>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">News</a>
            <a href="#">Help</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="footerCopyright">
          © 2021 Landify UI Kit. All rights reserved
        </div>
        <div className="appSection">
          <div className="getAppText">
            Get the App
          </div>
          <div className="appDownloadButton">
            {/* Tu botón de descarga de la aplicación aquí */}
          </div>
        </div>
      </div>
        
    );
}

export default Footer;