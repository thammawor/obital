<script lang="ts">
import favicon from '$lib/assets/favicon.svg';

let { children } = $props();
</script>

<svelte:head>
<link rel="icon" href={favicon} />
<title>🌟 AstroBlog - บล็อกโหราศาสตร์และระบบคำนวณดวงชะตา</title>
</svelte:head>

<div class="container">
<header>
<nav>
<div class="logo">
<a href="/">🌟 AstroBlog - บล็อกโหราศาสตร์</a>
</div>
<ul class="nav-links">
<li><a href="/">หน้าแรก</a></li>
<li><a href="/blog">บทความ</a></li>
<li class="dropdown">
<span class="dropdown-trigger">คำนวณดวง ▼</span>
<ul class="dropdown-menu">
<li><a href="/astrology/birth-chart">ดวงชะตาแรกเกิด</a></li>
<li><a href="/astrology/transits">ดาวจร</a></li>
<li><a href="/astrology/synastry">ดวงคู่สมพงศ์</a></li>
</ul>
</li>
</ul>
</nav>
</header>

<main>
{@render children()}
</main>

<footer>
<p>© 2024 AstroBlog - บล็อกโหราศาสตร์และระบบคำนวณดวงชะตา</p>
<p>สร้างด้วย Svelte 5 และ SvelteKit</p>
</footer>
</div>

<style>
:global(body) {
margin: 0;
padding: 0;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
color: #eee;
min-height: 100vh;
}

.container {
min-height: 100vh;
display: flex;
flex-direction: column;
}

header {
background: rgba(0, 0, 0, 0.3);
backdrop-filter: blur(10px);
border-bottom: 1px solid rgba(255, 255, 255, 0.1);
position: sticky;
top: 0;
z-index: 100;
}

nav {
max-width: 1200px;
margin: 0 auto;
padding: 1rem 2rem;
display: flex;
justify-content: space-between;
align-items: center;
}

.logo a {
font-size: 1.5rem;
font-weight: bold;
color: #ffd700;
text-decoration: none;
text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.nav-links {
list-style: none;
display: flex;
gap: 2rem;
margin: 0;
padding: 0;
position: relative;
}

.nav-links a {
color: #fff;
text-decoration: none;
transition: color 0.3s;
}

.nav-links a:hover {
color: #ffd700;
}

.dropdown {
position: relative;
}

.dropdown-trigger {
color: #fff;
cursor: pointer;
transition: color 0.3s;
}

.dropdown-trigger:hover {
color: #ffd700;
}

.dropdown-menu {
display: none;
position: absolute;
top: 100%;
left: 0;
background: rgba(0, 0, 0, 0.9);
list-style: none;
padding: 0.5rem 0;
border-radius: 8px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
min-width: 150px;
z-index: 101;
}

.dropdown:hover .dropdown-menu {
display: block;
}

.dropdown-menu li {
padding: 0;
}

.dropdown-menu a {
display: block;
padding: 0.75rem 1.5rem;
color: #fff;
text-decoration: none;
transition: background 0.3s;
}

.dropdown-menu a:hover {
background: rgba(255, 215, 0, 0.2);
}

main {
flex: 1;
max-width: 1200px;
margin: 0 auto;
padding: 2rem;
width: 100%;
box-sizing: border-box;
}

footer {
background: rgba(0, 0, 0, 0.3);
border-top: 1px solid rgba(255, 255, 255, 0.1);
padding: 2rem;
text-align: center;
color: #aaa;
}

footer p {
margin: 0.5rem 0;
}

@media (max-width: 768px) {
nav {
flex-direction: column;
gap: 1rem;
}

.nav-links {
flex-wrap: wrap;
justify-content: center;
gap: 1rem;
}
}
</style>
