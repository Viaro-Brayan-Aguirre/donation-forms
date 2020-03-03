import React from 'react';

const main_template = (
    <div className="back_content_container">
        <img className="wing_left" src="/media/img/wing-white.png" alt="wing"/>
        <div className="logo_cont">
            <img src="/media/img/Donation_icon.png" alt="Donation forms icon"/>
        </div>
        <img className="wing_right" src="/media/img/wing-white.png" alt="wing" />
    </div>
);

//Stack Overflow https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript/32841164#32841164 
var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}});

/*Usage example*/
findIP.then(ip => console.log('your ip: ', ip)).catch(e => console.error(e))

const Utils = {
    lockScreen: function(){document.getElementsByClassName('lock_screen')[0].style.display = 'block';},
    unlockScreen: function(){document.getElementsByClassName('lock_screen')[0].style.display = 'none';},
    findIP: findIP,
    main_template : main_template
};



export default Utils;


