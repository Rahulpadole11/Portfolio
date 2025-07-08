// ========== PAGE TRANSITION EFFECT ==========
document.addEventListener('DOMContentLoaded', function () {
  // Add transition classes when the page loads
  document.body.classList.add('page-transition');
  setTimeout(function () {
    document.body.classList.add('page-transition-visible');
  }, 100);

  // Apply transition to internal links (excluding anchor/hash links)
  const internalLinks = document.querySelectorAll(
    'a[href^="/"], a[href^="./"], a[href^="../"], a[href^="index"], a[href^="work"], a[href^="about"]'
  );

  internalLinks.forEach(link => {
    if (!link.getAttribute('target')) {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip hash-based navigation
        if (!href.startsWith('#')) {
          e.preventDefault();

          // Trigger exit animation
          document.body.classList.remove('page-transition-visible');

          // Navigate after fade-out
          setTimeout(function () {
            window.location.href = href;
          }, 300);
        }
      });
    }
  });
});

// ========== RESUME DOWNLOAD FUNCTION ==========
document.getElementById("downloadBtn").addEventListener("click", function () {
  const link = document.createElement("a");
  link.href = "./resume/resume.pdf"; // File path
  link.download = "Rahul_Padole_Resume.pdf"; // Desired download name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
