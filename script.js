/*
  ORBIT COMMUNITY WEBSITE
  -----------------------
  Edit the arrays below to customize members, showcases and staff.
  This starter version uses local demo data. It does not yet have
  accounts, a live database, or a secure admin dashboard.
*/

const members = [
  { name: "Nova", handle: "@nova", xp: 2450, level: 24, role: "Community Builder", bio: "Building useful things and helping the community grow.", projects: 4, color: 1, links: [{label:"Website",url:"https://example.com"}] },
  { name: "Vortex", handle: "@vortex", xp: 2120, level: 21, role: "Creative", bio: "Interested in design, digital projects and creative ideas.", projects: 3, color: 2, links: [] },
  { name: "Aether", handle: "@aether", xp: 1890, level: 19, role: "Developer", bio: "Turning concepts into working projects, one commit at a time.", projects: 5, color: 3, links: [] },
  { name: "Pixel", handle: "@pixel", xp: 1640, level: 16, role: "Designer", bio: "Making interfaces feel simple, clear and enjoyable.", projects: 2, color: 4, links: [] },
  { name: "Echo", handle: "@echo", xp: 1430, level: 14, role: "Contributor", bio: "Always happy to share feedback and support other members.", projects: 2, color: 5, links: [] },
  { name: "Cipher", handle: "@cipher", xp: 1190, level: 12, role: "Member", bio: "Exploring technology and learning something new every day.", projects: 1, color: 1, links: [] }
];

const showcases = [
  { title: "Nexus UI Kit", category: "Design", author: "Nova", description: "A clean interface kit focused on consistency and usability.", art: "NEXUS", color: 1 },
  { title: "Greenfield", category: "Development", author: "Aether", description: "A small web experiment exploring modern layouts.", art: "GREEN", color: 2 },
  { title: "After Hours", category: "Media", author: "Vortex", description: "A visual series experimenting with light, contrast and mood.", art: "AFTER", color: 3 },
  { title: "Personal Portfolio", category: "Development", author: "Pixel", description: "A responsive portfolio concept with a minimal visual style.", art: "PORTFOLIO", color: 4 },
  { title: "Studio Notes", category: "Design", author: "Echo", description: "A collection of layout explorations and design notes.", art: "STUDIO", color: 5 },
  { title: "Community Toolkit", category: "Other", author: "Cipher", description: "A set of useful resources created for fellow members.", art: "TOOLKIT", color: 6 }
];

const staff = [
  { name: "Nova", role: "Community Lead", bio: "Oversees the community and helps shape its direction.", color: 1 },
  { name: "Vortex", role: "Administrator", bio: "Supports day-to-day operations and community management.", color: 2 },
  { name: "Aether", role: "Administrator", bio: "Helps maintain the platform and its technical projects.", color: 3 },
  { name: "Pixel", role: "Moderator", bio: "Keeps conversations constructive, helpful and welcoming.", color: 4 },
  { name: "Echo", role: "Moderator", bio: "Assists members and helps answer community questions.", color: 5 },
  { name: "Cipher", role: "Support", bio: "Helps members find their way around the community.", color: 1 }
];

const initials = name => name.slice(0, 1).toUpperCase();
const avatar = (name, color, extra = "") => `<div class="avatar color-${color} ${extra}">${initials(name)}</div>`;
const formatXP = xp => xp.toLocaleString("en-US");

function renderStats() {
  document.getElementById("memberCount").textContent = members.length;
  document.getElementById("showcaseCount").textContent = showcases.length;
  document.getElementById("staffCount").textContent = staff.length;
  document.getElementById("totalXp").textContent = (members.reduce((sum, m) => sum + m.xp, 0) / 1000).toFixed(1) + "k";
}

function openProfile(member) {
  const sorted = [...members].sort((a,b) => b.xp - a.xp);
  const rank = sorted.findIndex(m => m.name === member.name) + 1;
  document.getElementById("modalAvatar").className = `avatar avatar-xl color-${member.color}`;
  document.getElementById("modalAvatar").textContent = initials(member.name);
  document.getElementById("modalName").textContent = member.name;
  document.getElementById("modalRole").textContent = `${member.handle} · ${member.role}`;
  document.getElementById("modalBio").textContent = member.bio;
  document.getElementById("modalXp").textContent = formatXP(member.xp);
  document.getElementById("modalRank").textContent = `#${rank}`;
  document.getElementById("modalProjects").textContent = member.projects;
  const links = document.getElementById("modalLinks");
  links.innerHTML = (member.links || []).map(link => `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label} ↗</a>`).join("");
  document.getElementById("profileModal").classList.add("open");
  document.getElementById("profileModal").setAttribute("aria-hidden", "false");
}

