document.addEventListener("DOMContentLoaded", function() {
  const outputElement = document.getElementById("output");
  const inputElement = document.getElementById("input");
  const interactiveContent = document.querySelector(".interactive-content");

  const commands = {
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
    "contact": `You can reach me at saraf@tutanota.de`,
    "profile": `This is my profile. Details coming soon...`,
    "skills": `Skills: JavaScript, HTML/CSS, React, Node.js, Python.`,
    "curriculumvitae": `CV: Link to your CV (not implemented yet).`,
    "news": `Actuel news: actual news are received, you can see them in an interactive window.`,
    "blog": `Blog: Some blog that is in the process of development.`,
    "packages": `Packages: Here is a list of packages I have created.`,
    "clear": () => outputElement.innerHTML = "",
    "help": () => showHelp(),
    "time": () => showCurrentTime(),
    "enable": () => {
      interactiveContent.classList.remove("hidden"); // Remove class hidden
      isInteractiveContentEnabled = true; // Set the flag to true
      printToConsole("Interactive content enabled.");
      updateSwitchButton(); // Update the button
    },
    "disable": () => {
      interactiveContent.classList.add("hidden"); // Add class hidden
      isInteractiveContentEnabled = false; // Set the flag to false
      printToConsole("Interactive content disabled.");
      updateSwitchButton(); // Update the button
    }
  };
  
  let timeLine = null; // Variable to store the time line for updating

  // Print message to console
  function printToConsole(text) {
    outputElement.innerHTML += `> ${text}\n`;
    outputElement.scrollTop = outputElement.scrollHeight; // Scroll to bottom
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
    printToConsole("link - View available legal Norms");
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

  // Function to update the interactive content based on the command
  function updateInteractiveContent(command) {
    switch (command) {
      case "about":
        interactiveContent.innerHTML = `
        <div style="width: 100%; height: 130vh; display: flex; justify-content: center; align-items: center;">
          <iframe src="/pdf/about/about.pdf" width="100%" height="100%" style="border: none;"></iframe>
        </div>`;
      break;

      case "projects":
        interactiveContent.innerHTML = `
        <div style="width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;">
          <iframe src="/pdf/project/Projects.pdf" width="100%" height="100%" style="border: none;"></iframe>
        </div>`;
        break;

      case "contact":
        interactiveContent.innerHTML = `<h2>Contact</h2><p>You can reach me at saraf@tutanota.de.</p>`;
        break;
      case "profile":
        interactiveContent.innerHTML = `<h2>Skills</h2><p>This is my profile. Details coming soon...</p>`;
        break;
      case "curriculumvitae":
        interactiveContent.innerHTML = `<h2>Curriculum Vitae</h2><p>CV: Link to my CV (not implemented yet).</p>`;
        break;
      case "news":
        interactiveContent.innerHTML = `
        <div style="text-align: center; margin-top: 5px; width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;">
          <iframe src="/pdf/news/Oxford_2024.pdf" width="100%" height="100%" style="border: none;"></iframe>
        </div>`;
        break;
      case "blog":
        interactiveContent.innerHTML = `<h2>MY BLOG</h2><p>Some Blog will in 2025.</p>`;
        break;
      case "links":
        interactiveContent.innerHTML = `<h2>Links</h2><p>Here is a list of links I have created.</p>`;
        break;
      default:
        interactiveContent.innerHTML = `<h2>Welcome</h2><p>Select a command to see more information.</p>`;
        break;
    }
  }
  // Handler for clicks on links in the menu
  document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const command = this.getAttribute("data-command");
      updateInteractiveContent(command);
      menu.classList.remove("show"); // Close menu after click
    });
  });

  // Menu button click handler
  const menuButton = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuButton.addEventListener("click", function () {
    menu.classList.toggle("show"); // Toggle the menu display
  });

  // Close the menu when clicking anywhere else
  document.addEventListener("click", function (event) {
    if (!menu.contains(event.target) && event.target !== menuButton) {
      menu.classList.remove("show");
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
