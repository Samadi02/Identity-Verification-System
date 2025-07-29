function populateIdentities() {
    const identities = JSON.parse(localStorage.getItem('identities')) || [];
    const identitiesList = document.getElementById('identitiesList');

    identitiesList.innerHTML = '';

    identities.forEach(identity => {
        const identityElement = document.createElement('div');
        identityElement.classList.add('container');
        identityElement.innerHTML = `
            <h2>Identity ${identity.id}</h2>
            <p><strong>Name:</strong> ${identity.name}</p>
            <p><strong>Email:</strong> ${identity.email}</p>
            <p><strong>Date of Birth:</strong> ${identity.dob}</p>
            <p><strong>Address:</strong> ${identity.address}</p>
            <p><strong>Phone Number:</strong> ${identity.phone}</p>
            <button onclick="editIdentity('${identity.id}')">Edit</button>
            <button onclick="deleteIdentity('${identity.id}')">Delete</button>
        `;
        identitiesList.appendChild(identityElement);
    });
}

function editIdentity(id) {
    const identities = JSON.parse(localStorage.getItem('identities')) || [];
    const identity = identities.find(identity => identity.id === id);

    if (identity) {
        window.location.href = `edit.html?id=${identity.id}&name=${encodeURIComponent(identity.name)}&email=${encodeURIComponent(identity.email)}&dob=${encodeURIComponent(identity.dob)}&address=${encodeURIComponent(identity.address)}&phone=${encodeURIComponent(identity.phone)}`;
    }
}

function deleteIdentity(id) {
    let identities = JSON.parse(localStorage.getItem('identities')) || [];
    identities = identities.filter(identity => identity.id !== id);
    localStorage.setItem('identities', JSON.stringify(identities));
    populateIdentities();
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('identitiesList')) {
        populateIdentities();
    }
});
