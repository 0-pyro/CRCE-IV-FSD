let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
let editIndex = -1;

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');
const contactList = document.getElementById('contactList');
const searchInput = document.getElementById('search');

function saveContact() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !email || !phone) {
        alert("All fields are required");
        return;
    }

    const newContact = { name, email, phone };

    if (editIndex === -1) {
        contacts.push(newContact);
    } else {
        contacts[editIndex] = newContact;
        editIndex = -1;
        submitBtn.innerText = "Add Contact";
    }

    updateStorage();
    clearInputs();
    renderContacts();
}

function renderContacts() {
    contactList.innerHTML = '';
    const searchTerm = searchInput.value.toLowerCase();

    contacts.forEach((contact, index) => {
        if (contact.name.toLowerCase().includes(searchTerm) || contact.email.toLowerCase().includes(searchTerm)) {
            const div = document.createElement('div');
            div.className = 'contact-item';
            div.innerHTML = `
                <strong>${contact.name}</strong><br>
                Email: ${contact.email}<br>
                Phone: ${contact.phone}
                <div class="actions">
                    <button class="edit-btn" onclick="editContact(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
                </div>
            `;
            contactList.appendChild(div);
        }
    });
}

function deleteContact(index) {
    contacts.splice(index, 1);
    updateStorage();
    renderContacts();
}

function editContact(index) {
    const contact = contacts[index];
    nameInput.value = contact.name;
    emailInput.value = contact.email;
    phoneInput.value = contact.phone;

    editIndex = index;
    submitBtn.innerText = "Update Contact";
}

function updateStorage() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function clearInputs() {
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
}

renderContacts();