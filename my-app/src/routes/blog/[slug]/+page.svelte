<script lang="ts">
import { page } from '$app/state';
import { blogStore } from '$lib/stores/blog';
import type { BlogPost } from '$lib/types/astrology';

let post: BlogPost | undefined = $state(undefined);

$effect(() => {
post = blogStore.getBySlug(page.params.slug);
});
</script>

<div class="post-detail">
{#if post}
<article>
<header class="post-header">
<h1>{post.title}</h1>
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
</header>

<div class="post-content">
{@html post.content.replace(/\n/g, '<br>')}
</div>

<footer class="post-footer">
<a href="/blog" class="back-link">← 返回博客列表</a>
</footer>
</article>
{:else}
<div class="not-found">
<h1>文章未找到</h1>
<p>抱歉，您查找的文章不存在。</p>
<a href="/blog" class="btn">返回博客列表</a>
</div>
{/if}
</div>

<style>
.post-detail {
max-width: 800px;
margin: 0 auto;
}

article {
background: rgba(255, 255, 255, 0.05);
padding: 3rem;
border-radius: 12px;
border: 1px solid rgba(255, 255, 255, 0.1);
}

.post-header {
margin-bottom: 3rem;
border-bottom: 1px solid rgba(255, 255, 255, 0.1);
padding-bottom: 2rem;
}

.post-header h1 {
font-size: 2.5rem;
color: #ffd700;
margin-bottom: 1.5rem;
line-height: 1.3;
}

.meta {
display: flex;
gap: 1.5rem;
flex-wrap: wrap;
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

.post-content {
line-height: 1.8;
color: #ccc;
}

.post-content :global(h1),
.post-content :global(h2),
.post-content :global(h3) {
color: #ffd700;
margin-top: 2rem;
margin-bottom: 1rem;
}

.post-content :global(h1) {
font-size: 2rem;
}

.post-content :global(h2) {
font-size: 1.5rem;
}

.post-content :global(h3) {
font-size: 1.25rem;
}

.post-content :global(p) {
margin-bottom: 1.5rem;
}

.post-content :global(ul),
.post-content :global(ol) {
margin-bottom: 1.5rem;
padding-left: 2rem;
}

.post-content :global(li) {
margin-bottom: 0.5rem;
}

.post-content :global(strong) {
color: #ffd700;
}

.post-footer {
margin-top: 3rem;
padding-top: 2rem;
border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.back-link {
color: #ffd700;
text-decoration: none;
transition: color 0.3s;
}

.back-link:hover {
color: #fff;
}

.not-found {
text-align: center;
padding: 4rem 2rem;
}

.not-found h1 {
color: #ffd700;
margin-bottom: 1rem;
}

.not-found p {
color: #aaa;
margin-bottom: 2rem;
}

.btn {
display: inline-block;
padding: 1rem 2rem;
background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
color: #1a1a2e;
text-decoration: none;
border-radius: 8px;
font-weight: bold;
transition: all 0.3s;
}

.btn:hover {
transform: translateY(-2px);
box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
}

@media (max-width: 768px) {
article {
padding: 2rem;
}

.post-header h1 {
font-size: 1.75rem;
}
}
</style>
