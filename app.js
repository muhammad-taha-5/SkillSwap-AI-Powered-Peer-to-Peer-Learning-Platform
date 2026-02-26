document.addEventListener('DOMContentLoaded', () => {
    // Authentication Check
    const isAuthenticated = sessionStorage.getItem('ss_authenticated') === 'true';
    const appContainer = document.querySelector('.app-container');
    const authContainer = document.getElementById('auth-container');

    if (!isAuthenticated) {
        appContainer.classList.add('app-hidden');
        renderAuthPage();
        return;
    }

    // If authenticated, show app
    appContainer.classList.remove('app-hidden');

    // Initialize Lucide Icons
    lucide.createIcons();

    // Pages configuration
    const pages = {
        dashboard: renderDashboard,
        discover: renderDiscover,
        matches: renderSkillMatch,
        messages: renderCollaborationHub,
        settings: renderSettings,
        profile: renderProfile,
        skillmap: renderSkillMap
    };

    // Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    const profilePreview = document.querySelector('.profile-preview');
    const contentArea = document.getElementById('page-content');

    const navigateTo = (pageId) => {
        // Update Active State
        navItems.forEach(i => {
            if (i.getAttribute('data-page') === pageId) {
                i.classList.add('active');
            } else {
                i.classList.remove('active');
            }
        });

        // Render Page
        if (pages[pageId]) {
            contentArea.innerHTML = '';
            pages[pageId](contentArea);
            lucide.createIcons();
        }
    };

    // Make navigateTo globally accessible for stats cards
    window.navigateTo = navigateTo;

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = item.getAttribute('data-page');
            navigateTo(pageId);
        });
    });

    profilePreview.addEventListener('click', () => {
        navigateTo('profile');
    });

    // Initial Page
    renderDashboard(contentArea);
});

// --- Page Renderers ---

function renderDashboard(container) {
    const trendingSkills = ['React 19', 'AI Agents', 'UI/UX Design', 'Python Dev', 'Digital Art', 'Blockchain', 'Next.js', 'Solana Dev', 'Three.js', 'Web3'];
    const repeatedSkills = [...trendingSkills, ...trendingSkills];

    const html = `
        <div class="greeting-section" style="margin-bottom: 2rem;">
            <h1 style="font-size: 2.2rem; margin-bottom: 0.5rem;"><span class="neon-cyan">Welcome back, M.TAHA KHUWAJA!</span> 👋</h1>
            <p style="color: var(--text-muted);">Explore the community trends or start a new skill swap.</p>
        </div>

        <!-- Continuous Slider -->
        <div class="slider-container glass" style="margin-bottom: 2.5rem;">
            <div class="slider-track">
                ${repeatedSkills.map(s => `
                    <div class="slider-item">
                        <i data-lucide="trending-up" style="width:14px; color: var(--primary)"></i>
                        <span style="font-weight: 600;">${s}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="stat-card glass" onclick="navigateTo('profile')">
                <div class="stat-icon"><i data-lucide="database"></i></div>
                <span class="stat-label">SwapCoins Balance</span>
                <span class="stat-value">4,250 SWP</span>
            </div>
            <div class="stat-card glass" onclick="navigateTo('skillmap')">
                <div class="stat-icon"><i data-lucide="globe"></i></div>
                <span class="stat-label">Global Skill Rank</span>
                <span class="stat-value">#124</span>
            </div>
            <div class="stat-card glass">
                <div class="stat-icon"><i data-lucide="users"></i></div>
                <span class="stat-label">Vouches Received</span>
                <span class="stat-value">12</span>
            </div>
            <div class="stat-card glass" onclick="navigateTo('matches')">
                <div class="stat-icon"><i data-lucide="zap"></i></div>
                <span class="stat-label">Match Swiper</span>
                <span class="stat-value">Active</span>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 380px; gap: 2rem; margin-top: 2rem;">
            <div class="main-stats-panel">
                <div class="section-title">
                    <h2>Learning Velocity</h2>
                    <div class="glass" style="padding: 4px 12px; font-size: 0.8rem; color: var(--text-muted);">Real-time Insights</div>
                </div>
                <div class="chart-container glass" style="height: 380px;">
                    <canvas id="activityChart"></canvas>
                </div>
            </div>

            <div class="community-activity glass" style="padding: 1.5rem; display: flex; flex-direction: column;">
                <h3 style="margin-bottom: 1.5rem; display: flex; align-items:center; gap:8px;">
                    <i data-lucide="activity" style="width:18px"></i> Activity Feed 
                    <span style="font-size: 0.7rem; color: var(--primary); background: var(--primary-glow); padding: 2px 8px; border-radius: 10px;">Polywork Style</span>
                </h3>
                <div class="poly-feed">
                    <div class="poly-item glass">
                        <div class="poly-badge"></div>
                        <span style="font-size: 0.7rem; font-weight: 800; color: var(--primary); letter-spacing: 1px;">VOUCH RECEIVED</span>
                        <p style="font-size: 0.85rem; margin-top: 6px; line-height: 1.4;"><strong>Sarah Chen</strong> vouched for your React 19 architecture proficiency.</p>
                        <span style="font-size: 0.7rem; color: var(--text-muted); display: block; margin-top: 8px;">2h ago</span>
                    </div>
                    <div class="poly-item glass">
                        <div class="poly-badge"></div>
                        <span style="font-size: 0.7rem; font-weight: 800; color: var(--secondary); letter-spacing: 1px;">COLLABORATION</span>
                        <p style="font-size: 0.85rem; margin-top: 6px; line-height: 1.4;">Collaborated with <strong>Marcus</strong> on a Digital Identity project design.</p>
                        <span style="font-size: 0.7rem; color: var(--text-muted); display: block; margin-top: 8px;">5h ago</span>
                    </div>
                    <div class="poly-item glass">
                        <div class="poly-badge"></div>
                        <span style="font-size: 0.7rem; font-weight: 800; color: #10b981; letter-spacing: 1px;">SWAPCOINS EARNED</span>
                        <p style="font-size: 0.85rem; margin-top: 6px; line-height: 1.4;">Received <strong>75 SWP</strong> for an expert-level UI/UX mentorship block.</p>
                        <span style="font-size: 0.7rem; color: var(--text-muted); display: block; margin-top: 8px;">Yesterday</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
    initChart();
}

