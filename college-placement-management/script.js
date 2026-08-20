const content=document.getElementById("content");
const toast=document.getElementById("toast");
const modalBackdrop=document.getElementById("modalBackdrop");
const modal=document.getElementById("modal");

const students=[
 {name:"Aadhya Menon",roll:"23CSE014",branch:"CSE",cgpa:9.1,backlogs:0,skills:"Python, React, DSA",status:"Eligible"},
 {name:"Ishaan Verma",roll:"23ECE027",branch:"ECE",cgpa:8.7,backlogs:0,skills:"Embedded C, IoT",status:"Eligible"},
 {name:"Mira Kulkarni",roll:"23IT041",branch:"IT",cgpa:8.4,backlogs:1,skills:"Java, SQL, Spring",status:"Eligible"},
 {name:"Devansh Rao",roll:"23CSE056",branch:"CSE",cgpa:7.6,backlogs:0,skills:"Node.js, MongoDB",status:"Eligible"},
 {name:"Tara Joseph",roll:"23ME019",branch:"MECH",cgpa:6.9,backlogs:2,skills:"AutoCAD, Python",status:"Not Eligible"},
 {name:"Kabir Shah",roll:"23EEE033",branch:"EEE",cgpa:8.0,backlogs:0,skills:"MATLAB, PLC",status:"Eligible"}
];

const companies=[
 {name:"NovaByte Labs",type:"Product Engineering",positions:9,package:"₹9.8 LPA",cls:""},
 {name:"BluePeak Consulting",type:"Digital Consulting",positions:7,package:"₹8.6 LPA",cls:"coral"},
 {name:"OrbitWorks",type:"Cloud & Platforms",positions:11,package:"₹12.4 LPA",cls:"mint"},
 {name:"PixelForge Studio",type:"Design & Technology",positions:5,package:"₹7.9 LPA",cls:"gold"},
 {name:"Northstar Systems",type:"Enterprise Software",positions:14,package:"₹10.5 LPA",cls:""},
 {name:"TerraFin",type:"FinTech & Analytics",positions:6,package:"₹13.2 LPA",cls:"coral"}
];

const drives=[
 {company:"NovaByte Labs",role:"Frontend Engineer",date:"09 Sep 2026",place:"Innovation Hall",branch:"CSE, IT",cgpa:"7.5",status:"Registration Open"},
 {company:"OrbitWorks",role:"Cloud Associate",date:"14 Sep 2026",place:"Tech Forum",branch:"CSE, ECE",cgpa:"8.0",status:"Upcoming"},
 {company:"BluePeak Consulting",role:"Business Analyst",date:"18 Sep 2026",place:"Seminar Theatre",branch:"All Branches",cgpa:"7.2",status:"Upcoming"},
 {company:"Northstar Systems",role:"Backend Developer",date:"24 Sep 2026",place:"Digital Lab",branch:"CSE, IT",cgpa:"7.8",status:"Registration Open"}
];

const applications=[
 ["Aadhya Menon","NovaByte Labs","Frontend Engineer","9.1","Eligible","Shortlisted"],
 ["Ishaan Verma","OrbitWorks","Cloud Associate","8.7","Eligible","Under Review"],
 ["Mira Kulkarni","TerraFin","Data Analyst","8.4","Eligible","Shortlisted"],
 ["Devansh Rao","Northstar Systems","Backend Developer","7.6","Eligible","Under Review"],
 ["Tara Joseph","BluePeak Consulting","Business Analyst","6.9","Not Eligible","Rejected"]
];

function layout(title,eyebrow,subtitle,buttonText="",action=""){
 return `<div class="page-head"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p class="subtitle">${subtitle}</p></div>${buttonText?`<button class="primary-btn" onclick="${action}">${buttonText}</button>`:""}</div>`;
}
function badge(status){
 const map={Eligible:"eligible",Selected:"selected","Under Review":"review",Rejected:"rejected",Shortlisted:"shortlisted","Not Eligible":"rejected"};
 return `<span class="badge ${map[status]||"shortlisted"}">${status}</span>`;
}
function stat(icon,label,value,trend,foot){
 return `<div class="stat-card"><div class="stat-top"><span>${label}</span><span class="stat-icon">${icon}</span></div><div class="stat-value">${value}</div><div class="stat-foot">${trend?`<span class="up">${trend}</span> `:""}${foot}</div></div>`;
}

