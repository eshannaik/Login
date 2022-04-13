import mongoose from 'mongoose';

const Logins = new mongoose.Schema ({
    Name: String,
    Username: String,
    Password: String,
})

export default mongoose.model('Log',Logins);