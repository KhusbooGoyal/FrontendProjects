// state object
let state = {
    edit : true,
    viewer : null,
    editor : null,
    qualifications : [],
    projects: []
}

// Helper functions
function refreshProjectList() {

    let projRef = document.getElementById('projList');
    projRef.innerHTML = "";
    let index = 0;
    state.projects.forEach((data)=> {
        projRef.innerHTML += `<div class="card" style="padding:4px; margin: 4px">
            ${data.title}: <br/>  ${data.description} <br/> ${data.skills} &nbsp;
            <button type="button" class="btn btn-sm btn-danger" onclick="{removeProj(${index})}">Remove</button>
        </div>`;
        index++;
    });

    projRef = document.getElementById('proj2');
    projRef.innerHTML = "";
    index = 0;
    state.projects.forEach((data)=> {
        projRef.innerHTML += `<div class="card" style="padding:4px; margin: 4px">
            ${data.title}: <br/>  ${data.description} <br/> ${data.skills} &nbsp;
            <button type="button" class="btn btn-sm btn-danger" onclick="{removeProj(${index})}">Remove</button>
        </div>`;
        index++;
    });

}

function refreshQualList() {

    let projRef = document.getElementById('qualList');
    projRef.innerHTML = "";
    let index = 0;
    state.qualifications.forEach(data=> {
        projRef.innerHTML += `<div class="card" style="padding:4px; margin: 4px">
            ${data.course} in  ${data.branch} from ${data.cstart}-${data.cend} &nbsp;
            <button type="button" class="btn btn-sm btn-danger" onclick="{removeQual(${index})}">Remove</button>
        </div>`;
        index++;
    });

    projRef = document.getElementById('qual2');
    projRef.innerHTML = "";
    index = 0;
    state.qualifications.forEach(data=> {
        projRef.innerHTML += `<div class="card" style="padding:4px; margin: 4px">
            ${data.course} in  ${data.branch} from ${data.cstart}-${data.cend} &nbsp;
            <button type="button" class="btn btn-sm btn-danger" onclick="{removeQual(${index})}">Remove</button>
        </div>`;
        index++;
    });  

}

document.addEventListener('DOMContentLoaded',()=> {

    state.viewer = document.getElementById('viewer');
    state.editor = document.getElementById('editor');

    function updateScreen() {

        document.getElementById('name2').innerHTML = document.getElementById('name').value;
        document.getElementById('email2').innerHTML = document.getElementById('email').value;
        document.getElementById('phone2').innerHTML = document.getElementById('phone').value;      

    }

    // Toggle Listener (swap screens)
    const controlRef = document.getElementById('swap');
    controlRef.addEventListener('click',(evt)=> {

        evt.preventDefault();
        if(!(validateName() && validateEmail() && validatePhone())) {
            return;
        }

        // if(state.qualifications.length == 0) {
        //     alert("Add atleast one qualification!");
        //     return;
        // }

        // if(state.projects.length == 0) {
        //     alert("Add atleast one project!");
        //     return;
        // }

        updateScreen();

        if(state.edit) {
            state.viewer.classList.remove('hide');
            state.editor.classList.add('hide');
            controlRef.innerText = 'Edit';
        } else {
            state.viewer.classList.add('hide');
            state.editor.classList.remove('hide');
            controlRef.innerText = 'Submit';
        }

        state.edit = !state.edit;

    });

    // Add project
    document.getElementById('addProject').addEventListener('click',(evt)=> {

        evt.preventDefault();

        if(!(validateTitle() && validateDescription() && validateSkills()))
            return;

        state.projects.push({
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            skills: document.getElementById('skills').value
        });

        // console.log(state.projects);
        refreshProjectList();

    });

    // Add qualification
    document.getElementById('addQual').addEventListener('click',(evt)=> {

        evt.preventDefault();

        if(!(validateCourse() && validateBranch() && validateStart() && validateEnd()))
            return;

        state.qualifications.push({
            course: document.getElementById('course').value,
            branch: document.getElementById('branch').value,
            cstart: document.getElementById('cstart').value,
            cend: document.getElementById('cend').value
        });

        // console.log(state.qualifications);
        refreshQualList();

    });

});

// Validation helper functions
function validateName() {
    const ref = document.getElementById('name');
    if(ref.value.length == 0) {
        ref.classList.remove('is-valid');
        ref.classList.add('is-invalid');
        return false;
    }

    ref.classList.remove('is-invalid');
    ref.classList.add('is-valid');
    return true;
}

function validateEmail() {
    const ref = document.getElementById('email');
    // TODO : Replace with regex validation later
    if(ref.value.length == 0 || ref.value.search(/@/g) === -1) {
        ref.classList.remove('is-valid');
        ref.classList.add('is-invalid');
        return false;
    }

    ref.classList.remove('is-invalid');
    ref.classList.add('is-valid');
    return true;
}

function validatePhone() { 
    const ref = document.getElementById('phone');
    if(!(ref.value.length == 10 && parseInt(ref.value) >= 0 &&  parseInt(ref.value) <= 9999999999)) {
        ref.classList.remove('is-valid');
        ref.classList.add('is-invalid');
        return false;
    }

    ref.classList.remove('is-invalid');
    ref.classList.add('is-valid');
    return true;
}

function validateCourse() {
    const ref = document.getElementById('course');
    if(ref.value.length == 0) {
        ref.classList.remove('is-valid');
        ref.classList.add('is-invalid');
        return false;
    }

    ref.classList.remove('is-invalid');
    ref.classList.add('is-valid');
    return true;
}

function validateBranch() {
    const ref = document.getElementById('branch');
    if(ref.value.length == 0) {
        ref.classList.remove('is-valid');
        ref.classList.add('is-invalid');
        return false;
    }

    ref.classList.remove('is-invalid');
    ref.classList.add('is-valid');
    return true;
}

function validateStart() {
    const ref = document.getElementById('cstart');
    if(!(parseInt(ref.value) >= 1980 &&  parseInt(ref.value) <= 2021)) {
        ref.classList.remove('is-valid');
        ref.classList.add('is-invalid');
        return false;
    }

    ref.classList.remove('is-invalid');
    ref.classList.add('is-valid');
    return true;
}

function validateEnd() {
    const ref = document.getElementById('cend');
    if(!(parseInt(ref.value) >= 1980 &&  parseInt(ref.value) <= 2025)) {
        ref.classList.remove('is-valid');
        ref.classList.add('is-invalid');
        return false;
    }

    ref.classList.remove('is-invalid');
    ref.classList.add('is-valid');
    return true;
}

function validateTitle() {
    const ref = document.getElementById('title');
    if(ref.value.length == 0) {
        ref.classList.remove('is-valid');
        ref.classList.add('is-invalid');
        return false;
    }

    ref.classList.remove('is-invalid');
    ref.classList.add('is-valid');
    return true;
}

function validateDescription() {
    const ref = document.getElementById('description');
    if(ref.value.length == 0) {
        ref.classList.remove('is-valid');
        ref.classList.add('is-invalid');
        return false;
    }

    ref.classList.remove('is-invalid');
    ref.classList.add('is-valid');
    return true;
}

function validateSkills() {
    const ref = document.getElementById('skills');
    if(ref.value.length == 0) {
        ref.classList.remove('is-valid');
        ref.classList.add('is-invalid');
        return false;
    }

    ref.classList.remove('is-invalid');
    ref.classList.add('is-valid');
    return true;
}

// Remove Helpers
function removeQual(id) {
    state.qualifications.splice(id,1);
    refreshQualList();
}

function removeProj(id) {
    state.projects.splice(id,1);
    refreshProjectList();
}