function dashboard(){
 return layout("Good morning, Career Cell ✨","PLACEMENT PULSE · 2026–27","A quick view of the latest campus hiring activity.","+ Create Event","openDriveModal()")+
 `<div class="stats">
 ${stat("♙","Registered Students","1,536","+ 9.8%","vs. previous cycle")}
 ${stat("◫","Recruiting Partners","31","+ 12.4%","9 new partners onboarded")}
 ${stat("✦","Offers Confirmed","274","+ 18.6%","26 offers this week")}
 ${stat("₹","Median Package","₹9.1 LPA","+ 7.3%","Top offer: ₹22.6 LPA")}
 </div>
 <div class="grid-2">
  <div class="card"><div class="card-title"><div><h3>Hiring Momentum</h3><p>Offers confirmed by month</p></div><select><option>2026–27</option><option>2025–26</option></select></div>
   <div class="chart">${["Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr"].map((m,i)=>`<div class="bar-col"><div class="bar" style="--h:${[25,39,48,61,55,73,84,94][i]}%"></div><span>${m}</span></div>`).join("")}</div>
  </div>
  <div class="card"><div class="card-title"><div><h3>Offers by School</h3><p>Current distribution across departments</p></div><span>•••</span></div>
   <div class="donut-wrap"><div class="donut"><div class="donut-center">274<small>Offers</small></div></div>
   <div class="legend">${[["var(--violet)","CSE","34%"],["var(--coral)","IT","25%"],["var(--mint)","ECE","18%"],["var(--gold)","EEE","13%"],["#e6e1e9","Others","10%"]].map(x=>`<div class="legend-row"><span class="dot" style="background:${x[0]}"></span>${x[1]}<b>${x[2]}</b></div>`).join("")}</div></div>
  </div>
 </div>
 <div class="card section-gap"><div class="card-title"><div><h3>Live Application Queue</h3><p>Latest screening activity across active recruiters</p></div><button class="ghost-btn" onclick="navigate('applications')">Open Queue</button></div>
 <div class="table-wrap"><table class="table"><thead><tr><th>STUDENT</th><th>RECRUITER</th><th>ROLE</th><th>CGPA</th><th>ELIGIBILITY</th><th>STATUS</th></tr></thead><tbody>${applications.map(a=>`<tr><td><div class="student-cell"><span class="mini-avatar">${a[0].split(" ").map(n=>n[0]).join("")}</span>${a[0]}</div></td><td>${a[1]}</td><td>${a[2]}</td><td>${a[3]}</td><td>${badge(a[4])}</td><td>${badge(a[5])}</td></tr>`).join("")}</tbody></table></div></div>`;
}

function studentRows(data){
 return data.map(s=>`<tr><td><div class="student-cell"><span class="mini-avatar">${s.name.split(" ").map(n=>n[0]).join("")}</span>${s.name}</div></td><td>${s.roll}</td><td>${s.branch}</td><td>${s.cgpa}</td><td>${s.backlogs}</td><td>${s.skills}</td><td>${badge(s.status)}</td></tr>`).join("");
}
function studentsPage(){
 return layout("Student Hub","ELIGIBILITY STUDIO","Review CGPA, backlog and skill signals before a student enters a hiring event.","+ Add Student","openStudentModal()")+
 `<div class="filter-row"><select id="branchFilter"><option>All Branches</option><option>CSE</option><option>ECE</option><option>IT</option><option>EEE</option><option>MECH</option></select><select id="statusFilter"><option>All Status</option><option>Eligible</option><option>Not Eligible</option></select><input id="minCgpa" type="number" step=".1" placeholder="Minimum CGPA"></div>
 <div class="card"><div class="card-title"><div><h3>Eligibility Roster</h3><p>Demo student records for the current placement cycle</p></div><span class="badge shortlisted">${students.length} Students</span></div>
 <div class="table-wrap"><table class="table"><thead><tr><th>STUDENT</th><th>ROLL NUMBER</th><th>BRANCH</th><th>CGPA</th><th>BACKLOGS</th><th>SKILLS</th><th>STATUS</th></tr></thead><tbody id="studentRows">${studentRows(students)}</tbody></table></div></div>`;
}

