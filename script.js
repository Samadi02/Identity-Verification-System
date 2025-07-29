document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    const identity = {
        id: Date.now(),
        name: name,
        email: email,
        dob: dob,
        address: address,
        phone: phone
    };

    let identities = JSON.parse(localStorage.getItem('identities')) || [];
    identities.push(identity);
    localStorage.setItem('identities', JSON.stringify(identities));

    window.location.href = 'manage.html';
});

function populateIdentities() {
    const identitiesList = document.getElementById('identitiesList');
    identitiesList.innerHTML = '';

    const identities = JSON.parse(localStorage.getItem('identities')) || [];

    identities.forEach(identity => {
        const identityItem = document.createElement('div');
        identityItem.className = 'identity-item';

        identityItem.innerHTML = `
            <p><strong>Name:</strong> ${identity.name}</p>
            <p><strong>Email:</strong> ${identity.email}</p>
            <p><strong>Date of Birth:</strong> ${identity.dob}</p>
            <p><strong>Address:</strong> ${identity.address}</p>
            <p><strong>Phone Number:</strong> ${identity.phone}</p>
            <button onclick="editIdentity(${identity.id})">Edit</button>
            <button onclick="deleteIdentity(${identity.id})">Delete</button>
        `;

        identitiesList.appendChild(identityItem);
    });
}

function editIdentity(id) {
    const identities = JSON.parse(localStorage.getItem('identities')) || [];
    const identity = identities.find(identity => identity.id === id);

    if (identity) {
        const name = prompt('Enter new name:', identity.name);
        const email = prompt('Enter new email:', identity.email);
        const dob = prompt('Enter new date of birth:', identity.dob);
        const address = prompt('Enter new address:', identity.address);
        const phone = prompt('Enter new phone number:', identity.phone);

        identity.name = name || identity.name;
        identity.email = email || identity.email;
        identity.dob = dob || identity.dob;
        identity.address = address || identity.address;
        identity.phone = phone || identity.phone;

        localStorage.setItem('identities', JSON.stringify(identities));
        populateIdentities();
    }
}

function deleteIdentity(id) {
    let identities = JSON.parse(localStorage.getItem('identities')) || [];
    identities = identities.filter(identity => identity.id !== id);
    localStorage.setItem('identities', JSON.stringify(identities));
    populateIdentities();
}

// Populate identities when the manage page loads
if (document.getElementById('identitiesList')) {
    populateIdentities();
}


// function editIdentity(id) {
//     const identities = JSON.parse(localStorage.getItem('identities')) || [];
//     const identity = identities.find(identity => identity.id === id);

//     if (identity) {
//         // Redirect to edit.html with identity details as query parameters
//         window.location.href = `edit.html?id=${identity.id}&name=${encodeURIComponent(identity.name)}&email=${encodeURIComponent(identity.email)}&dob=${encodeURIComponent(identity.dob)}&address=${encodeURIComponent(identity.address)}&phone=${encodeURIComponent(identity.phone)}`;
//     }
// }

// // script.js

// // Function to populate identities on the manage page
// function populateIdentities() {
//     const identities = JSON.parse(localStorage.getItem('identities')) || [];
//     const identitiesList = document.getElementById('identitiesList');

//     identitiesList.innerHTML = '';

//     identities.forEach(identity => {
//         const identityElement = document.createElement('div');
//         identityElement.classList.add('identity-item');
//         identityElement.innerHTML = `
//             <p><strong>ID:</strong> ${identity.id}</p>
//             <p><strong>Name:</strong> ${identity.name}</p>
//             <p><strong>Email:</strong> ${identity.email}</p>
//             <p><strong>Date of Birth:</strong> ${identity.dob}</p>
//             <p><strong>Address:</strong> ${identity.address}</p>
//             <p><strong>Phone Number:</strong> ${identity.phone}</p>
//             <button onclick="editIdentity('${identity.id}')">Edit</button>
//             <button onclick="deleteIdentity('${identity.id}')">Delete</button>
//         `;
//         identitiesList.appendChild(identityElement);
//     });
// }

// // Function to edit an identity
// function editIdentity(id) {
//     const identities = JSON.parse(localStorage.getItem('identities')) || [];
//     const identity = identities.find(identity => identity.id === id);

//     if (identity) {
//         // Redirect to edit.html with identity details as query parameters
//         window.location.href = `edit.html?id=${identity.id}&name=${encodeURIComponent(identity.name)}&email=${encodeURIComponent(identity.email)}&dob=${encodeURIComponent(identity.dob)}&address=${encodeURIComponent(identity.address)}&phone=${encodeURIComponent(identity.phone)}`;
//     }
// }

// // Function to delete an identity
// function deleteIdentity(id) {
//     let identities = JSON.parse(localStorage.getItem('identities')) || [];
//     identities = identities.filter(identity => identity.id !== id);
//     localStorage.setItem('identities', JSON.stringify(identities));
//     populateIdentities(); // Update the list after deletion
// }

// // Populate identities when the manage page loads
// if (document.getElementById('identitiesList')) {
//     populateIdentities();
// }
