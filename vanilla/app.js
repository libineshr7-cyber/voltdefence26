// Sidebar
const menuItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
    { id: 'sessions', label: 'Active Sessions', icon: 'activity' },
    { id: 'analytics', label: 'Trust Analytics', icon: 'trending-up' },
    { id: 'alerts', label: 'Alerts & Risks', icon: 'alert-triangle' },
    { id: 'detection', label: 'Detection Engine', icon: 'cpu' },
    { id: 'insights', label: 'Security Events', icon: 'shield' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
];

let activeMenu = 'home';

function renderSidebar() {
    const nav = document.getElementById('sidebar-nav');
    nav.innerHTML = '';

    menuItems.forEach(item => {
        const isActive = activeMenu === item.id;

        const btnClasses = isActive
            ? 'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 bg-[#0ea5e9]/10 text-[#0ea5e9] shadow-lg shadow-[#0ea5e9]/20'
            : 'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-400 hover:bg-[#1a2332] hover:text-gray-200';

        const btn = document.createElement('button');
        btn.className = btnClasses;
        btn.onclick = () => {
            activeMenu = item.id;
            renderSidebar();
            updateView();
        };

        btn.innerHTML = `
            <i data-lucide="${item.icon}" class="w-5 h-5"></i>
            <span class="text-sm font-medium">${item.label}</span>
        `;

        nav.appendChild(btn);
    });

    lucide.createIcons();
}

function updateView() {
    const sections = [
        'page-header', 'metrics-container', 'system-status-container',
        'top-section', 'middle-section', 'chart-section', 'risk-scan-section',
        'alerts-section', 'sessions-section', 'settings-section'
    ];

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    switch (activeMenu) {
        case 'home':
            sections.forEach(id => {
                if (id !== 'settings-section') document.getElementById(id)?.classList.remove('hidden');
            });
            document.getElementById('btn-scenario-normal')?.click();
            break;
        case 'dashboard':
            ['page-header', 'metrics-container', 'system-status-container'].forEach(id => document.getElementById(id)?.classList.remove('hidden'));
            break;
        case 'sessions':
            ['sessions-section'].forEach(id => document.getElementById(id)?.classList.remove('hidden'));
            break;
        case 'analytics':
            ['middle-section', 'chart-section'].forEach(id => document.getElementById(id)?.classList.remove('hidden'));
            document.getElementById('btn-scenario-compromised')?.click();
            break;
        case 'alerts':
            ['middle-section', 'risk-scan-section', 'alerts-section'].forEach(id => document.getElementById(id)?.classList.remove('hidden'));
            break;
        case 'detection':
            ['top-section'].forEach(id => document.getElementById(id)?.classList.remove('hidden'));
            break;
        case 'insights':
            ['alerts-section'].forEach(id => document.getElementById(id)?.classList.remove('hidden'));
            break;
        case 'settings':
            ['settings-section'].forEach(id => document.getElementById(id)?.classList.remove('hidden'));
            break;
    }
}

renderSidebar();
updateView();

// Metrics Overview
const metricsData = [
    { title: "Active Sessions", value: 1247, icon: "activity", trend: "12%", trendUp: true, status: "normal" },
    { title: "High Risk Sessions", value: 23, icon: "alert-triangle", trend: "8%", trendUp: false, status: "critical" },
    { title: "Average Trust Score", value: 87, icon: "shield", trend: "3%", trendUp: true, status: "normal" },
    { title: "Alerts Triggered", value: 142, icon: "users", trend: "15%", trendUp: true, status: "warning" },
];

const statusColors = {
    normal: 'from-[#0ea5e9]/5 to-[#06b6d4]/5 border-[#0ea5e9]/20',
    warning: 'from-[#f59e0b]/5 to-[#f97316]/5 border-[#f59e0b]/20',
    critical: 'from-[#ef4444]/5 to-[#dc2626]/5 border-[#ef4444]/20',
};

const iconColors = {
    normal: 'text-[#0ea5e9]',
    warning: 'text-[#f59e0b]',
    critical: 'text-[#ef4444]',
};