function renderDiscover(container) {
    const mentors = [
        { name: "Sarah Chen", skill: "React & Next.js", rating: 4.9, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
        { name: "Marcus Thorne", skill: "Digital Painting", rating: 4.8, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" },
        { name: "Elena Rodriguez", skill: "Jazz Guitar", rating: 5.0, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" },
        { name: "David Kim", skill: "Python / AI", rating: 4.7, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" },
        { name: "Jessica Bloom", skill: "UX Research", rating: 4.9, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica" },
        { name: "Rohan Gupta", skill: "3D Modeling", rating: 4.6, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan" }
    ];

    const html = `
        <div class="section-title">
            <h1>Skill Discovery</h1>
            <p style="font-size: 0.9rem; color: var(--text-muted);">Find your next mentor based on your interests.</p>
        </div>

        <div class="discover-layout">
            <div class="mentor-grid">
                ${mentors.map(m => `
                    <div class="mentor-card glass">
                        <div class="mentor-header">
                            <img src="${m.avatar}" class="mentor-avatar" alt="${m.name}">
                            <div class="mentor-info">
                                <h3>${m.name}</h3>
                                <div class="mentor-rating"><i data-lucide="star" style="width:14px;fill:#f59e0b"></i> ${m.rating}</div>
                            </div>
                        </div>
                        <div class="skill-tag">${m.skill}</div>
                        <p style="font-size: 0.85rem; color: var(--text-muted);">Offering expert guidance in modern frontend patterns and architectural design.</p>
                        <div class="mentor-footer">
                            <span style="font-weight: 500;">Top Rated</span>
                            <button class="swap-btn">Swap Skill</button>
                        </div>
                    </div>
                `).join('')}
            </div>

            <aside class="filter-sidebar glass">
                <h3 style="margin-bottom: 1rem;">Filters</h3>
                
                <div class="filter-group">
                    <label>Category</label>
                    <div class="filter-options">
                        <label class="checkbox-item"><input type="checkbox" checked> Design</label>
                        <label class="checkbox-item"><input type="checkbox" checked> Technology</label>
                        <label class="checkbox-item"><input type="checkbox"> Music</label>
                        <label class="checkbox-item"><input type="checkbox"> Business</label>
                    </div>
                </div>

                <div class="filter-group">
                    <label>Time Zone</label>
                    <div class="filter-options">
                        <label class="checkbox-item"><input type="checkbox"> GMT (London)</label>
                        <label class="checkbox-item"><input type="checkbox" checked> EST (New York)</label>
                        <label class="checkbox-item"><input type="checkbox"> PST (Los Angeles)</label>
                    </div>
                </div>

                <div class="filter-group">
                    <label>Mentor Level</label>
                    <div class="filter-options">
                        <label class="checkbox-item"><input type="checkbox" checked> Expert</label>
                        <label class="checkbox-item"><input type="checkbox"> Intermediate</label>
                        <label class="checkbox-item"><input type="checkbox"> Peer</label>
                    </div>
                </div>

                <button class="upgrade-btn" style="margin-top: 1rem; width: 100%;">Apply Filters</button>
            </aside>
        </div>
    `;

    container.innerHTML = html;
}

function renderProfile(container) {
    const html = `
        <div class="section-title">
            <h1>My Profile</h1>
            <button class="upgrade-btn">Save Changes</button>
        </div>

        <div class="profile-view">
            <div class="profile-side-panels" style="display:flex; flex-direction:column; gap:1.5rem;">
                <div class="profile-card glass">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MTK" class="avatar-large" alt="Profile">
                    <div class="profile-meta">
                        <h2>M.TAHA KHUWAJA</h2>
                        <p style="color: var(--text-muted);">Elite Member since Feb 2026</p>
                    </div>
                    <div class="glass" style="padding: 10px 20px; border-radius: 30px; font-size: 0.8rem;">
                        <i data-lucide="map-pin" style="width:14px; vertical-align:middle; margin-right:5px"></i> Karachi, Pakistan
                    </div>
                </div>

                <div class="skill-wallet-card">
                    <span class="wallet-label">SKILL WALLET BALANCE</span>
                    <span class="wallet-balance">4,250 SWP</span>
                    <p style="font-size: 0.75rem; opacity: 0.9; margin-top: 10px;">Token value: $42.50 USD</p>
                    <button style="margin-top: 15px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 8px; border-radius: 10px; cursor: pointer; font-weight: 600;">Withdraw Tokens</button>
                </div>
            </div>

            <div class="skills-manager">
                <div class="skill-section glass">
                    <h3>Skills I Offer</h3>
                    <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 4px;">These are the skills you can teach to others.</p>
                    <div class="tags-container">
                        <span class="tag-removable">React.js <i data-lucide="x" class="remove-icon"></i></span>
                        <span class="tag-removable">UI/UX Design <i data-lucide="x" class="remove-icon"></i></span>
                        <span class="tag-removable">Product Strategy <i data-lucide="x" class="remove-icon"></i></span>
                        <span class="tag-removable">TypeScript <i data-lucide="x" class="remove-icon"></i></span>
                        <button class="glass" style="padding: 8px 16px; border-radius: 30px; border-style: dashed; cursor: pointer;">+ Add New</button>
                    </div>
                </div>

                <div class="skill-section glass">
                    <h3>Skills I Want to Learn</h3>
                    <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 4px;">Topics you're interested in exploring.</p>
                    <div class="tags-container">
                        <span class="tag-removable">Jazz Guitar <i data-lucide="x" class="remove-icon"></i></span>
                        <span class="tag-removable">Python Deep Learning <i data-lucide="x" class="remove-icon"></i></span>
                        <span class="tag-removable">Video Production <i data-lucide="x" class="remove-icon"></i></span>
                        <button class="glass" style="padding: 8px 16px; border-radius: 30px; border-style: dashed; cursor: pointer;">+ Add New</button>
                    </div>
                </div>

                <div class="analytics-card glass" style="padding: 2rem;">
                    <h3 style="margin-bottom: 2rem;">Expertise Mastery</h3>
                    <div style="display: flex; justify-content: space-around; gap: 2rem; flex-wrap: wrap;">
                        <div style="text-align: center;">
                            ${getProgressRing(95)}
                            <p style="margin-top: 1rem; font-weight: 600; font-size: 0.85rem;">Frontend Architecture</p>
                        </div>
                        <div style="text-align: center;">
                            ${getProgressRing(78)}
                            <p style="margin-top: 1rem; font-weight: 600; font-size: 0.85rem;">UI/UX Mastery</p>
                        </div>
                        <div style="text-align: center;">
                            ${getProgressRing(45)}
                            <p style="margin-top: 1rem; font-weight: 600; font-size: 0.85rem;">AI Integration</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;
    container.innerHTML = html;
}

function renderCollaborationHub(container) {
    const communityMessages = [
        { user: "Sarah Chen", text: "Has anyone tried the new React 19 hooks?", time: "2:04 PM" },
        { user: "Marcus Thorne", text: "The whiteboard is great for sketching UI flows!", time: "2:10 PM" },
        { user: "Elena Rodriguez", text: "I'll be starting the Jazz appreciation session in 5 mins.", time: "2:15 PM" },
        { user: "David Kim", text: "Can someone help with this Python recursion error?", time: "2:18 PM" }
    ];

    const html = `
        <div class="section-title">
            <h1><span class="neon-cyan">Virtual Workshop</span> Hub</h1>
            <div style="display:flex; gap: 10px; align-items:center;">
                <div class="live-indicator"></div>
                <span style="font-size: 0.85rem; color: #10b981; font-weight: 600;">14 Peers Online</span>
            </div>
        </div>

        <div class="classroom-layout">
            <!-- Left Side: Community Chat -->
            <aside class="community-chat glass">
                <div style="padding: 1.25rem; border-bottom: 1px solid var(--glass-border);">
                    <h3 style="font-size: 1rem; display: flex; align-items:center; gap:8px;">
                        <i data-lucide="users" style="width:18px"></i> Community Chat
                    </h3>
                </div>
                <div class="chat-messages-container">
                    ${communityMessages.map(m => `
                        <div class="community-message">
                            <span class="user-tag">${m.user}</span>
                            <p style="font-size: 0.9rem; line-height: 1.4;">${m.text}</p>
                            <span style="font-size: 0.7rem; color: var(--text-muted); display: block; margin-top: 4px; text-align: right;">${m.time}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="chat-input-area">
                    <input type="text" class="chat-input" placeholder="Message the community..." style="font-size: 0.85rem;">
                    <button class="upgrade-btn" style="width: 40px; padding: 0;"><i data-lucide="send" style="width:16px"></i></button>
                </div>
            </aside>

            <!-- Right Side: Interactive Workspace/Whiteboard -->
            <div class="interactive-workspace">
                <div class="whiteboard-box">
                    <div class="workspace-tools">
                        <button class="tool-btn active" title="Pencil" id="tool-pencil"><i data-lucide="pencil"></i></button>
                        <button class="tool-btn" title="Eraser" id="tool-eraser"><i data-lucide="eraser"></i></button>
                        <button class="tool-btn" title="Square" id="tool-square"><i data-lucide="square"></i></button>
                        <button class="tool-btn" title="Circle" id="tool-circle"><i data-lucide="circle"></i></button>
                        <div style="width:1px; background: var(--glass-border); margin: 0 5px;"></div>
                        <button class="tool-btn" title="Clear Board" id="tool-clear"><i data-lucide="trash-2"></i></button>
                    </div>

                    <canvas id="whiteboard-canvas"></canvas>

                    <div class="whiteboard-status">
                        <i data-lucide="eye" style="width:14px"></i>
                        <span>Marcus Thorne is viewing</span>
                    </div>
                </div>

                <div class="classroom-controls">
                    <div class="control-circle mic" title="Mute/Unmute"><i data-lucide="mic"></i></div>
                    <div class="control-circle video" title="Toggle Camera"><i data-lucide="video"></i></div>
                    <div class="control-circle share" title="Share Screen"><i data-lucide="monitor-up"></i></div>
                    <div class="control-circle end" title="Leave Session"><i data-lucide="log-out"></i></div>
                </div>
            </div>
        </div>
    `;
    container.innerHTML = html;

    // Initialize complex classroom features
    setTimeout(initWhiteboard, 100);
}

function initWhiteboard() {
    const canvas = document.getElementById('whiteboard-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;

    // Resize to fit container
    const resize = () => {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        // Reset context styles after resize
        ctx.lineCap = 'round';
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#0ea5e9';
    };

    window.addEventListener('resize', resize);
    resize();

    let drawing = false;

    const start = (e) => {
        drawing = true;
        draw(e);
    };

    const end = () => {
        drawing = false;
        ctx.beginPath();
    };

    const draw = (e) => {
        if (!drawing) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
        const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('mousemove', draw);

    // Touch support
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); start(e); });
    canvas.addEventListener('touchend', end);
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });

    // Tool buttons interaction
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.id === 'tool-clear') {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }
            document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (btn.id === 'tool-eraser') {
                ctx.strokeStyle = '#020617';
                ctx.lineWidth = 20;
            } else {
                ctx.strokeStyle = '#0ea5e9';
                ctx.lineWidth = 3;
            }
        });
    });
}

