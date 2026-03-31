<script lang="ts">
import { blogStore } from '$lib/stores/blog';
import type { BlogPost } from '$lib/types/astrology';

let posts: BlogPost[] = $state([]);

$effect(() => {
posts = blogStore.getRecent(10);
});
</script>

<div class="home">
<section class="hero">
<h1>🌟 欢迎来到占星博客 AstroBlog</h1>
<p class="subtitle">深度占星学研究与计算平台</p>
<p class="description">
探索宇宙的奥秘，了解行星运动如何影响我们的生活。
提供详细的出生星盘计算、流年运势分析和合盘解读。
</p>
<div class="cta-buttons">
<a href="/astrology/birth-chart" class="btn btn-primary">开始计算星盘</a>
<a href="/blog" class="btn btn-secondary">阅读博客文章</a>
</div>
</section>

<section class="features">
<h2>✨ 功能特色</h2>
<div class="feature-grid">
<div class="feature-card">
<div class="feature-icon">🔮</div>
<h3>出生星盘计算</h3>
<p>精确计算你的出生星盘，包括太阳、月亮、上升星座和所有行星位置</p>
</div>
<div class="feature-card">
<div class="feature-icon">📊</div>
<h3>相位分析</h3>
<p>深入分析行星之间的相位关系，揭示内在的心理动态</p>
</div>
<div class="feature-card">
<div class="feature-icon">🌙</div>
<h3>月相追踪</h3>
<p>跟随月亮的周期生活，了解月相对情绪和行为的影响</p>
</div>
<div class="feature-card">
<div class="feature-icon">💕</div>
<h3>合盘分析</h3>
<p>比较两个人的星盘，探索关系的兼容性和挑战</p>
</div>
<div class="feature-card">
<div class="feature-icon">📅</div>
<h3>流年运势</h3>
<p>查看当前和未来的行星过境，把握时机</p>
</div>
<div class="feature-card">
<div class="feature-icon">📚</div>
<h3>占星知识</h3>
<p>丰富的博客文章，从入门到进阶的占星学知识</p>
</div>
</div>
</section>

<section class="recent-posts">
<h2>📝 最新文章</h2>
<div class="posts-grid">
{#each posts as post}
<article class="post-card">
<h3><a href="/blog/{post.slug}">{post.title}</a></h3>
<p class="excerpt">{post.excerpt}</p>
<div class="meta">
<span class="author">{post.author}</span>
<span class="date">{post.publishedDate}</span>
<span class="read-time">{post.readTime} 分钟阅读</span>
</div>
<div class="tags">
{#each post.tags as tag}
<span class="tag">{tag}</span>
{/each}
</div>
</article>
{/each}
</div>
<div class="view-all">
<a href="/blog" class="btn btn-secondary">查看全部文章 →</a>
</div>
</section>

<section class="about-astrology">
<h2>🌌 什么是占星术？</h2>
<p>
占星术是一门古老的学问，通过研究天体的位置和运动来理解人类的性格、命运和生活模式。
虽然现代科学对占星术持怀疑态度，但数千年来，它一直是人类理解自我和世界的重要工具。
</p>
<p>
我们的平台使用先进的天文算法，结合传统的占星学智慧，为你提供准确而深入的星盘解读。
无论你是占星学初学者还是资深爱好者，都能在这里找到有价值的信息和工具。
</p>
</section>
</div>

<style>
.home {
max-width: 1200px;
margin: 0 auto;
}

.hero {
text-align: center;
padding: 4rem 2rem;
background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 100, 100, 0.1) 100%);
border-radius: 16px;
margin-bottom: 4rem;
}

.hero h1 {
font-size: 3rem;
margin-bottom: 1rem;
color: #ffd700;
text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}

.subtitle {
font-size: 1.5rem;
color: #aaa;
margin-bottom: 1.5rem;
}

.description {
font-size: 1.1rem;
line-height: 1.8;
max-width: 800px;
margin: 0 auto 2rem;
color: #ccc;
}

.cta-buttons {
display: flex;
gap: 1rem;
justify-content: center;
flex-wrap: wrap;
}

.btn {
padding: 1rem 2rem;
border-radius: 8px;
text-decoration: none;
font-weight: bold;
transition: all 0.3s;
display: inline-block;
}

.btn-primary {
background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
color: #1a1a2e;
}

.btn-primary:hover {
transform: translateY(-2px);
box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
}

.btn-secondary {
background: rgba(255, 255, 255, 0.1);
color: #fff;
border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
background: rgba(255, 255, 255, 0.2);
border-color: #ffd700;
}

.features {
margin-bottom: 4rem;
}

.features h2 {
text-align: center;
font-size: 2.5rem;
margin-bottom: 3rem;
color: #ffd700;
}

.feature-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 2rem;
}

.feature-card {
background: rgba(255, 255, 255, 0.05);
padding: 2rem;
border-radius: 12px;
border: 1px solid rgba(255, 255, 255, 0.1);
transition: all 0.3s;
}

.feature-card:hover {
transform: translateY(-5px);
background: rgba(255, 255, 255, 0.08);
border-color: rgba(255, 215, 0, 0.3);
}

.feature-icon {
font-size: 3rem;
margin-bottom: 1rem;
}

.feature-card h3 {
color: #ffd700;
margin-bottom: 1rem;
}

.feature-card p {
color: #aaa;
line-height: 1.6;
}

.recent-posts {
margin-bottom: 4rem;
}

.recent-posts h2 {
text-align: center;
font-size: 2.5rem;
margin-bottom: 3rem;
color: #ffd700;
}

.posts-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
gap: 2rem;
}

.post-card {
background: rgba(255, 255, 255, 0.05);
padding: 2rem;
border-radius: 12px;
border: 1px solid rgba(255, 255, 255, 0.1);
transition: all 0.3s;
}

.post-card:hover {
transform: translateY(-5px);
background: rgba(255, 255, 255, 0.08);
border-color: rgba(255, 215, 0, 0.3);
}

.post-card h3 {
margin-bottom: 1rem;
}

.post-card h3 a {
color: #ffd700;
text-decoration: none;
transition: color 0.3s;
}

.post-card h3 a:hover {
color: #fff;
}

.excerpt {
color: #aaa;
line-height: 1.6;
margin-bottom: 1.5rem;
}

.meta {
display: flex;
gap: 1rem;
flex-wrap: wrap;
font-size: 0.9rem;
color: #888;
margin-bottom: 1rem;
}

.tags {
display: flex;
gap: 0.5rem;
flex-wrap: wrap;
}

.tag {
background: rgba(255, 215, 0, 0.2);
color: #ffd700;
padding: 0.25rem 0.75rem;
border-radius: 20px;
font-size: 0.85rem;
}

.view-all {
text-align: center;
margin-top: 2rem;
}

.about-astrology {
background: rgba(255, 255, 255, 0.05);
padding: 3rem;
border-radius: 12px;
border: 1px solid rgba(255, 255, 255, 0.1);
}

.about-astrology h2 {
color: #ffd700;
margin-bottom: 1.5rem;
}

.about-astrology p {
color: #aaa;
line-height: 1.8;
margin-bottom: 1rem;
}

@media (max-width: 768px) {
.hero h1 {
font-size: 2rem;
}

.subtitle {
font-size: 1.2rem;
}

.cta-buttons {
flex-direction: column;
align-items: center;
}

.posts-grid {
grid-template-columns: 1fr;
}
}
</style>
