const links = document.querySelectorAll("nav ul li a");
links.forEach((link) => {
  link.addEventListener("click", function (event) {
    links.forEach((link) => {
      link.classList.remove("active");
    });
    this.classList.add("active");
  });
});

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});

// email
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_u2xqlbo", "template_vkslqpf", this).then(
      function () {
        document.getElementById("response-message").innerText =
          "Message sent successfully!";
      },
      function (error) {
        document.getElementById("response-message").innerText =
          "Failed to send message. Please try again.";
        console.log("FAILED...", error);
      }
    );

    this.reset();
  });

// bloglist
fetch("http://localhost:3000/api/post")
  .then((res) => res.json())
  .then((posts) => {
    const blogList = document.getElementById("blogList");
    blogList.innerHTML = "";

    posts.forEach((post) => {
      const snippet = post.blog_content.slice(0, 100) + "...";

      const card = `       <div class="card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">${post.blog_title}</h5>
            <p class="card-text">
             ${snippet}
            </p>
            <a href="blog.html?id=${post.blog_id}" class="btn btn-primary">Read</a>
          </div>
        </div>`;
      blogList.innerHTML += card;
    });
  })
  .catch((err) => {
    document.getElementById("blogList").innerText = "Failed to load blogs.";
    console.error("Blog fetch error:", err);
  });

// post blog

