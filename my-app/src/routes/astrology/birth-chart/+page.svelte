<script lang="ts">
import { calculateBirthChart, calculateLunarPhase, interpretPlanetInSign, interpretAspect } from '$lib/utils/astrologyCalculations';
import type { BirthChart } from '$lib/types/astrology';

let birthDate = $state('');
let birthTime = $state('12:00');
let latitude = $state(13.7563);
let longitude = $state(100.5018);
let timezone = $state('Asia/Bangkok');
let city = $state('曼谷 (Bangkok)');

let chart: BirthChart | null = $state(null);
let showInterpretation = $state(false);

function calculate() {
if (!birthDate) return;

const date = new Date(birthDate);
const timeParts = birthTime.split(':');
const time = new Date();
time.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]), 0);

chart = calculateBirthChart(date, time, latitude, longitude, timezone);
showInterpretation = false;
}

function getAspectRatio(type: string): string {
const aspects: Record<string, string> = {
conjunction: '☌',
sextile: '⚹',
square: '□',
trine: '△',
opposition: '☍',
quincunx: '⚻',
semisextile: '⚺',
semisquare: '∠',
sesquiquadrate: '⚼'
};
return aspects[type] || type;
}
</script>

<div class="birth-chart-page">
<header class="page-header">
<h1>🔮 出生星盘计算</h1>
<p>输入您的出生信息，获取详细的星盘解读</p>
</header>

<div class="calculator">
<div class="input-section">
<div class="form-group">
<label>出生日期</label>
<input type="date" bind:value={birthDate} />
</div>

<div class="form-group">
<label>出生时间</label>
<input type="time" bind:value={birthTime} />
</div>

<div class="form-group">
<label>出生地点 (纬度)</label>
<input type="number" step="0.0001" bind:value={latitude} placeholder="纬度" />
</div>

<div class="form-group">
<label>出生地点 (经度)</label>
<input type="number" step="0.0001" bind:value={longitude} placeholder="经度" />
</div>

<div class="form-group">
<label>时区</label>
<select bind:value={timezone}>
<option value="Asia/Bangkok">Asia/Bangkok (GMT+7)</option>
<option value="Asia/Shanghai">Asia/Shanghai (GMT+8)</option>
<option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
<option value="UTC">UTC (GMT+0)</option>
</select>
</div>

<button class="calculate-btn" onclick={calculate}>
计算星盘 ✨
</button>
</div>