function renderPlaceholder(name) {
    document.getElementById('page-content').innerHTML = `
        <div style="height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem;">
            <i data-lucide="construction" style="width: 64px; height: 64px; color: var(--primary);"></i>
            <h1>${name}</h1>
            <p style="color: var(--text-muted);">This module is currently under development for the Elite version.</p>
        </div>
    `;
    lucide.createIcons();
}

function renderSkillMap(container) {
    const skills = [
        { name: "React 19", x: 20, y: 30, size: 1.2 },
        { name: "Three.js", x: 60, y: 20, size: 1.5 },
        { name: "AI Agents", x: 40, y: 60, size: 1.8 },
        { name: "Solana", x: 80, y: 50, size: 1.1 },
        { name: "UX Design", x: 15, y: 70, size: 1.4 },
        { name: "Python", x: 70, y: 80, size: 1.3 }
    ];

    const html = `
        <div class="section-title">
            <h1><span class="neon-cyan">Live Community</span> Skill Map</h1>
            <p style="color: var(--text-muted);">Real-time map of trending topics in the Elite community.</p>
        </div>

        <div class="skill-map-container glass">
            ${skills.map((s, i) => `
                <div class="skill-node glass" style="left: ${s.x}%; top: ${s.y}%; transform: scale(${s.size}); animation-delay: ${i * 0.5}s;">
                    <i data-lucide="zap" style="width:12px; margin-right:5px; color: var(--primary)"></i>
                    ${s.name}
                </div>
            `).join('')}

            <div style="position: absolute; bottom: 2rem; left: 2rem; display: flex; gap: 1.5rem;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <div style="width:10px; height:10px; border-radius:50%; background: var(--primary); box-shadow: 0 0 10px var(--primary);"></div>
                    <span style="font-size: 0.75rem;">Trending Now</span>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                    <div style="width:10px; height:10px; border-radius:50%; background: var(--secondary); box-shadow: 0 0 10px var(--secondary);"></div>
                    <span style="font-size: 0.75rem;">High Demand</span>
                </div>
            </div>
        </div>
    `;
    container.innerHTML = html;
}