function renderMetrics() {
    const container = document.getElementById('metrics-container');
    container.innerHTML = '';

    metricsData.forEach(metric => {
        const trendIcon = metric.trendUp ? '↑' : '↓';
        const trendColor = metric.trendUp ? 'text-green-400' : 'text-red-400';

        const card = document.createElement('div');
        card.className = `bg-gradient-to-br ${statusColors[metric.status]} backdrop-blur-sm border rounded-xl p-6 hover:shadow-lg transition-all duration-300`;

        card.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 rounded-lg bg-[#0a0e1a]/50 flex items-center justify-center ${iconColors[metric.status]}">
                    <i data-lucide="${metric.icon}" class="w-6 h-6"></i>
                </div>
                ${metric.trend ? `
                <span class="text-xs font-medium ${trendColor}">
                    ${trendIcon} ${metric.trend}
                </span>` : ''}
            </div>
            <div>
                <p class="text-sm text-gray-400 mb-1">${metric.title}</p>
                <p class="text-3xl font-semibold text-white">${metric.value}</p>
            </div>
        `;

        container.appendChild(card);
    });
}
renderMetrics();

// System Status Bar
const systemStatuses = [
    { title: "System Status", value: "Protected", icon: "shield", color: "green", showPulse: true },
    { title: "Detection Engine", value: "Running", icon: "activity", color: "cyan", showPulse: true },
    { title: "Sessions Monitored", value: "1,247", icon: "eye", color: "purple", showPulse: false },
    { title: "Active Alerts", value: "23", icon: "zap", color: "amber", showPulse: false },
];

function renderSystemStatus() {
    const container = document.getElementById('system-status-container');
    container.innerHTML = '';

    const colorMap = {
        green: { bg: 'bg-green-500/10', text: 'text-green-400' },
        cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
        purple: { bg: 'bg-purple-500/10', text: 'text-purple-400' },
        amber: { bg: 'bg-amber-500/10', text: 'text-amber-400' }
    };

    systemStatuses.forEach(stat => {
        const { bg, text } = colorMap[stat.color];

        const card = document.createElement('div');
        card.className = `bg-gradient-to-br from-[#0a0e1a]/90 to-[#1a2332]/50 backdrop-blur-sm border border-[#1a2332] rounded-lg p-4 flex items-center gap-3`;

        card.innerHTML = `
            <div class="w-10 h-10 rounded-lg ${bg} flex items-center justify-center">
                <i data-lucide="${stat.icon}" class="w-5 h-5 ${text}"></i>
            </div>
            <div>
                <p class="text-xs text-gray-400">${stat.title}</p>
                <p class="text-sm font-semibold ${stat.color === 'purple' ? 'text-white' : text}">${stat.value}</p>
            </div>
            ${stat.showPulse ? `
            <div class="ml-auto">
                <div class="w-2 h-2 ${bg.replace('500/10', '400').replace('bg-', 'bg-')} rounded-full animate-pulse"></div>
            </div>` : ''}
        `;

        container.appendChild(card);
    });
}
renderSystemStatus();

// Live Activity Stream
const initialLogs = [
    { id: 1, timestamp: '10:02:11', message: 'Session S102 → Burst Activity Detected', type: 'critical' },
    { id: 2, timestamp: '10:02:14', message: 'Trust Score Adjusted → -25', type: 'warning' },
    { id: 3, timestamp: '10:02:16', message: 'Navigation Anomaly Observed', type: 'warning' },
    { id: 4, timestamp: '10:02:18', message: 'Risk Drift Threshold Crossed', type: 'critical' },
    { id: 5, timestamp: '10:02:22', message: 'Session S102 Flagged for Review', type: 'warning' },
    { id: 6, timestamp: '10:02:28', message: 'Behavioral Pattern Analysis Complete', type: 'info' },
    { id: 7, timestamp: '10:02:35', message: 'Timing Signature Mismatch', type: 'warning' },
    { id: 8, timestamp: '10:02:41', message: 'Suspicious API Access Pattern', type: 'critical' },
];

let streamLogs = [...initialLogs];
let isPaused = false;

function getLogColor(type) {
    switch (type) {
        case 'critical': return 'text-red-400';
        case 'warning': return 'text-amber-400';
        case 'info': return 'text-cyan-400';
        default: return 'text-gray-400';
    }
}

function renderLogs() {
    const container = document.getElementById('activity-logs-container');
    container.innerHTML = '';

    streamLogs.forEach((log, index) => {
        const div = document.createElement('div');
        div.className = `transition-all duration-300 ${index === 0 ? 'animate-pulse' : ''}`;
        div.style.opacity = Math.max(0, 1 - (index * 0.04));

        div.innerHTML = `
            <span class="text-gray-600">[${log.timestamp}]</span>
            <span class="ml-2 ${getLogColor(log.type)}">${log.message}</span>
        `;

        container.appendChild(div);
    });
}

function getRandomLogMessage() {
    const messages = [
        'Request Rate Anomaly Detected',
        'Session Fingerprint Validated',
        'Geographic Location Shift Observed',
        'User Agent String Analysis Complete',
        'API Endpoint Access Pattern Logged',
        'Trust Score Recalculated',
        'Behavioral Signature Updated',
        'Timing Pattern Deviation Detected',
        'Session Context Analyzed',
        'Risk Assessment Updated',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

const toggleStreamBtn = document.getElementById('toggle-stream-btn');
toggleStreamBtn.onclick = () => {
    isPaused = !isPaused;
    if (isPaused) {
        toggleStreamBtn.className = 'px-3 py-1 text-xs font-medium rounded-md transition-colors bg-amber-500/10 text-amber-400 border border-amber-500/20';
        toggleStreamBtn.innerText = 'Paused';
    } else {
        toggleStreamBtn.className = 'px-3 py-1 text-xs font-medium rounded-md transition-colors bg-green-500/10 text-green-400 border border-green-500/20';
        toggleStreamBtn.innerText = 'Live';
    }
};

renderLogs();

function addLiveLog(message, type = 'info') {
    const d = new Date();
    const ts = d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const log = { id: Date.now(), timestamp: ts, message, type };
    streamLogs.unshift(log);
    if (streamLogs.length > 20) streamLogs.pop();
    if (!isPaused) renderLogs();
}

setInterval(() => {
    if (isPaused) return;
    addLiveLog(getRandomLogMessage(), Math.random() > 0.7 ? 'critical' : Math.random() > 0.4 ? 'warning' : 'info');
}, 3000);

// Detection Engine Panel
let detectionStatus = 'analyzing';
let detectionConfidence = 0;

function renderDetectionPanel() {
    const panel = document.getElementById('detection-panel');
    let colorClasses, statusText;

    switch (detectionStatus) {
        case 'suspicious':
            colorClasses = 'text-red-400 border-red-500/30 shadow-red-500/20';
            statusText = 'Suspicious';
            break;
        case 'analyzing':
            colorClasses = 'text-cyan-400 border-cyan-500/30 shadow-cyan-500/20';
            statusText = 'Analyzing';
            break;
        case 'normal':
            colorClasses = 'text-green-400 border-green-500/30 shadow-green-500/20';
            statusText = 'Normal';
            break;
    }

    panel.className = `bg-gradient-to-br from-[#0a0e1a]/90 to-[#1a2332]/50 backdrop-blur-sm border rounded-xl p-6 transition-all duration-500 h-[400px] flex flex-col ${colorClasses}`;

    panel.innerHTML = `
        <div class="flex items-start gap-4 mb-6 shrink-0">
            <div class="w-12 h-12 rounded-lg bg-[#0ea5e9]/10 flex items-center justify-center relative">
                <i data-lucide="cpu" class="w-6 h-6 text-[#0ea5e9]"></i>
                <div class="absolute inset-0 rounded-lg bg-[#0ea5e9]/20 animate-pulse"></div>
            </div>
            <div class="flex-1">
                <h2 class="text-sm font-semibold text-white mb-1">VoltDefence Detection Engine</h2>
                <div class="flex items-center gap-2">
                    <div class="relative">
                        <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                        <div class="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                    <span class="text-xs text-green-400 font-medium">Status: Active</span>
                </div>
            </div>
        </div>

        <div class="space-y-4 flex-1 flex flex-col justify-between">
            <div>
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs text-gray-400">Analyzing Session Behavior...</span>
                    <i data-lucide="activity" class="w-4 h-4 text-cyan-400 animate-pulse"></i>
                </div>
                <div class="h-1 bg-[#1a2332] rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] transition-all duration-1000 ease-in-out" style="width: ${detectionConfidence}%"></div>
                </div>
            </div>

            <div class="pt-4 border-t border-[#1a2332] space-y-3">
                <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-400">Pattern Classification:</span>
                    <span class="text-sm font-semibold ${colorClasses.split(' ')[0]}">${statusText}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-400">Confidence Level:</span>
                    <span class="text-sm font-semibold text-white">${detectionConfidence}%</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-400">Sessions Monitored:</span>
                    <span class="text-sm font-semibold text-white">1,247</span>
                </div>
            </div>

            <div class="pt-4 border-t border-[#1a2332]">
                <div class="bg-[#050811] rounded-lg p-3 font-mono text-xs text-gray-400 space-y-1">
                    <div class="text-cyan-400">→ Behavioral Analysis Module: Running</div>
                    <div class="text-cyan-400">→ Trust Score Engine: Active</div>
                    <div class="text-cyan-400">→ Anomaly Detection: Monitoring</div>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}

renderDetectionPanel();

setInterval(() => {
    const rand = Math.random();
    if (rand > 0.7) {
        detectionStatus = 'suspicious';
        detectionConfidence = Math.floor(Math.random() * 20) + 80;
    } else if (rand > 0.3) {
        detectionStatus = 'analyzing';
        detectionConfidence = Math.floor(Math.random() * 30) + 50;
    } else {
        detectionStatus = 'normal';
        detectionConfidence = Math.floor(Math.random() * 20) + 30;
    }
    renderDetectionPanel();
}, 4000);

// Trust Score Chart (Chart.js)
const normalData = [
    { time: '00:00', score: 92 },
    { time: '02:00', score: 91 },
    { time: '04:00', score: 93 },
    { time: '06:00', score: 92 },
    { time: '08:00', score: 94 },
    { time: '10:00', score: 93 },
    { time: '12:00', score: 95 },
    { time: '14:00', score: 94 },
    { time: '16:00', score: 92 },
    { time: '18:00', score: 93 },
    { time: '20:00', score: 91 },
    { time: '22:00', score: 92 },
];

const compromisedData = [
    { time: '00:00', score: 88 },
    { time: '02:00', score: 86 },
    { time: '04:00', score: 85 },
    { time: '06:00', score: 78 },
    { time: '08:00', score: 65 },
    { time: '10:00', score: 52 },
    { time: '12:00', score: 38 },
    { time: '14:00', score: 29 },
    { time: '16:00', score: 27 },
    { time: '18:00', score: 25 },
    { time: '20:00', score: 26 },
    { time: '22:00', score: 27 },
];

let currentScenario = 'normal';
let chartInstance = null;

function renderChart() {
    const ctx = document.getElementById('trustScoreCanvas').getContext('2d');
    const data = currentScenario === 'normal' ? normalData : compromisedData;
    const lineColor = currentScenario === 'normal' ? '#10b981' : '#ef4444';

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, currentScenario === 'normal' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.time),
            datasets: [{
                label: 'Trust Score',
                data: data.map(d => d.score),
                borderColor: lineColor,
                backgroundColor: gradient,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: lineColor,
                pointBorderColor: lineColor,
                pointRadius: 3,
                pointHoverRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: { display: true, color: '#1a2332', tickLength: 0 },
                    border: { dash: [3, 3], display: false },
                    ticks: { color: '#6b7280', font: { size: 12 } }
                },
                y: {
                    min: 0, max: 100,
                    grid: { display: true, color: '#1a2332', tickLength: 0 },
                    border: { dash: [3, 3], display: false },
                    ticks: { color: '#6b7280', font: { size: 12 } }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0a0e1a',
                    borderColor: '#1a2332',
                    borderWidth: 1,
                    titleColor: '#9ca3af',
                    bodyColor: '#fff',
                    padding: 10,
                    callbacks: {
                        label: function (context) {
                            return 'Score: ' + context.parsed.y;
                        }
                    }
                }
            }
        }
    });

    const avg = Math.round(data.reduce((sum, d) => sum + d.score, 0) / data.length);
    const max = Math.max(...data.map(d => d.score));
    const min = Math.min(...data.map(d => d.score));

    document.getElementById('chart-stats').innerHTML = `
        <div>
            <p class="text-xs text-gray-400 mb-1">Average Score</p>
            <p class="text-lg font-semibold text-white">${avg}</p>
        </div>
        <div>
            <p class="text-xs text-gray-400 mb-1">Peak Score</p>
            <p class="text-lg font-semibold text-green-400">${max}</p>
        </div>
        <div>
            <p class="text-xs text-gray-400 mb-1">Lowest Score</p>
            <p class="text-lg font-semibold text-red-400">${min}</p>
        </div>
    `;
}

document.getElementById('btn-scenario-normal').onclick = function () {
    currentScenario = 'normal';
    this.className = "px-3 py-1 text-xs font-medium rounded-md border transition-colors bg-green-500/10 text-green-400 border-green-500/20";
    document.getElementById('btn-scenario-compromised').className = "px-3 py-1 text-xs font-medium rounded-md border transition-colors text-gray-400 border-transparent hover:border-[#1a2332]";
    document.getElementById('chart-title').innerText = "Trust Score Trends - Normal Session";
    renderChart();
};

document.getElementById('btn-scenario-compromised').onclick = function () {
    currentScenario = 'compromised';
    this.className = "px-3 py-1 text-xs font-medium rounded-md border transition-colors bg-red-500/10 text-red-400 border-red-500/20";
    document.getElementById('btn-scenario-normal').className = "px-3 py-1 text-xs font-medium rounded-md border transition-colors text-gray-400 border-transparent hover:border-[#1a2332]";
    document.getElementById('chart-title').innerText = "Trust Score Trends - Compromised Session Detected";
    renderChart();
};

renderChart();

// Risk Scan Panel
let isScanning = false;
let scanProgress = 0;
let scanResults = [];

const signals = [
    { signal: 'Timing Pattern', delay: 500 },
    { signal: 'Request Behavior', delay: 1200 },
    { signal: 'Navigation Flow', delay: 1800 },
    { signal: 'Session Context', delay: 2400 },
    { signal: 'Geographic Location', delay: 3000 },
];
const statuses = ['normal', 'abnormal', 'suspicious'];

const runScanBtn = document.getElementById('run-scan-btn');
const progressContainer = document.getElementById('scan-progress-container');
const progressText = document.getElementById('scan-progress-text');
const progressBar = document.getElementById('scan-progress-bar');
const resultsContainer = document.getElementById('scan-results-container');
const resultsList = document.getElementById('scan-results-list');
const emptyState = document.getElementById('scan-empty-state');

function updateScanUI() {
    if (isScanning) {
        runScanBtn.className = "w-full py-3 rounded-lg font-medium text-sm transition-all duration-200 mb-6 bg-[#1a2332] text-gray-400 cursor-not-allowed";
        runScanBtn.innerHTML = `<span class="flex items-center justify-center gap-2"><i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>Scanning...</span>`;
        progressContainer.classList.remove('hidden');
        progressText.innerText = `${Math.round(scanProgress)}%`;
        progressBar.style.width = `${scanProgress}%`;
        emptyState.classList.add('hidden');
        lucide.createIcons();
    } else {
        runScanBtn.className = "w-full py-3 rounded-lg font-medium text-sm transition-all duration-200 mb-6 bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] text-white hover:shadow-lg hover:shadow-[#0ea5e9]/30";
        runScanBtn.innerHTML = `Run Session Risk Scan`;
        progressContainer.classList.add('hidden');

        if (scanResults.length === 0) {
            emptyState.classList.remove('hidden');
            resultsContainer.classList.add('hidden');
        } else {
            emptyState.classList.add('hidden');
            resultsContainer.classList.remove('hidden');
        }
    }
}

function getScanStatusColor(status) {
    if (status === 'normal') return 'text-green-400';
    if (status === 'abnormal') return 'text-amber-400';
    if (status === 'suspicious') return 'text-red-400';
    return 'text-gray-400';
}

function getScanIconName(status) {
    if (status === 'normal') return 'check-circle-2';
    if (status === 'abnormal') return 'alert-triangle';
    if (status === 'suspicious') return 'x-circle';
}

function renderScanResults() {
    resultsList.innerHTML = '';
    scanResults.forEach(res => {
        const div = document.createElement('div');
        div.className = "flex items-center justify-between p-3 bg-[#050811] rounded-lg border border-[#1a2332] transition-all duration-300 hover:border-[#0ea5e9]/20";
        div.innerHTML = `
            <div class="flex items-center gap-3">
                <i data-lucide="${getScanIconName(res.status)}" class="w-4 h-4 ${getScanStatusColor(res.status)}"></i>
                <span class="text-sm text-gray-300">${res.signal}</span>
            </div>
            <span class="text-xs font-semibold ${getScanStatusColor(res.status)}">
                ${res.status.charAt(0).toUpperCase() + res.status.slice(1)}
            </span>
        `;
        resultsList.appendChild(div);
    });
    lucide.createIcons();
}

runScanBtn.onclick = () => {
    if (isScanning) return;
    isScanning = true;
    scanProgress = 0;
    scanResults = [];
    resultsContainer.classList.add('hidden');
    updateScanUI();

    signals.forEach((signal, index) => {
        setTimeout(() => {
            let randomStatus = statuses[Math.floor(Math.random() * 2)];
            if (index === 2) randomStatus = 'suspicious';
            else if (index === 1) randomStatus = 'abnormal';

            scanResults.push({ signal: signal.signal, status: randomStatus });
            scanProgress = ((index + 1) / signals.length) * 100;

            updateScanUI();

            if (index === signals.length - 1) {
                setTimeout(() => {
                    isScanning = false;
                    updateScanUI();
                    renderScanResults();
                }, 500);
            }
        }, signal.delay);
    });
};

// Alerts Panel
const alertsData = [
    { id: '1', type: 'critical', icon: 'alert-triangle', title: '🚨 High-Risk Session Detected', description: 'User S102 - Anya Patel: Critical trust score drop to 27', time: '2 min ago' },
    { id: '2', type: 'warning', icon: 'clock', title: '⚠ Timing Anomaly Observed', description: 'Session S104 showing irregular access patterns', time: '8 min ago' },
    { id: '3', type: 'warning', icon: 'eye', title: '⚠ Abnormal Navigation Pattern', description: 'Automated behavior suspected in session S106', time: '15 min ago' },
    { id: '4', type: 'info', icon: 'activity', title: 'Trust Score Fluctuation', description: 'Session S104 - Trust score dropped from 78 to 56', time: '22 min ago' },
];

function renderAlerts() {
    const container = document.getElementById('alerts-container');
    const notifList = document.getElementById('notification-list');
    const notifCount = document.getElementById('notification-count');
    const notifBadge = document.getElementById('notification-badge');

    if (container) container.innerHTML = '';
    if (notifList) notifList.innerHTML = '';

    if (notifCount) notifCount.textContent = alertsData.length;
    if (alertsData.length > 0) {
        if (notifBadge) notifBadge.classList.remove('hidden');
    } else {
        if (notifBadge) notifBadge.classList.add('hidden');
        if (notifList) {
            notifList.innerHTML = `
                <div class="px-4 py-8 text-center text-gray-500">
                    <i data-lucide="check-circle" class="w-8 h-8 mx-auto mb-2 text-green-500/50"></i>
                    <p class="text-sm">No new alerts or risks</p>
                </div>
            `;
        }
    }

    alertsData.forEach(alert => {
        let alertStyle = '';
        let iconColor = '';
        let notifStyle = '';

        switch (alert.type) {
            case 'critical':
                alertStyle = 'border-red-500/30 bg-red-500/5 hover:bg-red-500/10';
                iconColor = 'text-red-400';
                notifStyle = 'border-l-red-500';
                break;
            case 'warning':
                alertStyle = 'border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10';
                iconColor = 'text-amber-400';
                notifStyle = 'border-l-amber-500';
                break;
            case 'info':
                alertStyle = 'border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10';
                iconColor = 'text-blue-400';
                notifStyle = 'border-l-blue-500';
                break;
        }

        if (container) {
            const div = document.createElement('div');
            div.className = `border rounded-lg p-4 transition-all duration-200 cursor-pointer ${alertStyle}`;

            div.innerHTML = `
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-lg bg-[#0a0e1a]/50 flex items-center justify-center flex-shrink-0 ${iconColor}">
                        <i data-lucide="${alert.icon}" class="w-5 h-5"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-sm font-medium text-white mb-1">${alert.title}</h3>
                        <p class="text-xs text-gray-400 leading-relaxed">${alert.description}</p>
                        <p class="text-xs text-gray-500 mt-2">${alert.time}</p>
                    </div>
                </div>
            `;

            container.appendChild(div);
        }

        if (notifList) {
            const div = document.createElement('div');
            div.className = `flex gap-3 p-4 hover:bg-[#1a2332]/50 transition-colors cursor-pointer border-l-2 ${notifStyle}`;

            div.innerHTML = `
                <div class="flex-shrink-0 mt-0.5 ${iconColor}">
                    <i data-lucide="${alert.icon}" class="w-4 h-4"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-[13px] font-medium text-gray-200 truncate">${alert.title}</p>
                    <p class="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">${alert.description}</p>
                    <p class="text-[10px] text-gray-500 mt-2 font-mono">${alert.time}</p>
                </div>
            `;

            notifList.appendChild(div);
        }
    });
}

renderAlerts();

// Sessions Table
let sessionsData = [
    { id: 'S101', user: 'Rahul Kumar', trustScore: 94, status: 'normal', statusText: 'Normal', location: 'Mumbai, IN', lastActivity: '10:02:11' },
    { id: 'S102', user: 'Anya Patel', trustScore: 27, status: 'critical', statusText: '⚠ High Risk', location: 'Unknown', lastActivity: '10:02:18' },
    { id: 'S103', user: 'Marcus Chen', trustScore: 88, status: 'normal', statusText: 'Normal', location: 'Singapore, SG', lastActivity: '10:02:24' },
    { id: 'S104', user: 'Sarah Johnson', trustScore: 56, status: 'warning', statusText: 'Anomaly Detected', location: 'London, UK', lastActivity: '10:02:31' },
    { id: 'S105', user: 'Dev Sharma', trustScore: 91, status: 'normal', statusText: 'Normal', location: 'Bangalore, IN', lastActivity: '10:02:45' },
    { id: 'S106', user: 'Emma Wilson', trustScore: 42, status: 'warning', statusText: 'Behavioral Change', location: 'New York, US', lastActivity: '10:03:02' },
];

function renderSessions() {
    const tbody = document.getElementById('sessions-tbody');
    tbody.innerHTML = '';

    sessionsData.forEach(session => {
        let iconName = 'check-circle-2';
        let statusStyle = 'text-green-400 bg-green-400/10 border-green-400/20';

        let scoreStyle = 'text-green-400 bg-green-400/10';
        if (session.trustScore < 80 && session.trustScore >= 50) scoreStyle = 'text-amber-400 bg-amber-400/10';
        if (session.trustScore < 50) scoreStyle = 'text-red-400 bg-red-400/10';

        if (session.status === 'warning') {
            iconName = 'activity';
            statusStyle = 'text-amber-400 bg-amber-400/10 border-amber-400/20';
        } else if (session.status === 'critical') {
            iconName = 'alert-triangle';
            statusStyle = 'text-red-400 bg-red-400/10 border-red-400/20 shadow-lg shadow-red-500/20';
        }

        const tr = document.createElement('tr');
        tr.className = `hover:bg-[#1a2332]/30 transition-colors ${session.status === 'critical' ? 'bg-red-500/5' : ''}`;

        tr.innerHTML = `
            <td class="px-6 py-4">
                <span class="text-sm font-mono text-gray-300">${session.id}</span>
            </td>
            <td class="px-6 py-4">
                <span class="text-sm text-white">${session.user}</span>
            </td>
            <td class="px-6 py-4">
                <span class="text-sm text-gray-400">${session.location}</span>
            </td>
            <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                    <span class="text-sm font-semibold px-3 py-1 rounded-md ${scoreStyle}">
                        ${session.trustScore}
                    </span>
                </div>
            </td>
            <td class="px-6 py-4">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md border text-xs font-medium ${statusStyle}">
                    <i data-lucide="${iconName}" class="w-4 h-4"></i>
                    <span>${session.statusText}</span>
                </div>
            </td>
            <td class="px-6 py-4">
                <span class="text-sm text-gray-400 font-mono">${session.lastActivity}</span>
            </td>
        `;

        tbody.appendChild(tr);
    });
    lucide.createIcons();
}

renderSessions();

// Admin / Logout logic
const adminMenuBtn = document.getElementById('admin-menu-btn');
const adminDropdown = document.getElementById('admin-dropdown');
const logoutBtn = document.getElementById('logout-btn');

if (adminMenuBtn && adminDropdown) {
    adminMenuBtn.addEventListener('click', () => {
        adminDropdown.classList.toggle('hidden');
        if (typeof notificationDropdown !== 'undefined' && notificationDropdown && !notificationDropdown.classList.contains('hidden')) {
            notificationDropdown.classList.add('hidden');
        }
        lucide.createIcons();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!adminMenuBtn.contains(e.target) && !adminDropdown.contains(e.target)) {
            adminDropdown.classList.add('hidden');
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('authenticated');
        window.location.href = 'login.html';
    });
}

// Notification dropdown logic
const notificationBtn = document.getElementById('notification-btn');
const notificationDropdown = document.getElementById('notification-dropdown');

if (notificationBtn && notificationDropdown) {
    notificationBtn.addEventListener('click', () => {
        notificationDropdown.classList.toggle('hidden');
        // Hide admin dropdown if open
        if (adminDropdown && !adminDropdown.classList.contains('hidden')) {
            adminDropdown.classList.add('hidden');
        }
    });

    // Close notification dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
            notificationDropdown.classList.add('hidden');
        }
    });
}

