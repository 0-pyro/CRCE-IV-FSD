const API_BASE = "http://localhost:5002/contacts"


const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const contactList = document.getElementById('contactList');

async function saveContact() {
    const name = nameInput.value.trim()
    const email = emailInput.value.trim()
    const phone = phoneInput.value.trim()

    if (!name || !email || !phone) {
        alert("All fields are required")
        return
    }

    try {
        const response = await axios.post(API_BASE, { name, email, phone })

        console.log("Success:", response.data)
        clearInputs()
        renderContacts()
    } catch (err) {
        const errorMsg = err.response?.data?.error || "Server Error"

    }
    renderContacts();
}

async function renderContacts() {
    try {
        const response = await axios.get(API_BASE)
        const dbContacts = response.data // Axios puts data in .data

        contactList.innerHTML = ''
        dbContacts.forEach((contact) => {
            const div = document.createElement('div')
            div.className = 'contact-item'
            div.innerHTML = `
                <strong>${contact.name}</strong><br>
                Email: ${contact.email}<br>
                Phone: ${contact.phone}
                <div class="actions">
                    <button class="delete-btn" onclick="deleteContact('${contact._id}')">Delete</button>
                </div>
            `
            contactList.appendChild(div)
        })
    } catch (err) {
        console.error("Error fetching data:", err)
    }
}

async function deleteContact(id) {

    try {
        await axios.delete(`${API_BASE}/${id}`)
        renderContacts()
    } catch (err) {
        alert("Delete failed: " + err.message)
    }
}

renderContacts()