function renderSkillMatch(container) {
    const matches = [
        { name: "Sarah Chen", role: "Frontend Architect", skill: "React 19 Hooks", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
        { name: "Marcus Thorne", role: "Digital Artist", skill: "Miro Board Layouts", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" },
        { name: "David Kim", role: "AI Researcher", skill: "Agentic Workflows", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" }
    ];

    const html = `
        <div class="section-title">
            <h1><span class="neon-cyan">Skill Match</span> Swiper</h1>
            <button class="upgrade-btn">Match Settings</button>
        </div>

        <div class="swipe-container">
            ${matches.map((m, i) => `
                <div class="swipe-card glass ${i === 0 ? '' : 'hidden'}" id="card-${i}">
                    <img src="${m.avatar}" style="width: 100%; height: 250px; border-radius: 12px; object-fit: cover; margin-bottom: 1.5rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
                        <h2 style="font-size: 1.5rem;">${m.name}</h2>
                        <span style="color: var(--primary); font-size: 0.8rem; font-weight: 700;">${m.role}</span>
                    </div>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">Expert in <strong>${m.skill}</strong>. Looking to learn Advanced Type Theory.</p>
                    <div class="tags-container" style="gap: 8px;">
                        <span class="skill-tag" style="background: var(--primary-glow)">Verified Mentor</span>
                        <span class="skill-tag" style="background: var(--secondary-glow)">Fast Responder</span>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="swipe-actions">
            <div class="action-circle action-dislike glass" onclick="window.nextCard(false)"><i data-lucide="x"></i></div>
            <div class="action-circle action-like glass" onclick="window.nextCard(true)"><i data-lucide="heart"></i></div>
        </div>
    `;

    container.innerHTML = html;

    // Global function for swipe logic
    let currentCard = 0;
    window.nextCard = (liked) => {
        const card = document.getElementById(`card-${currentCard}`);
        if (!card) return;

        card.style.transform = liked ? 'translateX(500px) rotate(20deg)' : 'translateX(-500px) rotate(-20deg)';
        card.style.opacity = '0';

        currentCard++;
        const next = document.getElementById(`card-${currentCard}`);
        if (next) {
            next.classList.remove('hidden');
        } else {
            // Reset for demo
            setTimeout(() => renderSkillMatch(container), 1000);
        }
    };
}

// --- Chart Initialization ---

function initChart() {
    const chartEl = document.getElementById('activityChart');
    if (!chartEl) return;

    const ctx = chartEl.getContext('2d');

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(14, 165, 233, 0.4)');
    gradient.addColorStop(1, 'rgba(14, 165, 233, 0.0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Learning Hours',
                data: [4, 6, 3, 8, 5, 2, 7],
                borderColor: '#0ea5e9',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#0ea5e9',
                pointBorderColor: '#fff',
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                }
            }
        }
    });
}

function renderSettings(container) {
    const html = `
        <div class="section-title">
            <h1>User <span class="neon-cyan">Settings</span></h1>
            <button class="upgrade-btn loading-btn" id="save-settings-btn">Save Changes</button>
        </div>

        <div class="settings-layout">
            <aside class="settings-nav glass">
                <div class="settings-nav-item active" data-tab="personal">
                    <i data-lucide="user"></i>
                    <span>Personal Details</span>
                </div>
                <div class="settings-nav-item" data-tab="profile">
                    <i data-lucide="shield-check"></i>
                    <span>Public Profile</span>
                </div>
                <div class="settings-nav-item" data-tab="language">
                    <i data-lucide="languages"></i>
                    <span>Language</span>
                </div>
                <div class="settings-nav-item" data-tab="skills">
                    <i data-lucide="code-2"></i>
                    <span>Skills Portfolio</span>
                </div>
                <div style="flex:1"></div>
                <div class="settings-nav-item" style="color: #ef4444;" id="settings-logout">
                    <i data-lucide="log-out"></i>
                    <span>Sign Out</span>
                </div>
            </aside>

            <div class="settings-content-area" id="settings-tab-content">
                <!-- Tab content will be injected here -->
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Tab switching logic
    const tabs = document.querySelectorAll(".settings-nav-item[data-tab]");
    const tabContent = document.getElementById("settings-tab-content");

    const switchTab = (tabId) => {
        tabs.forEach(t => {
            if (t.getAttribute("data-tab") === tabId) {
                t.classList.add("active");
            } else {
                t.classList.remove("active");
            }
        });
        renderSettingsTab(tabId, tabContent);
        lucide.createIcons();
    };

    tabs.forEach(tab => {
        tab.addEventListener("click", () => switchTab(tab.getAttribute("data-tab")));
    });

    // Default tab
    switchTab("personal");

    // Save button animation
    document.getElementById("save-settings-btn").addEventListener("click", function () {
        const btn = this;
        const originalText = btn.innerText;
        btn.innerText = "Saving...";
        btn.style.opacity = "0.7";

        setTimeout(() => {
            btn.innerText = "Saved Successfully!";
            btn.style.background = "#10b981";
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "";
                btn.style.opacity = "1";
            }, 2000);
        }, 1500);
    });

    // Logout logic
    document.getElementById("settings-logout").addEventListener("click", () => {
        sessionStorage.removeItem("ss_authenticated");
        location.reload();
    });
}

function renderSettingsTab(tabId, container) {
    let html = "";
    switch (tabId) {
        case "personal":
            html = `
                <div class="settings-section">
                    <div class="settings-card glass">
                        <h3 style="margin-bottom: 1.5rem;">Personal Information</h3>
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" class="form-input" value="M.TAHA KHUWAJA" placeholder="Your full name">
                        </div>
                        <div class="form-group">
                            <label>Email Address <span class="verified-badge"><i data-lucide="check-circle" style="width:10px"></i> Verified</span></label>
                            <input type="email" class="form-input" value="m.taha@skillswap.dev" readonly style="opacity:0.6">
                        </div>
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                            <div class="form-group">
                                <label>Phone Number</label>
                                <input type="tel" class="form-input" value="+92 300 0000000">
                            </div>
                            <div class="form-group">
                                <label>Location</label>
                                <input type="text" class="form-input" value="Karachi, Pakistan">
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
        case "profile":
            html = `
                <div class="settings-section">
                    <div class="settings-card glass">
                        <h3 style="margin-bottom: 1.5rem;">Public Branding</h3>
                        <div class="avatar-upload-container">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MTK" class="avatar-upload-preview">
                            <div class="avatar-edit-overlay">
                                <i data-lucide="camera" style="color:white"></i>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Professional Bio / Tagline</label>
                            <textarea class="form-input" style="height:100px; resize:none;">M.TAHA KHUWAJA (MTK) | Elite Developer & SkillSwaper. Passionate about building premium p2p learning ecosystems.</textarea>
                        </div>
                        <div class="form-group">
                            <label>Social Media Presence</label>
                            <div style="display:flex; flex-direction:column; gap:1rem;">
                                <div class="social-input-wrapper">
                                    <i data-lucide="github"></i>
                                    <input type="text" class="form-input" value="github.com/alexrivera">
                                </div>
                                <div class="social-input-wrapper">
                                    <i data-lucide="twitter"></i>
                                    <input type="text" class="form-input" value="twitter.com/alex_dev">
                                </div>
                                <div class="social-input-wrapper">
                                    <i data-lucide="linkedin"></i>
                                    <input type="text" class="form-input" value="linkedin.com/in/alexrivera">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
        case "language":
            html = `
                <div class="settings-section">
                    <div class="settings-card glass">
                        <h3 style="margin-bottom: 1.5rem;">Language Preferences</h3>
                        <div class="form-group">
                            <label>Languages I Speak (Multi-select)</label>
                            <div class="skill-tag-input-container">
                                <span class="tag-item">English <span class="tag-remove">×</span></span>
                                <span class="tag-item">Spanish <span class="tag-remove">×</span></span>
                                <span class="tag-item">Mandarin <span class="tag-remove">×</span></span>
                                <input type="text" style="background:transparent; border:none; outline:none; color:white; min-width:100px;" placeholder="Add language...">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Interface Language</label>
                            <select class="form-input" style="background: var(--bg-deep);">
                                <option>English (US) - Default</option>
                                <option>British English</option>
                                <option>German (Deutsch)</option>
                                <option>French (Français)</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
            break;
        case "skills":
            html = `
                <div class="settings-section">
                    <div class="settings-card glass">
                        <h3>Interactive Skills Portfolio</h3>
                        <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 5px; margin-bottom: 2rem;">Manage the skills you offer and want to learn with precision.</p>
                        
                        <div style="margin-bottom: 2.5rem;">
                            <h4 style="margin-bottom: 1rem; color: var(--primary);">Skills I am Teaching</h4>
                            <div style="display:flex; flex-direction:column; gap:1.5rem;">
                                <div class="skill-level-row glass" style="padding:1.5rem; border-radius:16px;">
                                    <div style="display:flex; justify-content:space-between; margin-bottom: 1rem;">
                                        <span style="font-weight:700;">React & Next.js</span>
                                        <span style="color: var(--primary); font-weight:700;">Expert</span>
                                    </div>
                                    <input type="range" class="range-slider" min="0" max="100" value="90">
                                    <div class="level-labels">
                                        <span>Beginner</span>
                                        <span>Intermediate</span>
                                        <span>Expert</span>
                                    </div>
                                </div>
                                <div class="skill-level-row glass" style="padding:1.5rem; border-radius:16px;">
                                    <div style="display:flex; justify-content:space-between; margin-bottom: 1rem;">
                                        <span style="font-weight:700;">UI/UX Design</span>
                                        <span style="color: var(--primary); font-weight:700;">Advanced</span>
                                    </div>
                                    <input type="range" class="range-slider" min="0" max="100" value="75">
                                    <div class="level-labels">
                                        <span>Beginner</span>
                                        <span>Intermediate</span>
                                        <span>Expert</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 style="margin-bottom: 1rem; color: var(--secondary);">Skills I Want to Learn</h4>
                            <div class="skill-tag-input-container">
                                <span class="tag-item" style="background: var(--secondary-glow); color: var(--secondary);">Type Theory <span class="tag-remove">×</span></span>
                                <span class="tag-item" style="background: var(--secondary-glow); color: var(--secondary);">Solana Dev <span class="tag-remove">×</span></span>
                                <input type="text" style="background:transparent; border:none; outline:none; color:white; min-width:100px;" placeholder="Add skill...">
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
    container.innerHTML = html;
}

// --- Authentication System ---

function renderAuthPage() {
    const container = document.getElementById("auth-container");
    container.innerHTML = `
        <div class="auth-wrapper">
            <div class="auth-card glass">
                <div class="auth-header">
                    <div class="auth-logo">
                        <div class="logo-icon"><i data-lucide="zap"></i></div>
                        <h1 class="logo-text">SkillSwap</h1>
                    </div>
                    <p style="color: var(--text-muted); font-size: 0.95rem;">Elite Peer-to-Peer Learning Platform</p>
                </div>

                <div class="auth-tabs" id="auth-tabs">
                    <div class="auth-tab active" data-mode="signin">Sign In</div>
                    <div class="auth-tab" data-mode="signup">Sign Up</div>
                </div>

                <div id="auth-form-content">
                    <!-- Form injected here -->
                </div>
            </div>
        </div>
    `;

    lucide.createIcons();
    renderAuthForm("signin");

    // Tab Logic
    document.querySelectorAll(".auth-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".auth-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            renderAuthForm(tab.getAttribute("data-mode"));
        });
    });
}

