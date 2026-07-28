// Simple editor and localStorage persistence for the portfolio
;(function(){
  const defaultState = {
    profileImage: '',
    fullName: 'MASFIQUE AHMED',
    location: 'Dhaka, Bangladesh',
    profileText: `An ambitious and highly organized final-year Computer Science & Engineering student at American International University-Bangladesh (AIUB). Combines robust theoretical knowledge in object-oriented programming (C#, Java) and normalized database architecture (MySQL) with distinct real-world practical operations. Demonstrates comprehensive expertise in managing real-time data integrity, server-side parameter tracking, and active API integrations during premier competitive events. Eager to bring precise data modeling, backend programming skills, and a strong problem-solving mindset to the team at Paradise Auto Service.`,
    summaryList: ['Final-year CSE student (AIUB)','C#, Java, MySQL, API integrations','Backend & data modeling focus'],

    // education images and text
    edu1img:'', edu2img:'', edu3img:'',
    // projects images
    projImgs:{ '1':'','2':'','3':'' },

    contactImg:'', contactEmail:'you@example.com', contactPhone:'+880-1xx-xxxxxxx', contactLocation:'Dhaka, Bangladesh'
  }

  function loadState(){
    try{
      const raw = localStorage.getItem('eportfolio_state')
      return raw ? JSON.parse(raw) : defaultState
    }catch(e){
      return defaultState
    }
  }
  function saveState(state){
    localStorage.setItem('eportfolio_state', JSON.stringify(state))
  }

  const state = loadState()

  // Utilities
  function qs(id){ return document.getElementById(id) }

  // Populate home fields
  if (qs('fullName')) qs('fullName').innerText = state.fullName
  if (qs('location')) qs('location').innerText = state.location
  if (qs('profileText')) qs('profileText').innerText = state.profileText
  if (qs('profileImage') && state.profileImage) qs('profileImage').src = state.profileImage
  if (qs('footerName')) qs('footerName').innerText = state.fullName

  // Education images
  if (qs('edu1-img') && state.edu1img) qs('edu1-img').src = state.edu1img
  if (qs('edu2-img') && state.edu2img) qs('edu2-img').src = state.edu2img
  if (qs('edu3-img') && state.edu3img) qs('edu3-img').src = state.edu3img

  // Projects images
  for (let id of ['1','2','3']){
    const el = qs('proj-img-'+id)
    if (el && state.projImgs && state.projImgs[id]) el.src = state.projImgs[id]
  }

  // Contact
  if (qs('contact-img') && state.contactImg) qs('contact-img').src = state.contactImg
  if (qs('contactEmail')) qs('contactEmail').innerText = state.contactEmail
  if (qs('contactPhone')) qs('contactPhone').innerText = state.contactPhone
  if (qs('contactLocation')) qs('contactLocation').innerText = state.contactLocation

  // Edit toggles (generic pattern for each page)
  function makeEditor(toggleId, saveId, resetId, selectors){
    const toggle = qs(toggleId), save = qs(saveId), reset = qs(resetId)
    if (!toggle) return
    let editable = false
    toggle.addEventListener('click', ()=>{
      editable = !editable
      for (const sel of selectors){
        const el = document.querySelector(sel)
        if (el) el.contentEditable = editable ? "true" : "false"
      }
      toggle.innerText = editable ? 'Stop editing' : 'Edit'
    })
    if (save) save.addEventListener('click', ()=>{
      // pull fields by selectors and store into state then save
      // Home editor
      if (qs('fullName')) state.fullName = qs('fullName').innerText.trim()
      if (qs('location')) state.location = qs('location').innerText.trim()
      if (qs('profileText')) state.profileText = qs('profileText').innerText.trim()
      if (qs('summaryList')){
        const lis = document.querySelectorAll('#summaryList li')
        state.summaryList = Array.from(lis).map(li => li.innerText.trim())
      }
      // Education texts
      ['edu1-title','edu1-institute','edu1-cgpa','edu2-title','edu2-institute','edu2-gpa','edu3-title','edu3-institute','edu3-gpa'].forEach(id=>{
        const el = qs(id)
        if (!el) return
        state[id] = el.innerText.trim()
      })
      // Projects titles/descs
      ['proj-title-1','proj-desc-1','proj-title-2','proj-desc-2','proj-title-3','proj-desc-3'].forEach(id=>{
        const el = qs(id)
        if (!el) return
        state[id] = el.innerText.trim()
      })
      // Contact
      if (qs('contactEmail')) state.contactEmail = qs('contactEmail').innerText.trim()
      if (qs('contactPhone')) state.contactPhone = qs('contactPhone').innerText.trim()
      if (qs('contactLocation')) state.contactLocation = qs('contactLocation').innerText.trim()

      saveState(state)
      alert('Saved to localStorage. Edits will persist in this browser.')
      // update footer name if changed
      if (qs('footerName')) qs('footerName').innerText = state.fullName
    })
    if (reset) reset.addEventListener('click', ()=>{
      if (!confirm('Reset to initial template state? This will remove saved edits.')) return
      localStorage.removeItem('eportfolio_state')
      location.reload()
    })
  }

  makeEditor('editToggle','saveBtn','resetBtn',['#fullName','#location','#profileText','#summaryList li'])
  makeEditor('eduEditToggle','eduSaveBtn','eduResetBtn',['#edu1-title','#edu1-institute','#edu1-cgpa','#edu2-title','#edu2-institute','#edu2-gpa','#edu3-title','#edu3-institute','#edu3-gpa'])
  makeEditor('projEditToggle','projSaveBtn','projResetBtn',['#proj-title-1','#proj-desc-1','#proj-title-2','#proj-desc-2','#proj-title-3','#proj-desc-3'])
  makeEditor('contactEditToggle','contactSaveBtn','contactResetBtn',['#contactEmail','#contactPhone','#contactLocation'])

  // File upload helpers
  function bindImageInput(inputId, imgId, stateKey){
    const input = qs(inputId), img = qs(imgId)
    if (!input || !img) return
    input.addEventListener('change', (e)=>{
      const f = e.target.files && e.target.files[0]
      if (!f) return
      const reader = new FileReader()
      reader.onload = function(ev){
        img.src = ev.target.result
        state[stateKey] = ev.target.result
        saveState(state)
      }
      reader.readAsDataURL(f)
    })
  }

  bindImageInput('profileImageInput','profileImage','profileImage')
  bindImageInput('edu1-input','edu1-img','edu1img')
  bindImageInput('edu2-input','edu2-img','edu2img')
  bindImageInput('edu3-input','edu3-img','edu3img')
  bindImageInput('contactImageInput','contact-img','contactImg')

  // Project-specific inputs (with data-proj attribute)
  const projInputs = document.querySelectorAll('.proj-input')
  projInputs.forEach(inp=>{
    inp.addEventListener('change', (e)=>{
      const id = e.target.dataset.proj
      const f = e.target.files && e.target.files[0]
      if (!f) return
      const reader = new FileReader()
      reader.onload = function(ev){
        const el = qs('proj-img-'+id)
        if (el) el.src = ev.target.result
        state.projImgs = state.projImgs || {}
        state.projImgs[id] = ev.target.result
        saveState(state)
      }
      reader.readAsDataURL(f)
    })
  })

  // Add project (creates a new card in DOM, id assigned dynamically)
  const addBtn = qs('addProjectBtn')
  if (addBtn){
    addBtn.addEventListener('click', ()=>{
      const list = qs('projectsList')
      const id = Date.now().toString().slice(-4)
      const article = document.createElement('article')
      article.className = 'project-card'
      article.innerHTML = `
        <div class="project-image">
          <img id="proj-img-${id}" src="" alt="Project image" />
          <label class="upload-label small">
            <input data-proj="${id}" class="proj-input" type="file" accept="image/*" />
            Upload
          </label>
        </div>
        <div class="project-body">
          <h3 contenteditable="true" id="proj-title-${id}">New project title</h3>
          <p class="muted">Date</p>
          <p contenteditable="true" id="proj-desc-${id}">Short description</p>
        </div>
      `
      list.appendChild(article)
      // bind new input
      const newInput = article.querySelector('.proj-input')
      newInput.addEventListener('change', (e)=>{
        const f = e.target.files && e.target.files[0]
        if (!f) return
        const reader = new FileReader()
        reader.onload = function(ev){
          const el = qs('proj-img-'+id)
          if (el) el.src = ev.target.result
          state.projImgs = state.projImgs || {}
          state.projImgs[id] = ev.target.result
          saveState(state)
        }
        reader.readAsDataURL(f)
      })
    })
  }

})();