function companiesPage(){
 return layout("Recruiters","RECRUITMENT NETWORK","A curated view of organizations joining the current campus cycle.","+ Add Recruiter","openCompanyModal()")+
 `<div class="cards-grid">${companies.map(c=>`<div class="card company-card"><div class="company-logo ${c.cls}">${c.name.split(" ").map(w=>w[0]).join("").slice(0,2)}</div><h3>${c.name}</h3><div class="muted">${c.type}</div><div class="card-row"><span>${c.positions} Open Roles</span><strong>${c.package}</strong></div><div class="card-actions"><button class="ghost-btn" onclick="showToast('Opening ${c.name} profile')">View Profile</button></div></div>`).join("")}</div>`;
}

function drivesPage(){
 return layout("Hiring Events","CAMPUS HIRING CALENDAR","Plan recruitment events, venues and eligibility windows.","+ Create Event","openDriveModal()")+
 `<div class="cards-grid">${drives.map(d=>`<div class="card drive-card"><div class="card-title"><div><div class="company-logo mint" style="width:40px;height:40px;margin:0">${d.company.split(" ").map(w=>w[0]).join("").slice(0,2)}</div></div><span class="badge ${d.status==="Registration Open"?"eligible":"shortlisted"}">${d.status}</span></div><h3>${d.company}</h3><div class="muted">${d.role}</div><div class="card-row"><span>◷ ${d.date}</span><strong>${d.cgpa}+ CGPA</strong></div><div class="muted" style="margin-top:10px">⌖ ${d.place} · ${d.branch}</div><div class="card-actions"><button class="ghost-btn" onclick="showToast('Event details opened')">View Event</button></div></div>`).join("")}</div>`;
}

function applicationsPage(){
 return layout("Applications","SCREENING DESK","Sort, review and shortlist applications using recruiter-specific rules.","Export Summary","showToast('Placement summary exported')")+
 `<div class="kpi-row">${stat("✦","Applications","968","","received this cycle")}${stat("✓","Eligible","702","","passed criteria")}${stat("◆","Shortlisted","421","","moved forward")}${stat("×","Declined","267","","not progressing")}</div>
 <div class="card"><div class="card-title"><div><h3>Screening Queue</h3><p>Company-specific application decisions</p></div><select><option>All Recruiters</option><option>NovaByte Labs</option><option>OrbitWorks</option><option>TerraFin</option></select></div>
 <div class="table-wrap"><table class="table"><thead><tr><th>STUDENT</th><th>RECRUITER</th><th>ROLE</th><th>CGPA</th><th>ELIGIBILITY</th><th>APPLICATION</th></tr></thead><tbody>${applications.map(a=>`<tr><td><b>${a[0]}</b></td><td>${a[1]}</td><td>${a[2]}</td><td>${a[3]}</td><td>${badge(a[4])}</td><td>${badge(a[5])}</td></tr>`).join("")}</tbody></table></div></div>`;
}

function pipelinePage(){
 const cols=[
  ["Aptitude",["Aadhya Menon|NovaByte Labs","Ishaan Verma|OrbitWorks","Kabir Shah|Northstar Systems"],17],
  ["Technical",["Mira Kulkarni|TerraFin","Devansh Rao|Northstar Systems","Naina Kapoor|PixelForge"],10],
  ["Managerial",["Zoya Mehta|BluePeak Consulting","Arnav Sethi|NovaByte Labs"],7],
  ["Final Select",["Rhea Das|OrbitWorks · ₹12.4 LPA","Vihaan Jain|TerraFin · ₹13.2 LPA"],5],
  ["Offer Sent",["Kian Thomas|NovaByte · ₹9.8 LPA","Leela Nair|Northstar · ₹10.5 LPA"],3]
 ];
 return layout("Talent Flow","SELECTION PIPELINE","Follow each candidate from first assessment to offer.","+ Add Candidate","showToast('Candidate added to talent flow')")+
 `<div class="pipeline">${cols.map(c=>`<div class="pipeline-col"><div class="pipeline-head"><span>${c[0]}</span><span class="count">${c[2]}</span></div>${c[1].map(x=>{const p=x.split("|");return `<div class="candidate"><strong>${p[0]}</strong><small>${p[1]}</small></div>`}).join("")}</div>`).join("")}</div>`;
}

