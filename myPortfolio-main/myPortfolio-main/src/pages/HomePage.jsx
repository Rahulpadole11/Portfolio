import React, { useState } from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Project from '../components/Project';
import ContactDetails from '../components/ContactDetails';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';
import AdminPanelPro from '../components/AdminPanelPro';

const HomePage = () => {
  return (
    <div className="h-full  bg-gradient-to-b from-[#111111] to-[#0a0a0a] text-gray-100 flex justify-center relative w-full">
      <div className="w-full max-w-[1000px] px-8">
        <Header />
        <About />
        <Skills />
        <Experience />
        <Project />
        <ContactDetails />
        <Footer />
      </div>

      {/* Chat Box Component */}
      <ChatBox />

      {/* Admin Panel */}
      <AdminPanelPro />
    </div>
  );
};

export default HomePage;
