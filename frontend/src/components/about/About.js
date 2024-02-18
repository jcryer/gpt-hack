import React, { useEffect } from 'react';
import './About.css';
import AOS from 'aos';
import 'aos/dist/aos.css';


const About = () => {
    useEffect(() => {
        AOS.init({ duration: 1200 });
      }, []);

  return (
    <div className="about-container" data-aos="fade-up">
      <section className="about-intro">
        <h1>Welcome to LynkSinc</h1>
        <p>Transforming the landscape of accounting with innovative AI-driven solutions for effortless management of tax returns.</p>
      </section>

      <section className="about-mission" data-aos="fade-up">
        <h2>Our Mission</h2>
        <p>At LynkSinc, our aim is to streamline the accounting process for professionals by offering an intelligent platform that simplifies the matching of receipts to invoices and bank statements. We are dedicated to enhancing efficiency and accuracy in tax return preparation, making it accessible to accountants without the need for deep technical knowledge.</p>
      </section>

      <section className="about-tools" data-aos="fade-up">
        <h2>Our Tools</h2>
        <p>Discover our suite of advanced tools designed specifically for accountants. LynkSinc enables the seamless integration of receipts, invoices, and bank statements, alongside the capability to download comprehensive CSVs of income and expenses. Our system also automatically classifies expenses, saving time and reducing errors in tax preparation.</p>
      </section>

      <section className="about-stage" data-aos="fade-up">
        <h2>Our Journey</h2>
        <p>As a pioneering startup, LynkSinc is at the forefront of accounting innovation. We are committed to continual growth and the development of our tools to fulfill the dynamic needs of our clients, ensuring that accountants have the most efficient, accurate, and user-friendly resources at their disposal.</p>
      </section>
    </div>

  );
};

export default About;
