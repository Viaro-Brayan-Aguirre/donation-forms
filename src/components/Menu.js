import React from 'react'; 

export class Menu extends React.Component {

    render(){
        return(
            <nav id="main_menu" className="navbar navbar-expand-sm bg-light navbar-light" >
                <a href="#!/main" name="main_page" onClick={this.props.handleSelect} className="navbar-brand text-light menu_logo">
                    <img src="/media/img/Donation_icon.png" alt="logo"/>
                </a>
                <button className="navbar-toggler" data-target="#toggle_z" data-toggle="collapse"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="toggle_z">
                    <ul className="navbar-nav  ml-auto ">
                        <li className="nav-item"><a name="donation" onClick={this.props.handleSelect} href="/#"  className="nav-link">Donate</a></li>
                        <li className="nav-item"><a name="history" onClick={this.props.handleSelect} href="/#" className="nav-link">History</a></li>
                        <li className="nav-item" ><a name="logout" onClick={this.props.handleSelect}  href="/#" className="nav-link">Logout</a></li>
                    </ul>
                </div>
            </nav>
        );
    }

}