// ====== REAL-TIME CLIENT MONITORING ENGINE ======
(function startRealTimeMonitoring() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const deviceType = isMobile ? 'Mobile Device' : 'Desktop Node';
    const os = navigator.platform || 'Unknown OS';

    // Create actual session for the current user
    const userSessionId = 'S' + Math.floor(Math.random() * 900 + 100);
    const currentSession = {
        id: userSessionId,
        user: `Local Admin (${deviceType})`,
        trustScore: 100,
        status: 'normal',
        statusText: 'Normal',
        location: 'Scanning Network...',
        lastActivity: 'Active Now'
    };

    // Push into active sessions table at the top
    sessionsData.unshift(currentSession);
    renderSessions();
    addLiveLog(`New Connection Established: ${deviceType} on ${os}`, 'info');

    // 1. Fetch IP & Regional Data automatically
    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
            if (data.ip) {
                currentSession.location = `${data.city || 'Unknown'}, ${data.country || 'Unknown'}`;
                renderSessions();

                // Add alert for the new connection tracking
                addLiveLog(`IP Resolved: ${data.ip} (${data.org || 'ISP'})`, 'info');

                // Flag if IP is VPN or unusual
                if (data.org && data.org.toLowerCase().includes('vpn')) {
                    addLiveLog(`VPN/Proxy Usage Detected for ${userSessionId}`, 'warning');
                    currentSession.trustScore -= 10;
                    currentSession.status = 'warning';
                    currentSession.statusText = 'Proxy Detected';
                    renderSessions();
                }
            }
        })
        .catch(e => console.warn('IP fetch failed:', e));

    // 2. Request Geolocation Permission (High Precision)
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude.toFixed(4);
                const lon = pos.coords.longitude.toFixed(4);
                addLiveLog(`High-Precision Geolocation Granted: [${lat}, ${lon}]`, 'info');
                currentSession.location = `GPS: ${lat}, ${lon}`;
                renderSessions();
            },
            (err) => {
                if (err.code === err.PERMISSION_DENIED) {
                    addLiveLog(`Geolocation Permission Denied by User`, 'warning');
                    currentSession.trustScore -= 5;
                    renderSessions();
                }
            }
        );
    }

    // 3. Behavioral Tracking (Mouse / Interaction)
    let clickCount = 0;
    let lastClickTime = Date.now();

    document.addEventListener('click', () => {
        const now = Date.now();
        if (now - lastClickTime < 300) {
            clickCount++;
        } else {
            clickCount = 1;
        }

        // Rapid clicking reduces trust score dramatically
        if (clickCount > 4) {
            addLiveLog(`Automation/Bot Behavior Suspected (Rapid Clicks)`, 'critical');
            currentSession.trustScore = Math.max(0, currentSession.trustScore - 15);
            if (currentSession.trustScore < 50) {
                currentSession.status = 'critical';
                currentSession.statusText = '⚠ High Risk';
            } else if (currentSession.trustScore < 80) {
                currentSession.status = 'warning';
                currentSession.statusText = 'Anomaly Detected';
            }
            renderSessions();
            clickCount = 0; // Reset
        }

        lastClickTime = now;
        currentSession.lastActivity = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        renderSessions();
    });

    document.addEventListener('mousemove', () => {
        currentSession.lastActivity = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        renderSessions();
    });
})();