function interviewsPage(){
 const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
 const nums=Array.from({length:30},(_,i)=>i+1);
 const events={4:["NovaByte","coral"],9:["Technical",""],12:["OrbitWorks","mint"],17:["HR Panel","coral"],23:["TerraFin",""],28:["Final Round","mint"]};
 return layout("Interview Planner","INTERVIEW CONTROL","Coordinate technical, managerial and HR rounds without clashes.","+ Schedule Round","showToast('Interview form opened')")+
 `<div class="card"><div class="card-title"><div><h3>September 2026</h3><p>Live interview calendar · 6 active rounds</p></div><div><button class="ghost-btn">‹</button> <button class="ghost-btn">›</button></div></div>
 <div class="calendar">${days.map(d=>`<div class="day-head">${d}</div>`).join("")}${nums.map(n=>`<div class="day"><div class="day-number">${n}</div>${events[n]?`<div class="event ${events[n][1]}">${events[n][0]}</div>`:""}</div>`).join("")}</div></div>`;
}

function analyticsPage(){
 return layout("Placement Insights","DATA & OUTCOMES","Understand hiring velocity, department success and package movement.","Export Insights","showToast('Insights exported')")+
 `<div class="stats">${stat("✦","Offers Confirmed","274","+ 18.6%","this cycle")}${stat("₹","Median Package","₹9.1 LPA","+ 7.3%","year over year")}${stat("◫","Recruiters","31","+ 12.4%","participating")}${stat("★","Top Package","₹22.6 LPA","+ 14.2%","highest offer")}</div>
 <div class="analytics-grid"><div class="card"><div class="card-title"><div><h3>Placement Success Rate</h3><p>Placed students vs eligible pool</p></div></div>${[["CSE",86],["IT",82],["ECE",77],["EEE",71],["MECH",63]].map(x=>`<div class="progress-row"><div class="progress-label"><span>${x[0]}</span><b>${x[1]}%</b></div><div class="progress-track"><div class="progress-fill" style="width:${x[1]}%"></div></div></div>`).join("")}</div>
 <div class="card"><div class="card-title"><div><h3>Package Bands</h3><p>Offer distribution by CTC range</p></div></div><div class="chart">${["<6L","6–9L","9–12L","12–16L","16L+"].map((m,i)=>`<div class="bar-col"><div class="bar" style="--h:${[32,68,91,58,35][i]}%"></div><span>${m}</span></div>`).join("")}</div></div></div>`;
}

function criteriaPage(){
 return layout("Role Criteria","HIRING RULEBOOK","Create transparent eligibility rules for every role.","+ Add Rule","openCriteriaModal()")+
 `<div class="cards-grid">
 <div class="card"><h3>NovaByte Labs · Frontend Engineer</h3><p class="subtitle">CGPA ≥ 7.5 · No active backlog</p><div class="card-row"><span>React · JS · Git</span><strong>CSE, IT</strong></div></div>
 <div class="card"><h3>OrbitWorks · Cloud Associate</h3><p class="subtitle">CGPA ≥ 8.0 · Max 1 backlog</p><div class="card-row"><span>AWS · Linux · Python</span><strong>CSE, ECE</strong></div></div>
 <div class="card"><h3>TerraFin · Data Analyst</h3><p class="subtitle">CGPA ≥ 8.2 · No active backlog</p><div class="card-row"><span>SQL · Excel · Power BI</span><strong>CSE, IT, EEE</strong></div></div>
 <div class="card"><h3>BluePeak · Business Analyst</h3><p class="subtitle">CGPA ≥ 7.2 · Max 1 backlog</p><div class="card-row"><span>Communication · Analytics</span><strong>All Branches</strong></div></div>
 </div>`;
}

function settingsPage(){
 return layout("Preferences","CONTROL SETTINGS","Manage the behavior of your static placement command center.")+
 `<div class="card"><div class="card-title"><div><h3>Portal Preferences</h3><p>Frontend-only demonstration settings</p></div></div>
 ${["Recruiter alerts","Interview conflict warnings","Automatic eligibility checks","Compact dashboard mode"].map((x,i)=>`<div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding:16px 0;font-size:10px"><span>${x}</span><button class="ghost-btn" onclick="showToast('${x} ${i===3?'preview opened':'updated'}')">${i===3?'Preview':'Enabled'}</button></div>`).join("")}</div>`;
}