function renderAuthForm(mode) {
    const content = document.getElementById("auth-form-content");
    let title = mode === "signin" ? "Welcome Back" : "Create Account";
    let btnText = mode === "signup" ? "Create Elite Account" : "Sign In to SkillSwap";

    content.innerHTML = `
        <div style="animation: fadeIn 0.3s ease-out">
            <h2 style="margin-bottom: 1.5rem; text-align: center;">${title}</h2>
            <div class="form-group">
                <label>Email Address</label>
                <input type="email" class="form-input" id="auth-email" placeholder="name@company.com">
            </div>
            <div class="form-group" style="margin-bottom: 2rem;">
                <label>Password</label>
                <input type="password" class="form-input" id="auth-pass" placeholder="••••••••">
            </div>
            ${mode === "signup" ? `
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" class="form-input" placeholder="M.TAHA KHUWAJA">
                </div>
            ` : ""}
            <button class="upgrade-btn" style="width: 100%; height: 50px;" id="auth-submit-btn">${btnText}</button>
        </div>
    `;

    document.getElementById("auth-submit-btn").addEventListener("click", () => {
        const btn = document.getElementById("auth-submit-btn");
        btn.innerText = "Authenticating...";

        setTimeout(() => {
            sessionStorage.setItem("ss_authenticated", "true");
            location.reload();
        }, 1200);
    });
}


