const axios = require('axios');

async function healthCheck(url) {
    try {
        const response = await axios.get(url);
        if (response.data.apiStatus === 'OK') {
            process.exit(0);
        } else {
            process.exit(1);
        }
    } catch (error) {
        console.log(`Health check error: "${error}"`);
        process.exit(1);
    }
}

const url = process.argv[2];
healthCheck(url);