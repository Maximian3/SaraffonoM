document.addEventListener("DOMContentLoaded", function() {
  const outputElement = document.getElementById("output");
  const inputElement = document.getElementById("input");
  const interactiveContent = document.querySelector(".interactive-content");

  // Add a variable to track the current state of interactive content
  let isInteractiveContentEnabled = true;

  const commands = {
    
    "default": `Welcome to the terminal of the personal website SaraffonoM.
    Use se the commands in the terminal or the navigation menu to browse the site.`,

    "about": `<p>Hello, I'm Maximus. I'm a full-stack developer and designer.
    <p> My website serves several purposes:
    Showcase of professional skills — presenting my experience in law and IT development.

    Portfolio of IT projects — showcasing examples of web applications and solutions I have developed.

    Discussion of legal and IT solutions — publishing articles about the legal aspects of technology.

    Contact information — providing an easy way for clients and employers to get in touch.

    Sharing experiments and research — a platform to share the results of my IT experiments.

    Resume and career — a section to display career achievements and professional growth.

    Personal branding — building an online presence to attract new clients and career opportunities.`,

    "projects": `\n1. Project <a href="https://maximian3.github.io/WebCrypt-2025/index.html">WebCrypt</a> .\n2. Project  "OROS".\n3. New project : a new project is planned in 2025.`,

    "contact": `You can reach me at saraf@tutanota.de or check out my github page  <a href="https://github.com/Maximian3" </a>GitHub</p>`,

    "profile": `This is my profile. Details coming soon...`,

    "skills": `Skills: JavaScript, HTML/CSS, Node.js, Python, Java.`,

    "lnorms": `<h2>Legal Norms for IT Laws in Europe</h2>
      <p>
        Regulation (EU) 2016/679, effective since May 25, 2018, establishes rules for the processing of personal data and protects the rights of data subjects.

        Directive (EU) 2022/2555 aims to improve cybersecurity across the EU by setting requirements for the security of networks and information systems.
        
        Regulation (EU) 2022/2065 regulates the responsibility and transparency of online platforms, including content moderation and advertising requirements.

        Regulation (EU) 2022/1925 focuses on ensuring fair competition in digital markets, establishing rules for large online platforms.

        Regulation (EU) 2019/881 sets out the framework for cybersecurity product and service certification in the EU.

        For more detailed information, visit the official EUR-Lex website:
        <a href="https://eur-lex.europa.eu/browse/directories/legislation.html" 
      </p>`,

    "news": `Actuel news: actual news are received, you can see them in an interactive window.`,

    "blog": `Blog: Some blog that is in the process of development.`,

    "packages": `Packages: Here is a list of packages I have created.`,

    "experiments": `Packages: watch YouTube without ads *legal and free!
    <a href="#" onclick="convertYouTubeLink()">Convert YouTube Link</a>`,

    "clear": () => outputElement.innerHTML = "",
    "help": () => showHelp(),
    "time": () => showCurrentTime(),
    "enable": () => {
      interactiveContent.classList.remove("hidden"); // Remove class hidden
      isInteractiveContentEnabled = true; // Set the flag to true
      printToConsole("Interactive content enabled.");
      updateSwitchButton(); // Updating the button
    },

    "disable": () => {
      interactiveContent.classList.add("hidden"); // Add class hidden
      isInteractiveContentEnabled = false; // Set the flag to false
      printToConsole("Interactive content disabled.");
      updateSwitchButton(); 
    }
  };
  
  let timeLine = null; // Variable to store the time line for updating

  function printToConsole(text) {
    const newLine = document.createElement("div");
    newLine.innerHTML = `> ${text}`;
    outputElement.appendChild(newLine);
  }
  
  // Display available commands
  function showHelp() {
    printToConsole("available commands:");
    printToConsole("about - Learn about me");
    printToConsole("news - Show current News");
    printToConsole("projects - View my projects");
    printToConsole("profile - View my profile");
    printToConsole("skills - See my skills");
    printToConsole("contact - Contact information");
    printToConsole("curriculumvitae - View my CV");
    printToConsole("experiments - See my experiments");
    printToConsole("blog - See my Blog");
    printToConsole("lnorms - View available legal Norms");
    printToConsole("clear - Clear the terminal");
    printToConsole("enable - Enable interactive content");
    printToConsole("disable - Disable interactive content");
    printToConsole("help - List available commands");
  }

  // Show current time
  function showCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    const currentTime = `Current time: ${dateString} ${timeString}`;

    // If timeLine is null, we create a new line for it
    if (!timeLine) {
      timeLine = document.createElement("span");
      timeLine.textContent = currentTime;
      outputElement.appendChild(timeLine);
    } else {
      // Otherwise, we just update the existing timeLine content
      timeLine.textContent = currentTime;
    }

    // Ensure the console scrolls to the bottom
    outputElement.scrollTop = outputElement.scrollHeight;
  }

  // Handle user input (for typing commands)
  function handleInput() {
    const inputText = inputElement.value.trim().toLowerCase();
    if (commands[inputText]) {
      if (typeof commands[inputText] === "function") {
        commands[inputText](); // If it's a function, execute it
      } else {
        printToConsole(commands[inputText]);
        updateInteractiveContent(inputText); // Update right-side content based on input
      }
    } else {
      printToConsole(`Command not found: ${inputText}`);
    }
    inputElement.value = ""; // Clear input after submission
  }

  // Handle enter key press to submit command in the console
  inputElement.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      handleInput();
    }
  });

  // Handle click event on command links
  document.querySelectorAll(".command-link").forEach(link => {
    link.addEventListener("click", function(event) {
      event.preventDefault(); // Prevent default anchor link behavior
      const command = this.getAttribute("data-command");
      if (commands[command]) {
        if (typeof commands[command] === "function") {
          commands[command](); // If it's a function, execute it
        } else {
          printToConsole(commands[command]);
          updateInteractiveContent(command); // Update right-side content based on clicked link
        }
      } else {
        printToConsole(`Command not found: ${command}`);
      }
    });
  });

  // Function that update the interactive content based on the command
  function updateInteractiveContent(command) {
    switch (command) {
      case "about":
        interactiveContent.innerHTML = `
        <div style="width: 100%; height: 95vh; display: flex; justify-content: center; align-items: center;">
          <iframe src="/pdf/about/about.pdf" width="100%" height="100%" style="border: none;"></iframe>
        </div>`;
      break;

      case "projects":
        interactiveContent.innerHTML = `
        <div style="width: 100%; height: 95vh; display: flex; justify-content: center; align-items: center;">
          <iframe src="/pdf/project/Projects.pdf" width="100%" height="100%" style="border: none;"></iframe>
        </div>`;
        break;

      case "contact":
        interactiveContent.innerHTML = `
          <h2 style="font-family: 'Courier New', Courier, monospace; color: white;">Contact</h2>
          <div style="background-color: black; padding: 20px; font-family: 'Courier New', Courier, monospace; color: white; border-radius: 5px; font-size: 16px;">
            <p>You can reach me at <a href="mailto:saraf@tutanota.de?subject=Message%20from%20Portfolio%20Website" style="color: #00ff00; text-decoration: none;">saraf@tutanota.de</a>.</p>
            <p>You can also check out my GitHub page: <a href="https://github.com/Maximian3" style="color: #00ff00; text-decoration: none;">GitHub</a></p>
            <p style="color: #ff4500;">Type your message below and hit Enter to send!</p>
          </div>
        `;
        break;

        
      case "profile":
        interactiveContent.innerHTML = `<h2>Profil</h2><p>This is my profile. Details coming soon...</p>`;
        break;

        case "skills":
          interactiveContent.innerHTML = `<h2>Skills</h2><p>Skills: JavaScript, HTML/CSS, Node.js, Python, Java... Details coming soon...</p>`;
          break;  

        case "lnorms":
          interactiveContent.innerHTML = `
            <div style="margin: 0; padding: 20px; display: block; text-align: left;">
              <h2>Legal Norms for IT Laws in Europe</h2>
              <p>
                <strong>1. General Data Protection Regulation (GDPR)</strong><br>
                Regulation (EU) 2016/679, effective since May 25, 2018, establishes rules for the processing of personal data and protects the rights of data subjects.<br>
                More details: <a href="https://gdpr-info.eu" target="_blank">https://gdpr-info.eu</a><br><br>

                <strong>2. NIS2 Directive</strong><br>
                Directive (EU) 2022/2555 aims to improve cybersecurity across the EU by setting requirements for the security of networks and information systems.<br>
                More details: <a href="https://www.mhc.ie/latest/insights/eu-cybersecurity-laws" target="_blank">https://www.mhc.ie/latest/insights/eu-cybersecurity-laws</a><br><br>

                <strong>3. Digital Services Act (DSA)</strong><br>
                Regulation (EU) 2022/2065 regulates the responsibility and transparency of online platforms, including content moderation and advertising requirements.<br>
                More details: <a href="https://ec.europa.eu/info/law/law-topic/data-protection_en" target="_blank">https://ec.europa.eu/info/law/law-topic/data-protection_en</a><br><br>

                <strong>4. Digital Markets Act (DMA)</strong><br>
                Regulation (EU) 2022/1925 focuses on ensuring fair competition in digital markets, establishing rules for large online platforms.<br>
                More details: <a href="https://ec.europa.eu/competition-policy/overview_en" target="_blank">https://ec.europa.eu/competition-policy/overview_en</a><br><br>

                <strong>5. EU Cybersecurity Act</strong><br>
                Regulation (EU) 2019/881 sets out the framework for cybersecurity product and service certification in the EU.<br>
                More details: <a href="https://transport.ec.europa.eu/transport-themes/security-safety/cybersecurity_en" target="_blank">https://transport.ec.europa.eu/transport-themes/security-safety/cybersecurity_en</a><br><br>

                For more detailed information, visit the official EUR-Lex website:<br>
                <a href="https://eur-lex.europa.eu/browse/directories/legislation.html" target="_blank">https://eur-lex.europa.eu/browse/directories/legislation.html</a>
              </p>
            </div>
          `;
          break;

      case "news":
        interactiveContent.innerHTML = `
        <div style="text-align: center; margin-top: 5px; width: 100%; height: 95vh; display: flex; justify-content: center; align-items: center;">
          <iframe src="/pdf/news/Oxford_2024.pdf" width="100%" height="100%" style="border: none;"></iframe>
        </div>`;
        break;
      case "blog":
        interactiveContent.innerHTML = `<h2>MY BLOG</h2><p>Some Blog will in 2025.</p>`;
        break;
      case "links":
        interactiveContent.innerHTML = `<h2>Links</h2><p>Here is a list of links I have created.</p>`;
        break;

        case "experiments":
          interactiveContent.innerHTML = `<h2>Links</h2><p> When you click on the “ YouTube Link”  a dialog box will appear where you need to enter the link to the YouTube video.
           Аfter entering the correct link, a new window will appear. 
           <a href="#" onclick="convertYouTubeLink()">YouTube Link</a>.</p>`;
          break;  

      default:
        interactiveContent.innerHTML = `<h2>Welcome on personal website SaraffonoM</h2><p>Use the commands in the terminal or the navigation menu to browse the site.</p>`;
        break;
    }
  }

  function openEmailForm() {
    // create a window with a form for entering a message
    let emailForm = `
      <div style="width: 300px; padding: 20px; background-color: white; border: 1px solid #ccc; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h3>Send a Message</h3>
        <form action="mailto:saraf@tutanota.de" method="post" enctype="text/plain">
          <label for="subject">Subject:</label><br>
          <input type="text" id="subject" name="subject" style="width: 100%; padding: 5px; margin-bottom: 10px;" required><br>
          <label for="message">Message:</label><br>
          <textarea id="message" name="message" style="width: 100%; padding: 5px;" rows="5" required></textarea><br><br>
          <input type="submit" value="Send">
        </form>
        <button onclick="closeEmailForm()">Cancel</button>
      </div>
    `;
    
    let modal = document.createElement('div');
    modal.innerHTML = emailForm;
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.zIndex = '1000';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    
    document.body.appendChild(modal);
  }
  
  function closeEmailForm() {
    // Close the form
    let modal = document.querySelector('div[style*="position: fixed"]');
    modal.remove();
  }
  
  // Menu Link Click Handler
  document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const command = this.getAttribute("data-command");
      updateInteractiveContent(command);
      menu.classList.remove("show"); // Close menu after click
    });
  });

  const menuButton = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  
  // Menu button click handler
  menuButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Stop the event bubbling so that the document handler doesn't fire
    menu.classList.toggle("show"); // Toggle class to show/hide menu
    menu.classList.remove("hidden"); // Remove hiding from menu
  });
  
  // Close menu when clicking outside its area
  document.addEventListener("click", function (event) {
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
      menu.classList.remove("show");
      menu.classList.add("hidden"); // Hide the menu if the click was not on the menu or button
    }
  });
  

  // Initial message
  printToConsole("Welcome to the terminal of the personal website SaraffonoM.");
  printToConsole("Type 'help' for a list of commands.");

  // Focus the input field automatically when the page loads
  inputElement.focus();

  // Update time every second
  setInterval(showCurrentTime, 1000);

  
});
