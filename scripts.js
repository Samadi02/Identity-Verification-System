const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const contractABI = [
    [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "dob",
                    "type": "uint256"
                }
            ],
            "name": "IdentityRegistered",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                }
            ],
            "name": "IdentityVerified",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_email",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_dob",
                    "type": "uint256"
                }
            ],
            "name": "registerIdentity",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "getIdentity",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "verifyIdentity",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];

const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';

const contract = new web3.eth.Contract(contractABI, contractAddress);

function redirectTo(url) {
    window.location.href = url;
}

function redirectToRegister() {
    redirectTo('register.html');
}

function redirectToVerify() {
    redirectTo('verify.html');
}

function redirectToGetIdentity() {
    redirectTo('get-identity.html');
}

async function registerIdentity(name, email, dob, address, phone) {
    try {
        document.getElementById('registerLoading').classList.add('active');
        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];
        await contract.methods.registerIdentity(name, email, dob, address, phone).send({ from: account });
        alert('Identity registered successfully!');
        redirectToRegister();
    } catch (error) {
        console.error('Registration failed', error);
        alert('Registration failed: ' + error.message);
    } finally {
        document.getElementById('registerLoading').classList.remove('active');
    }
}

async function verifyIdentity(userAddress) {
    try {
        document.getElementById('verifyLoading').classList.add('active');
        const verified = await contract.methods.verifyIdentity(userAddress).call();
        document.getElementById('verifyStatus').innerText = `Identity verified: ${verified}`;
        redirectToVerify();
    } catch (error) {
        console.error('Verification failed', error);
        alert('Verification failed: ' + error.message);
    } finally {
        document.getElementById('verifyLoading').classList.remove('active');
    }
}

async function getIdentity(userAddress) {
    try {
        document.getElementById('getIdentityLoading').classList.add('active');
        const identity = await contract.methods.getIdentity(userAddress).call();
        document.getElementById('identityDetails').innerText = JSON.stringify(identity, null, 2);
        redirectToGetIdentity();
    } catch (error) {
        console.error('Fetching identity failed', error);
        alert('Fetching identity failed: ' + error.message);
    } finally {
        document.getElementById('getIdentityLoading').classList.remove('active');
    }
}

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dob = new Date(document.getElementById('dob').value).getTime() / 1000;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    await registerIdentity(name, email, dob, address, phone);
});

document.getElementById('verifyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userAddress = document.getElementById('userAddress').value;
    await verifyIdentity(userAddress);
});

document.getElementById('getIdentityForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userAddress = document.getElementById('getAddress').value;
    await getIdentity(userAddress);
});

function editIdentity(id) {
    const identities = JSON.parse(localStorage.getItem('identities')) || [];
    const identity = identities.find(identity => identity.id === id);

    if (identity) {
        window.location.href = `edit.html?id=${identity.id}&name=${encodeURIComponent(identity.name)}&email=${encodeURIComponent(identity.email)}&dob=${encodeURIComponent(identity.dob)}&address=${encodeURIComponent(identity.address)}&phone=${encodeURIComponent(identity.phone)}`;
    }
}
