const mongoose = require('mongoose');
// let localPath = 'mongodb://localhost:27017/ethereum'
// let dbName = 'mongodb+srv://ranausama48:etherumprice@cluster0-zqqr0.mongodb.net/test?retryWrites=true&w=majority'
//  mongoose.connect( dbName, {
//     useNewUrlParser: true,
//     useCreateIndex: true
// })
let path = "mongodb+srv://plant:plant@quickblox.1jltl.gcp.mongodb.net/nursery>?retryWrites=true&w=majority"
// let path = "mongodb://localhost:27017/plant"

mongoose.connect(path, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true

}).then(() => {
    console.log('db connected');

})