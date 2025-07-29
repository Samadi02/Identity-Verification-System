function getIdentityDetailsById(id) {
    const identities = JSON.parse(localStorage.getItem('identities')) || [];
    const identity = identities.find(identity => identity.id === id);

    if (identity) {
        const identityDetails = document.getElementById('identityDetails');
        identityDetails.innerHTML = `
            <h2>Identity Details</h2>
            <p><strong>ID:</strong> ${identity.id}</p>
            <p><strong>Name:</strong> ${identity.name}</p>
            <p><strong>Email:</strong> ${identity.email}</p>
            <p><strong>Date of Birth:</strong> ${identity.dob}</p>
            <p><strong>Address:</strong> ${identity.address}</p>
            <p><strong>Phone Number:</strong> ${identity.phone}</p>
        `;
    } else {
        alert('Identity not found.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const identityId = getUrlParameter('id');
    if (identityId) {
        getIdentityDetailsById(parseInt(identityId));
    } else {
        alert('No identity ID provided.');
    }
});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
