import React from 'react';
import github_light from "../../images/github-light.svg"
const GITHUB_URL = "https://github.com/theobourgeois"

function Footer() {
  

  return (
    <footer className="flex absolute left-0 bottom-0 m-2">
      <div className="flex items-center">
        <img onClick={()=> window.open(GITHUB_URL)} className="mr-2 w-6 h-6 md:w-4 md:h-4 " src={github_light} alt="github logo"></img>
        <a className="text-gray-300 text-xs hover:text-blue-500 hidden md:block" rel="noopener noreferrer" href={GITHUB_URL} target="_blank">github.com/theobourgeois</a>
      </div>
    </footer>
  );
}

export default Footer;
