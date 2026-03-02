import fs from 'fs';

const p = 'client/src/assets/images/services/';
if (fs.existsSync(p)) {
    console.log(fs.readdirSync(p));
} else {
    console.log('Dir does not exist:', p);
}