function memberCard(member) {
  return `<article class="member-card" tabindex="0" role="button" aria-label="View ${member.name}'s profile">
    <div class="member-top">${avatar(member.name, member.color)}
      <div><div class="member-name">${member.name}</div><div class="member-handle">${member.handle}</div></div>
      <span class="member-xp">${formatXP(member.xp)} XP</span>
    </div><p class="member-bio">${member.bio}</p>
  </article>`;
}

function renderMembers(list = members) {
  const grid = document.getElementById("memberGrid");
  grid.innerHTML = list.length ? list.map(memberCard).join("") : '<div class="empty-state">No members found. Try another search.</div>';
  document.getElementById("memberResultCount").textContent = `${list.length} member${list.length === 1 ? "" : "s"}`;
  grid.querySelectorAll(".member-card").forEach((card, index) => {
    const member = list[index];
    card.addEventListener("click", () => openProfile(member));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openProfile(member); }
    });
  });
}

function renderTopMembers() {
  document.getElementById("homeTopMembers").innerHTML = [...members].sort((a,b) => b.xp - a.xp).slice(0,3).map(memberCard).join("");
  document.querySelectorAll("#homeTopMembers .member-card").forEach((card, index) => {
    card.addEventListener("click", () => openProfile([...members].sort((a,b) => b.xp - a.xp)[index]));
  });
}

function renderLeaderboard() {
  const sorted = [...members].sort((a,b) => b.xp - a.xp);
  document.getElementById("leaderboardRows").innerHTML = sorted.map((member, index) => `
    <div class="leader-row">
      <span class="rank ${index < 3 ? "top-rank" : ""}">#${String(index + 1).padStart(2,"0")}</span>
      <div class="leader-user">${avatar(member.name, member.color)}<div><div class="member-name">${member.name}</div><div class="member-handle">${member.handle}</div></div></div>
      <span class="leader-xp">${formatXP(member.xp)} XP</span>
      <span class="leader-level">LEVEL ${member.level}</span>
    </div>`).join("");
  document.querySelectorAll("#leaderboardRows .leader-row").forEach((row, index) => row.addEventListener("click", () => openProfile(sorted[index])));
  document.querySelectorAll("#leaderboardRows .leader-row").forEach(row => { row.style.cursor = "pointer"; });
}

function renderShowcases() {
  const query = document.getElementById("showcaseSearch").value.toLowerCase();
  const category = document.getElementById("showcaseFilter").value;
  const filtered = showcases.filter(item =>
    (category === "all" || item.category === category) &&
    `${item.title} ${item.author} ${item.description}`.toLowerCase().includes(query)
  );
  document.getElementById("showcaseGrid").innerHTML = filtered.length ? filtered.map(item => `
    <article class="showcase-card">
      <div class="showcase-art art-${item.color}">${item.art}</div>
      <div class="showcase-content">
        <div class="showcase-meta"><span>${item.category}</span><span>COMMUNITY PICK</span></div>
        <h3>${item.title}</h3><p>${item.description}</p>
        <div class="showcase-author">Created by <strong>${item.author}</strong></div>
      </div>
    </article>`).join("") : '<div class="empty-state">No showcases match your search.</div>';
}

function renderStaff() {
  document.getElementById("staffGrid").innerHTML = staff.map(person => `
    <article class="staff-card">${avatar(person.name, person.color)}
      <h3>${person.name}</h3><div class="staff-role">${person.role}</div><p>${person.bio}</p>
    </article>`).join("");
}

function navigate() {
  const page = location.hash.replace("#", "") || "home";
  const validPages = ["home", "leaderboard", "showcases", "staff"];
  const target = validPages.includes(page) ? page : "home";
  document.querySelectorAll(".page-section").forEach(section => section.classList.toggle("active", section.id === target));
  document.querySelectorAll(".nav-link").forEach(link => link.classList.toggle("active", link.dataset.page === target));
  document.getElementById("navLinks").classList.remove("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("memberSearch").addEventListener("input", event => {
  const query = event.target.value.toLowerCase();
  renderMembers(members.filter(member => `${member.name} ${member.handle} ${member.role}`.toLowerCase().includes(query)));
});
document.getElementById("showcaseSearch").addEventListener("input", renderShowcases);
document.getElementById("showcaseFilter").addEventListener("change", renderShowcases);
document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", nav.classList.contains("open"));
});
document.getElementById("modalClose").addEventListener("click", closeProfile);
document.getElementById("profileModal").addEventListener("click", event => {
  if (event.target.id === "profileModal") closeProfile();
});
document.addEventListener("keydown", event => { if (event.key === "Escape") closeProfile(); });
function closeProfile() {
  document.getElementById("profileModal").classList.remove("open");
  document.getElementById("profileModal").setAttribute("aria-hidden", "true");
}
window.addEventListener("hashchange", navigate);
document.getElementById("year").textContent = new Date().getFullYear();

renderStats();
renderTopMembers();
renderMembers();
renderLeaderboard();
renderShowcases();
renderStaff();
navigate();
