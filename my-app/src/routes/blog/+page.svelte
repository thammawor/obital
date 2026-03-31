<script lang="ts">
import { blogStore } from '$lib/stores/blog';
import type { BlogPost } from '$lib/types/astrology';

let posts: BlogPost[] = $state([]);
let selectedCategory = $state('all');

const categories = [
{ value: 'all', label: '全部文章' },
{ value: 'tutorial', label: '教程' },
{ value: 'interpretation', label: '解读' },
{ value: 'astrology', label: '占星' },
{ value: 'general', label: '综合' }
];

$effect(() => {
if (selectedCategory === 'all') {
posts = blogStore.getRecent(100);
} else {
posts = blogStore.getByCategory(selectedCategory);
}
});
</script>

<div class="blog-page">
<header class="page-header">
<h1>📝 博客文章</h1>
<p>探索占星学的奥秘，从入门到精通</p>
</header>

<div class="filters">
{#each categories as category}
<button 
class="filter-btn {selectedCategory === category.value ? 'active' : ''}"
onclick={() => selectedCategory = category.value}
>
{category.label}
</button>
{/each}
</div>

<div class="posts-list">
{#each posts as post}
<article class="post-card">
<div class="post-content">
<h2><a href="/blog/{post.slug}">{post.title}</a></h2>
<p class="excerpt">{post.excerpt}</p>
<div class="meta">
<span class="author">✍️ {post.author}</span>
<span class="date">📅 {post.publishedDate}</span>
<span class="read-time">⏱️ {post.readTime} 分钟阅读</span>
</div>
<div class="tags">
{#each post.tags as tag}
<span class="tag">{tag}</span>
{/each}
</div>
</div>
<a href="/blog/{post.slug}" class="read-more">阅读全文 →</a>
</article>
{:else}
<p class="no-posts">该分类下暂无文章</p>
{/each}
</div>
</div>

<style>
.blog-page {
max-width: 900px;
margin: 0 auto;
}

.page-header {
text-align: center;
margin-bottom: 3rem;
}

.page-header h1 {
font-size: 2.5rem;
color: #ffd700;
margin-bottom: 1rem;
}

.page-header p {
color: #aaa;
font-size: 1.1rem;
}

.filters {
display: flex;
gap: 1rem;
flex-wrap: wrap;
justify-content: center;
margin-bottom: 3rem;
}

.filter-btn {
padding: 0.75rem 1.5rem;
background: rgba(255, 255, 255, 0.1);
border: 2px solid rgba(255, 255, 255, 0.2);
border-radius: 25px;
color: #fff;
cursor: pointer;
transition: all 0.3s;
font-size: 0.95rem;
}

.filter-btn:hover {
background: rgba(255, 215, 0, 0.2);
border-color: #ffd700;
}

.filter-btn.active {
background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
border-color: #ffd700;
color: #1a1a2e;
}

.posts-list {
display: flex;
flex-direction: column;
gap: 2rem;
}

.post-card {
background: rgba(255, 255, 255, 0.05);
padding: 2rem;
border-radius: 12px;
border: 1px solid rgba(255, 255, 255, 0.1);
transition: all 0.3s;
display: flex;
justify-content: space-between;
align-items: flex-start;
gap: 2rem;
}

.post-card:hover {
transform: translateX(5px);
background: rgba(255, 255, 255, 0.08);
border-color: rgba(255, 215, 0, 0.3);
}

.post-content {
flex: 1;
}

.post-card h2 {
margin-bottom: 1rem;
}

.post-card h2 a {
color: #ffd700;
text-decoration: none;
transition: color 0.3s;
}

.post-card h2 a:hover {
color: #fff;
}

.excerpt {
color: #aaa;
line-height: 1.6;
margin-bottom: 1.5rem;
}

.meta {
display: flex;
gap: 1.5rem;
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

.read-more {
color: #ffd700;
text-decoration: none;
white-space: nowrap;
transition: color 0.3s;
}

.read-more:hover {
color: #fff;
}

.no-posts {
text-align: center;
color: #888;
padding: 3rem;
}

@media (max-width: 768px) {
.post-card {
flex-direction: column;
}

.read-more {
align-self: flex-start;
}
}
</style>