function render(page="dashboard"){
 const pages={dashboard,students:studentsPage,companies:companiesPage,drives:drivesPage,applications:applicationsPage,interviews:interviewsPage,pipeline:pipelinePage,analytics:analyticsPage,criteria:criteriaPage,settings:settingsPage};
 content.innerHTML=(pages[page]||dashboard)();
 document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
 if(page==="students"){
   const bf=document.getElementById("branchFilter"),sf=document.getElementById("statusFilter"),cg=document.getElementById("minCgpa");
   const apply=()=>{let data=[...students];if(bf.value!=="All Branches")data=data.filter(s=>s.branch===bf.value);if(sf.value!=="All Status")data=data.filter(s=>s.status===sf.value);if(cg.value)data=data.filter(s=>s.cgpa>=Number(cg.value));document.getElementById("studentRows").innerHTML=studentRows(data)};
   bf?.addEventListener("change",apply);sf?.addEventListener("change",apply);cg?.addEventListener("input",apply);
 }
}
function navigate(page){render(page);window.scrollTo({top:0,behavior:"smooth"});document.getElementById("sidebar").classList.remove("open")}
document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.page)));
document.getElementById("mobileMenu").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
document.getElementById("globalSearch").addEventListener("input",e=>{if(e.target.value.trim())showToast(`Searching: ${e.target.value.trim()}`)});
function showToast(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove("show"),2200)}
function openModal(title,desc,body){modal.innerHTML=`<h2>${title}</h2><p>${desc}</p>${body}<div class="modal-actions"><button class="ghost-btn" onclick="closeModal()">Cancel</button><button class="primary-btn" onclick="submitModal()">Save</button></div>`;modalBackdrop.classList.add("show")}
function closeModal(){modalBackdrop.classList.remove("show")}
modalBackdrop.addEventListener("click",e=>{if(e.target===modalBackdrop)closeModal()})
function submitModal(){closeModal();showToast("Saved successfully")}
function openStudentModal(){openModal("Add Student","Create a new student profile.",`<div class="form-grid"><div class="form-group"><label>Student Name</label><input placeholder="Enter full name"></div><div class="form-group"><label>Roll Number</label><input placeholder="23CSE001"></div><div class="form-group"><label>Branch</label><select><option>CSE</option><option>IT</option><option>ECE</option><option>EEE</option><option>MECH</option></select></div><div class="form-group"><label>CGPA</label><input type="number" step=".1" placeholder="8.5"></div><div class="form-group full"><label>Skills</label><input placeholder="React, SQL, DSA"></div></div>`)}
function openCompanyModal(){openModal("Add Recruiter","Create a new recruiting partner record.",`<div class="form-grid"><div class="form-group"><label>Recruiter Name</label><input placeholder="Company name"></div><div class="form-group"><label>Industry</label><input placeholder="Product Engineering"></div><div class="form-group"><label>Open Roles</label><input type="number" placeholder="8"></div><div class="form-group"><label>Package</label><input placeholder="₹10 LPA"></div></div>`)}
function openDriveModal(){openModal("Create Hiring Event","Set up a new campus recruitment event.",`<div class="form-grid"><div class="form-group"><label>Recruiter</label><select><option>NovaByte Labs</option><option>OrbitWorks</option><option>BluePeak Consulting</option><option>TerraFin</option></select></div><div class="form-group"><label>Role</label><input placeholder="Frontend Engineer"></div><div class="form-group"><label>Date</label><input type="date"></div><div class="form-group"><label>Venue</label><input placeholder="Innovation Hall"></div><div class="form-group full"><label>Eligibility</label><input placeholder="CGPA ≥ 7.5 · CSE, IT"></div></div>`)}
function openCriteriaModal(){openModal("Add Role Rule","Define the eligibility conditions for a recruiter role.",`<div class="form-grid"><div class="form-group"><label>Recruiter</label><input placeholder="NovaByte Labs"></div><div class="form-group"><label>Role</label><input placeholder="Frontend Engineer"></div><div class="form-group"><label>Minimum CGPA</label><input type="number" step=".1" placeholder="7.5"></div><div class="form-group"><label>Maximum Backlogs</label><input type="number" placeholder="0"></div><div class="form-group full"><label>Required Skills</label><input placeholder="React, JavaScript, Git"></div></div>`)}

render();