{#if chart}
<div class="results">
<section class="chart-overview">
<h2>📊 星盘概览</h2>
<div class="overview-grid">
<div class="overview-item">
<span class="label">太阳星座</span>
<span class="value">{chart.sun.sign} {chart.sun.degree.toFixed(1)}°</span>
</div>
<div class="overview-item">
<span class="label">月亮星座</span>
<span class="value">{chart.moon.sign} {chart.moon.degree.toFixed(1)}°</span>
</div>
<div class="overview-item">
<span class="label">上升星座</span>
<span class="value">{chart.houses[0].sign}</span>
</div>
<div class="overview-item">
<span class="label">中天</span>
<span class="value">{chart.midheaven.toFixed(1)}°</span>
</div>
</div>
</section>

<section class="planets-section">
<h2>🪐 行星位置</h2>
<div class="planets-table">
<table>
<thead>
<tr>
<th>行星</th>
<th>星座</th>
<th>度数</th>
<th>宫位</th>
</tr>
</thead>
<tbody>
<tr>
<td>☉ 太阳</td>
<td>{chart.sun.sign}</td>
<td>{chart.sun.degree.toFixed(2)}°</td>
<td>{chart.sun.house}</td>
</tr>
<tr>
<td>☽ 月亮</td>
<td>{chart.moon.sign}</td>
<td>{chart.moon.degree.toFixed(2)}°</td>
<td>{chart.moon.house}</td>
</tr>
<tr>
<td>☿ 水星</td>
<td>{chart.mercury.sign}</td>
<td>{chart.mercury.degree.toFixed(2)}°</td>
<td>{chart.mercury.house}</td>
</tr>
<tr>
<td>♀ 金星</td>
<td>{chart.venus.sign}</td>
<td>{chart.venus.degree.toFixed(2)}°</td>
<td>{chart.venus.house}</td>
</tr>
<tr>
<td>♂ 火星</td>
<td>{chart.mars.sign}</td>
<td>{chart.mars.degree.toFixed(2)}°</td>
<td>{chart.mars.house}</td>
</tr>
<tr>
<td>♃ 木星</td>
<td>{chart.jupiter.sign}</td>
<td>{chart.jupiter.degree.toFixed(2)}°</td>
<td>{chart.jupiter.house}</td>
</tr>
<tr>
<td>♄ 土星</td>
<td>{chart.saturn.sign}</td>
<td>{chart.saturn.degree.toFixed(2)}°</td>
<td>{chart.saturn.house}</td>
</tr>
<tr>
<td>♅ 天王星</td>
<td>{chart.uranus.sign}</td>
<td>{chart.uranus.degree.toFixed(2)}°</td>
<td>{chart.uranus.house}</td>
</tr>
<tr>
<td>♆ 海王星</td>
<td>{chart.neptune.sign}</td>
<td>{chart.neptune.degree.toFixed(2)}°</td>
<td>{chart.neptune.house}</td>
</tr>
<tr>
<td>♇ 冥王星</td>
<td>{chart.pluto.sign}</td>
<td>{chart.pluto.degree.toFixed(2)}°</td>
<td>{chart.pluto.house}</td>
</tr>
</tbody>
</table>
</div>
</section>

<section class="houses-section">
<h2>🏠 宫位系统</h2>
<div class="houses-grid">
{#each chart.houses as house}
<div class="house-item">
<span class="house-number">{house.number}</span>
<span class="house-sign">{house.sign}</span>
<span class="house-degree">{house.degree.toFixed(1)}°</span>
</div>
{/each}
</div>
</section>

<section class="aspects-section">
<h2>✨ 相位分析</h2>
{#if chart.aspects.length > 0}
<div class="aspects-list">
{#each chart.aspects as aspect}
<div class="aspect-item">
<span class="aspect-symbol">{getAspectRatio(aspect.type)}</span>
<span class="aspect-bodies">{aspect.body1} - {aspect.body2}</span>
<span class="aspect-angle">{aspect.angle.toFixed(2)}°</span>
<span class="aspect-orb">Orb: {aspect.orb.toFixed(2)}°</span>
</div>
{/each}
</div>
{:else}
<p>此星盘没有形成主要相位</p>
{/if}
</section>

<button class="interpret-btn" onclick={() => showInterpretation = !showInterpretation}>
{showInterpretation ? '隐藏解读' : '显示详细解读'} 📖
</button>

{#if showInterpretation}
<section class="interpretation">
<h2>📖 星盘解读</h2>

<div class="interpret-card">
<h3>☉ 太阳在 {chart.sun.sign}</h3>
<p>{interpretPlanetInSign('Sun', chart.sun.sign, chart.sun.house)}</p>
</div>

<div class="interpret-card">
<h3>☽ 月亮在 {chart.moon.sign}</h3>
<p>{interpretPlanetInSign('Moon', chart.moon.sign, chart.moon.house)}</p>
</div>

{#if chart.aspects.length > 0}
<div class="aspects-interpretation">
<h3>重要相位解读</h3>
{#each chart.aspects.slice(0, 5) as aspect}
<div class="aspect-interpret">
<p>{interpretAspect(aspect)}</p>
</div>
{/each}
</div>
{/if}
</section>
{/if}
</div>
{/if}
</div>
</div>

<style>
.birth-chart-page {
max-width: 1200px;
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
}

.calculator {
display: grid;
gap: 3rem;
}

.input-section {
background: rgba(255, 255, 255, 0.05);
padding: 2rem;
border-radius: 12px;
border: 1px solid rgba(255, 255, 255, 0.1);
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
gap: 1.5rem;
align-items: end;
}

.form-group {
display: flex;
flex-direction: column;
gap: 0.5rem;
}

.form-group label {
color: #ffd700;
font-weight: bold;
}

.form-group input,
.form-group select {
padding: 0.75rem;
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: 8px;
color: #fff;
font-size: 1rem;
}

.calculate-btn {
padding: 1rem 2rem;
background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
color: #1a1a2e;
border: none;
border-radius: 8px;
font-weight: bold;
cursor: pointer;
transition: all 0.3s;
}

.calculate-btn:hover {
transform: translateY(-2px);
box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
}

.results {
display: flex;
flex-direction: column;
gap: 2rem;
}

section {
background: rgba(255, 255, 255, 0.05);
padding: 2rem;
border-radius: 12px;
border: 1px solid rgba(255, 255, 255, 0.1);
}

section h2 {
color: #ffd700;
margin-bottom: 1.5rem;
}

.overview-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
gap: 1rem;
}

.overview-item {
background: rgba(255, 215, 0, 0.1);
padding: 1rem;
border-radius: 8px;
text-align: center;
}

.overview-item .label {
display: block;
color: #aaa;
font-size: 0.9rem;
margin-bottom: 0.5rem;
}

.overview-item .value {
display: block;
color: #ffd700;
font-size: 1.25rem;
font-weight: bold;
}

.planets-table table {
width: 100%;
border-collapse: collapse;
}

.planets-table th,
.planets-table td {
padding: 1rem;
text-align: left;
border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.planets-table th {
color: #ffd700;
}

.planets-table tr:hover {
background: rgba(255, 215, 0, 0.05);
}

.houses-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
gap: 1rem;
}

.house-item {
background: rgba(255, 255, 255, 0.05);
padding: 1rem;
border-radius: 8px;
text-align: center;
}

.house-number {
display: block;
color: #ffd700;
font-weight: bold;
margin-bottom: 0.5rem;
}

.aspects-list {
display: flex;
flex-direction: column;
gap: 0.75rem;
}

.aspect-item {
background: rgba(255, 255, 255, 0.05);
padding: 1rem;
border-radius: 8px;
display: flex;
align-items: center;
gap: 1rem;
flex-wrap: wrap;
}

.aspect-symbol {
font-size: 1.5rem;
color: #ffd700;
}

.interpret-btn {
padding: 1rem 2rem;
background: rgba(255, 255, 255, 0.1);
color: #fff;
border: 2px solid rgba(255, 215, 0, 0.3);
border-radius: 8px;
cursor: pointer;
transition: all 0.3s;
}

.interpret-btn:hover {
background: rgba(255, 215, 0, 0.2);
}

.interpretation {
display: flex;
flex-direction: column;
gap: 1.5rem;
}

.interpret-card {
background: rgba(255, 215, 0, 0.05);
padding: 1.5rem;
border-radius: 8px;
border-left: 4px solid #ffd700;
}

.interpret-card h3 {
color: #ffd700;
margin-bottom: 1rem;
}

.interpret-card p {
color: #ccc;
line-height: 1.6;
}

@media (max-width: 768px) {
.input-section {
grid-template-columns: 1fr;
}

.planets-table {
overflow-x: auto;
}
}
</style>
