import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className='footer-contenr-left'>
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit temporibus laborum nam? Quam magni omnis cum autem, quia quisquam temporibus totam libero unde odit nobis maxime quibusdam. Vitae, sapiente atque.</p>
                    <div className="foot-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className='footer-contenr-center'>
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className='footer-contenr-right'>
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+998932220099</li>
                        <li>expample@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>Copyrigth 2024. All Rigth Reserved</p>
        </div>
    )
}

export default Footer