/* --- Progress Glow Rings Component --- */

function getProgressRing(value, colorCls = "") {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    const isHigh = value > 80 ? "glow-intensity-high" : "";

    return `
        <div class="progress-ring-container">
            <svg class="progress-ring" width="120" height="120">
                <circle class="progress-ring-circle-bg" cx="60" cy="60" r="${radius}"/>
                <circle class="progress-ring-circle ${isHigh}" cx="60" cy="60" r="${radius}" 
                    style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset};"/>
            </svg>
            <span class="progress-ring-value">${value}%</span>
        </div>
    `;
}

/* --- Toast Notification System --- */

function showToast(message, type = "swap") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast-notification glass";

    const icon = type === "swap" ? "refresh-cw" : "zap";

    toast.innerHTML = `
        <div class="toast-icon pulse-animation">
            <i data-lucide="${icon}" style="width:16px"></i>
        </div>
        <div class="toast-content">
            <p style="font-size: 0.85rem; font-weight: 500;">${message}</p>
        </div>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.style.animation = "toastFadeOut 0.5s forwards";
        setTimeout(() => toast.remove(), 500);
    }, 5000);
}

// Simulate random activity
setInterval(() => {
    const activities = [
        "Someone just swapped React for UI Design!",
        "Marcus is now teaching Python Agents.",
        "Sarah Chen endorsed your frontend skills.",
        "New Expert Mentor joined: Elena Rodriguez",
        "A swap for Jazz Guitar was just completed!"
    ];
    if (Math.random() > 0.7 && document.getElementById("toast-container")) {
        showToast(activities[Math.floor(Math.random() * activities.length)]);
    }
}, 8000);

