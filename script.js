/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));

/* ===== FADE-IN ON SCROLL ===== */
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold:0.2, rootMargin:"0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

/* ===== GALLERY THUMBNAILS ===== */
const displayedImg = document.getElementById("displayed-img");
const thumbnails = document.querySelectorAll(".thumbnails img");
thumbnails.forEach(img => img.addEventListener("click", () => displayedImg.src = img.src));

/* ===== MOVIE LIST ===== */
let movies = JSON.parse(localStorage.getItem("movies")) || ["Inception","Interstellar","The Dark Knight","Avengers: Endgame","The Matrix"];
const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("searchInput");
const newMovieInput = document.getElementById("newMovieInput");
const addMovieBtn = document.getElementById("addMovieBtn");
function renderMovies(list){
  movieList.innerHTML = "";
  list.forEach((movie, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${movie} <button class="deleteMovie" data-index="${index}">✖</button>`;
    movieList.appendChild(li);
  });
}
function saveMovies(){ localStorage.setItem("movies", JSON.stringify(movies)); }
function filteredMovies(){ const query=searchInput.value.toLowerCase(); return movies.filter(m=>m.toLowerCase().includes(query)); }
addMovieBtn.addEventListener("click", ()=>{
  const newMovie = newMovieInput.value.trim();
  if(!newMovie) return;
  movies.push(newMovie);
  newMovieInput.value="";
  saveMovies();
  renderMovies(filteredMovies());
});
movieList.addEventListener("click", e=>{
  if(e.target.classList.contains("deleteMovie")){
    const index = e.target.dataset.index;
    movies.splice(index,1);
    saveMovies();
    renderMovies(filteredMovies());
  }
});
searchInput.addEventListener("input", ()=>renderMovies(filteredMovies()));
renderMovies(movies);

/* ===== TO-DO LIST ===== */
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
function saveTasks(){ localStorage.setItem("tasks", taskList.innerHTML); }
function loadTasks(){ const saved=localStorage.getItem("tasks"); if(saved) taskList.innerHTML=saved; }
addBtn.addEventListener("click",()=>{
  const task = taskInput.value.trim();
  if(!task) return;
  const li = document.createElement("li");
  li.innerHTML = `<span>${task}</span><div><button class="complete">✔</button><button class="delete">✖</button></div>`;
  taskList.appendChild(li);
  taskInput.value="";
  saveTasks();
});
taskList.addEventListener("click", e=>{
  if(e.target.classList.contains("delete")){ e.target.closest("li").remove(); saveTasks(); }
  if(e.target.classList.contains("complete")){ e.target.closest("li").classList.toggle("completed"); saveTasks(); }
});
loadTasks();

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById("contactForm");
const errorMsg = document.getElementById("error-msg");
contactForm.addEventListener("submit", e=>{
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const message = document.getElementById("message").value.trim();
  if(!name||!email||!password||!confirm||!message){ errorMsg.textContent="Please fill in all fields!"; return; }
  if(password!==confirm){ errorMsg.textContent="Passwords do not match!"; return; }
  alert(`Thank you, ${name}! Your message has been sent.`);
  contactForm.reset();
  errorMsg.textContent="";
});

/* ===== DYNAMIC COUNTDOWN ===== */
const countdownElement = document.getElementById("countdown-timer");
const occasionNameInput = document.getElementById("occasionName");
const occasionDateInput = document.getElementById("occasionDate");
const occasionTimeInput = document.getElementById("occasionTime");
const startBtn = document.getElementById("startCountdown");
let countdownInterval;

startBtn.addEventListener("click", ()=>{
  const occasionName = occasionNameInput.value.trim() || "Special Occasion";
  const date = occasionDateInput.value;
  const time = occasionTimeInput.value || "00:00";
  if(!date){ alert("Please select a valid date!"); return; }
  const targetDate = new Date(`${date}T${time}`).getTime();
  if(countdownInterval) clearInterval(countdownInterval);
  function updateCountdown(){
    const now = new Date().getTime();
    const distance = targetDate - now;
    if(distance <= 0){ countdownElement.textContent = `🎉 ${occasionName} is here!`; clearInterval(countdownInterval); return; }
    const days = Math.floor(distance/(1000*60*60*24));
    const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
    const minutes = Math.floor((distance%(1000*60*60))/(1000*60));
    const seconds = Math.floor((distance%(1000*60))/1000);
    countdownElement.textContent = `${occasionName}: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
});
