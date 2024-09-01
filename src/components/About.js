import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p className="about-text">
        We are students from the Government Polytechnic Vijayapura College, studying in the Computer Science and Engineering branch. 
        Our team has developed this FunFusion website as part of a project under the guidance of our esteemed professor, Siraj Sir.
        The FunFusion project is a testament to our dedication and passion for learning and creating something valuable and enjoyable.
      </p>
      <p className="about-text">
        The purpose of this project is to combine fun and education, allowing users to engage with interactive content while also learning new concepts. 
        This project has helped us enhance our skills in web development, teamwork, and project management.
      </p>
      <h2>Our Team</h2>
      <div className="student-list">
        <div className="student-card">
          <h2>Omkar Kokatnoor</h2>
          <p>Register Number: 120CS22034</p>
          <p>Omkar is the lead developer on this project, focusing on the overall architecture and implementation of the website's core features. His expertise in frontend and backend development has been instrumental in bringing the FunFusion project to life.</p>
        </div>
        <div className="student-card">
          <h2>Prajwal Hajeri</h2>
          <p>Register Number: 120CS22036</p>
          <p>Prajwal contributed significantly to the design and user experience of the FunFusion website. His attention to detail and creativity ensured that the interface is both user-friendly and visually appealing.</p>
        </div>
        <div className="student-card">
          <h2>Yatiraj Kulkarni</h2>
          <p>Register Number: 120CS22061</p>
          <p>Yatiraj worked on the integration of various interactive elements within the website. His focus on ensuring smooth functionality and responsiveness has greatly enhanced the user experience.</p>
        </div>
      </div>
      <p className="about-text">
        We hope that our efforts will be well-received and that this project will serve as a valuable resource for anyone interested in learning through interactive content.
        We are proud of what we have achieved and are grateful for the opportunity to apply our skills in a real-world project.
      </p>
      <p className="about-text">
        If you have any questions or would like to learn more about our project, please feel free to contact us through the provided channels.
        We would be happy to share our experiences and insights with you.
      </p>
    </div>
  );
}

export default About;
